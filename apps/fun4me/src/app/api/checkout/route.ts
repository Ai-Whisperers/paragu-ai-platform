// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get current user if authenticated
    const { data: { user } } = await supabase.auth.getUser();

    let orderData: any;
    let receiptFile: File | null = null;
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      orderData = JSON.parse(formData.get('order_data') as string);
      receiptFile = formData.get('receipt') as File | null;
    } else {
      orderData = await request.json();
    }

    // Validate required fields
    if (!orderData.customer_name?.trim()) {
      return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 });
    }
    if (!orderData.customer_phone?.trim()) {
      return NextResponse.json({ error: 'El teléfono es obligatorio' }, { status: 400 });
    }
    if (!orderData.items?.length) {
      return NextResponse.json({ error: 'El carrito está vacío' }, { status: 400 });
    }
    if (!orderData.shipping_address?.address || !orderData.shipping_address?.city) {
      return NextResponse.json({ error: 'La dirección de envío es obligatoria' }, { status: 400 });
    }

    // Validate stock
    for (const item of orderData.items) {
      const { data: product, error: prodErr } = await supabase
        .from('products')
        .select('id, name, stock_quantity')
        .eq('id', item.product_id)
        .single();

      if (prodErr || !product) {
        return NextResponse.json({
          error: `Producto no encontrado: ${item.name}`,
          code: 'PRODUCT_NOT_FOUND',
        }, { status: 400 });
      }

      if ((product.stock_quantity ?? 0) < item.quantity) {
        return NextResponse.json({
          error: `Stock insuficiente para "${product.name}". Disponible: ${product.stock_quantity}`,
          code: 'INSUFFICIENT_STOCK',
          items: [{ product_id: item.product_id, name: product.name, available: product.stock_quantity }],
        }, { status: 400 });
      }
    }

    // Create order
    const orderPayload: any = {
      status: 'pending',
      subtotal: orderData.subtotal,
      shipping_cost: orderData.shipping_cost || 0,
      discount_amount: orderData.discount_amount || 0,
      total: orderData.total,
      payment_method: orderData.payment_method,
      shipping_address: orderData.shipping_address,
      notes: orderData.notes || null,
    };

    if (user) {
      orderPayload.customer_id = user.id;
    } else {
      orderPayload.guest_email = orderData.customer_email || null;
      orderPayload.guest_phone = orderData.customer_phone || null;
    }

    // Validate coupon if provided
    if (orderData.coupon_code) {
      const { data: couponResult } = await supabase.rpc('validate_coupon', {
        coupon_code: orderData.coupon_code,
        order_subtotal: BigInt(orderData.subtotal),
      });

      if (couponResult && !couponResult.valid) {
        return NextResponse.json({ error: couponResult.error || 'Cupón inválido' }, { status: 400 });
      }
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderPayload)
      .select('id, order_number')
      .single();

    if (orderError) {
      console.error('[checkout] order insert error:', orderError);
      return NextResponse.json({ error: 'Error al crear el pedido. Intentá de nuevo.' }, { status: 500 });
    }

    // Insert order items
    const orderItems = orderData.items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.name,
      quantity: item.quantity,
      unit_price: item.price,
      line_total: item.price * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('[checkout] items insert error:', itemsError);
      // Attempt cleanup
      await supabase.from('orders').delete().eq('id', order.id);
      return NextResponse.json({ error: 'Error al guardar los items del pedido.' }, { status: 500 });
    }

    // Decrement stock
    for (const item of orderData.items) {
      await supabase.rpc('decrement_stock', {
        product_id: item.product_id,
        quantity: item.quantity,
      });
    }

    // Handle receipt upload
    if (receiptFile && orderData.payment_method === 'bank_transfer') {
      const buffer = Buffer.from(await receiptFile.arrayBuffer());
      const filePath = `orders/${order.id}/${receiptFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from('receipts')
        .upload(filePath, buffer, {
          contentType: receiptFile.type,
          upsert: false,
        });

      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage
          .from('receipts')
          .getPublicUrl(filePath);

        await supabase.from('bank_transfer_receipts').insert({
          order_id: order.id,
          image_url: publicUrl,
        });
      } else {
        console.error('[checkout] receipt upload error:', uploadError);
      }
    }

    // Save customer info to profile if authenticated
    if (user && orderData.customer_name) {
      await supabase.from('customers').upsert({
        id: user.id,
        full_name: orderData.customer_name,
        phone: orderData.customer_phone,
        email: orderData.customer_email || user.email,
      }, { onConflict: 'id' });
    }

    return NextResponse.json({
      success: true,
      order: { id: order.id, order_number: order.order_number },
    });

  } catch (error) {
    console.error('[checkout] unexpected error:', error);
    return NextResponse.json({ error: 'Error inesperado. Intentá de nuevo.' }, { status: 500 });
  }
}
