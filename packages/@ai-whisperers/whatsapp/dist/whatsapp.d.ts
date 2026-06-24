export declare function sendWhatsApp(to: string, message: string): Promise<boolean>;
export declare function sendMedia(to: string, caption: string, mediaUrl: string, mediaType?: string): Promise<boolean>;
export declare function notifyNewOrder(order: any): Promise<void>;
export declare function notifyStatusChange(orderId: string, customerPhone: string, newStatus: string): Promise<void>;
//# sourceMappingURL=whatsapp.d.ts.map