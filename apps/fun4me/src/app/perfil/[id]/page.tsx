'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Shield, Star, Calendar, MapPin, MessageCircle, Loader2, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/lib/supabase/client';

export default function PerfilPage() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Record<string, any> | null>(null);
  const [photos, setPhotos] = useState<Record<string, any>[]>([]);
  const [membership, setMembership] = useState<Record<string, any> | null>(null);
  const [reviews, setReviews] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user);

    const { data: profile } = await supabase.from('customers').select('*').eq('id', id).single();
    setProfile(profile);

    const { data: photos } = await supabase.from('customer_photos')
      .select('*').eq('customer_id', id).eq('is_private', false).order('sort_order');
    setPhotos(photos || []);

    const { data: membership } = await supabase.rpc('get_active_membership', { p_customer_id: id } as any);
    setMembership(membership);

    const { data: reviews } = await supabase.from('member_reviews')
      .select('*').eq('reviewed_id', id);
    setReviews(reviews || []);
    setLoading(false);
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>;
  if (!profile) return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Perfil no encontrado</div>;

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600" />
        <CardContent className="relative px-6 pb-6">
          <Avatar className="h-24 w-24 -mt-12 border-4 border-white ring-2 ring-rose-200">
            <AvatarImage src={profile.avatar_url || undefined} />
            <AvatarFallback className="text-2xl bg-gradient-to-br from-rose-400 to-purple-500 text-white">
              {(profile.display_name || profile.full_name || '?')[0]}
            </AvatarFallback>
          </Avatar>

          <div className="mt-4 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{profile.display_name || profile.full_name || 'Anónimo'}</h1>
                {membership?.has_active && (
                  <Badge style={{ backgroundColor: membership.plan_color || '#9333EA' }}>
                    <BadgeCheck className="h-3 w-3 mr-1" />
                    {membership.plan_name}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                {profile.roles?.length > 0 && profile.roles.map((r: string) => (
                  <Badge key={r} variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">{r}</Badge>
                ))}
                {profile.experience_level && <span>{profile.experience_level}</span>}
              </div>
            </div>
            {currentUser && currentUser.id !== id && (
              <Button className="bg-gradient-to-r from-rose-500 to-purple-600 text-white">
                <MessageCircle className="h-4 w-4 mr-2" /> Mensaje
              </Button>
            )}
          </div>

          {profile.bio && (
            <>
              <Separator className="my-4" />
              <p className="text-muted-foreground">{profile.bio}</p>
            </>
          )}

          <div className="flex flex-wrap gap-6 mt-6">
            {profile.kink_tags?.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2 flex items-center gap-1">
                  <Star className="h-4 w-4 text-rose-500" /> Kinks
                </p>
                <div className="flex flex-wrap gap-1">
                  {profile.kink_tags.map((k: string) => (
                    <Badge key={k} variant="secondary" className="text-xs">{k}</Badge>
                  ))}
                </div>
              </div>
            )}
            {avgRating && (
              <div>
                <p className="text-sm font-medium mb-1">Rating</p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.round(Number(avgRating)) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-1 text-sm">({reviews.length})</span>
                </div>
              </div>
            )}
            {profile.event_count > 0 && (
              <div>
                <p className="text-sm font-medium mb-1">Eventos asistidos</p>
                <p className="text-lg font-bold">{profile.event_count}</p>
              </div>
            )}
          </div>

          {photos.length > 0 && (
            <>
              <Separator className="my-4" />
              <p className="text-sm font-medium mb-3">Fotos</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {photos.map(p => (
                  <img key={p.id} src={p.image_url} alt={p.caption || ''} className="h-32 w-32 object-cover rounded-lg shrink-0" />
                ))}
              </div>
            </>
          )}

          {reviews.length > 0 && (
            <>
              <Separator className="my-4" />
              <p className="text-sm font-medium mb-3">Reseñas ({reviews.length})</p>
              <div className="space-y-2">
                {reviews.slice(0, 5).map(r => (
                  <div key={r.id} className="flex items-start gap-2 text-sm">
                    <div className="flex">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    {r.comment && <p className="text-muted-foreground">&ldquo;{r.comment}&rdquo;</p>}
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
