'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Lock, MessageSquare, Loader2, Hash } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';

interface CommunityGroup {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  category?: string | null;
  is_private?: boolean | null;
  member_count?: number | null;
  post_count?: number | null;
}

export default function GruposPage() {
  const [groups, setGroups] = useState<CommunityGroup[]>([]);
  const [loading, setLoading] = useState(true);

  const loadGroups = useCallback(async () => {
    const supabase = createClient();
    // @ts-expect-error community_groups not in generated Database types yet
    const { data } = await supabase
      .from('community_groups')
      .select('*')
      .eq('is_active', true)
      .eq('is_private', false)
      .order('member_count', { ascending: false });
    setGroups((data as CommunityGroup[] | null) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount; memoized via useCallback
    loadGroups();
  }, [loadGroups]);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>;

  const categories = [...new Set(groups.map(g => g.category || 'general'))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2"><Users className="h-7 w-7" /> Grupos</h1>
          <p className="text-muted-foreground mt-1">Foros de discusión de la comunidad</p>
        </div>
      </div>

      {categories.map(cat => {
        const catGroups = groups.filter(g => (g.category || 'general') === cat);
        return (
          <div key={cat} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 capitalize flex items-center gap-2">
              <Hash className="h-5 w-5 text-rose-500" />
              {cat === 'social' ? 'Social' : cat === 'education' ? 'Educación' : cat === 'support' ? 'Apoyo' : cat}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {catGroups.map(g => (
                <Link key={g.id} href={`/grupos/${g.slug}`}>
                  <Card className="hover:shadow-md transition-shadow h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{g.name}</h3>
                          {g.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{g.description}</p>}
                        </div>
                        {g.is_private && <Lock className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />}
                      </div>
                      <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" />{g.member_count} miembros</span>
                        <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{g.post_count} posts</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
