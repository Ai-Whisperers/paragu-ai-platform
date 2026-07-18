'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Search, Loader2, Star, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createClient } from '@/lib/supabase/client';

const KINK_OPTIONS = [
  'Bondage', 'Disciplina', 'Dominación', 'Sumisión', 'Intercambio de parejas',
  'Fetichismo', 'Rope Bunny', 'Daddy/Mommy', 'Pet Play', 'Age Play',
  'Impact Play', 'Sensación', 'Electro', 'Vendado', 'Juego de roles',
];

const ROLE_OPTIONS = ['Dom', 'Sumisa', 'Switch', 'Domina', 'Sumiso', 'Versátil'];

interface DirectoryMember {
  id: string;
  display_name?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  experience_level?: 'curious' | 'beginner' | 'intermediate' | 'advanced' | 'expert' | null;
  roles?: string[] | null;
  kink_tags?: string[] | null;
  city?: string | null;
}

export default function DirectorioPage() {
  const [members, setMembers] = useState<DirectoryMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [kinkFilter, setKinkFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const loadMembers = useCallback(async () => {
    const supabase = createClient();
    // @ts-expect-error customers.show_in_directory and directory fields not in generated Database types yet
    let query = supabase
      .from('customers')
      .select('id, display_name, full_name, avatar_url, bio, experience_level, roles, kink_tags, show_in_directory, city')
      .eq('show_in_directory', true)
      .limit(50);

    if (kinkFilter) query = query.contains('kink_tags', [kinkFilter]);
    if (roleFilter) query = query.contains('roles', [roleFilter]);

    const { data } = await query;
    setMembers((data as DirectoryMember[] | null) || []);
    setLoading(false);
  }, [kinkFilter, roleFilter]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data refresh on filter change; memoized via useCallback
    loadMembers();
  }, [loadMembers]);

  const filtered = members.filter(m => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (m.display_name || m.full_name || '').toLowerCase().includes(q)
      || (m.bio || '').toLowerCase().includes(q);
  });

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2"><Users className="h-7 w-7" /> Directorio de Miembros</h1>
        <p className="text-muted-foreground mt-1">Conocé a la comunidad</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por nombre..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="rounded-lg border px-3 py-2 text-sm bg-background">
          <option value="">Todos los roles</option>
          {ROLE_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={kinkFilter} onChange={e => setKinkFilter(e.target.value)} className="rounded-lg border px-3 py-2 text-sm bg-background">
          <option value="">Todos los kinks</option>
          {KINK_OPTIONS.map(k => <option key={k} value={k}>{k}</option>)}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(m => (
          <Link key={m.id} href={`/perfil/${m.id}`}>
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={m.avatar_url || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-rose-400 to-purple-500 text-white">
                      {(m.display_name || m.full_name || '?')[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold truncate">{m.display_name || m.full_name}</h3>
                      {m.experience_level && (
                        <Badge variant="secondary" className="text-xs">
                          {m.experience_level === 'curious' && 'Curioso'}
                          {m.experience_level === 'beginner' && 'Principiante'}
                          {m.experience_level === 'intermediate' && 'Intermedio'}
                          {m.experience_level === 'advanced' && 'Avanzado'}
                          {m.experience_level === 'expert' && 'Experto'}
                        </Badge>
                      )}
                    </div>
                    {m.roles?.length > 0 && (
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {m.roles.map((r: string) => (
                          <Badge key={r} variant="outline" className="text-xs bg-rose-50 text-rose-700 border-rose-200">{r}</Badge>
                        ))}
                      </div>
                    )}
                    {m.bio && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{m.bio}</p>}
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      {m.kink_tags?.length > 0 && <span className="flex items-center gap-1"><Star className="h-3 w-3" />{m.kink_tags.length} kinks</span>}
                      <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" />Enviar mensaje</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card><CardContent className="text-center py-16 text-muted-foreground">
          <Users className="mx-auto h-12 w-12 mb-3 opacity-30" />
          <p>No se encontraron miembros</p>
        </CardContent></Card>
      )}
    </div>
  );
}
