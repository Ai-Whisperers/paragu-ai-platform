'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, PlayCircle, Clock, BarChart, Loader2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/client';
import { formatPrice } from '@/lib/utils/format';

export default function CursosPage() {
  const [courses, setCourses] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    const supabase = createClient();
    const { data } = await supabase
      .from('courses')
      .select('*')
      .eq('is_published', true)
      .order('sort_order');
    setCourses(data || []);
    setLoading(false);
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>;

  const levels = [...new Set(courses.map(c => c.level || 'all'))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2"><BookOpen className="h-7 w-7" /> Educación</h1>
        <p className="text-muted-foreground mt-1">Cursos y talleres sobre kink, BDSM y sexualidad</p>
      </div>

      {courses.length === 0 ? (
        <Card><CardContent className="text-center py-16 text-muted-foreground">
          <BookOpen className="mx-auto h-12 w-12 mb-3 opacity-30" />
          <p>No hay cursos disponibles todavía</p>
        </CardContent></Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map(c => (
            <Card key={c.id} className="hover:shadow-md transition-shadow overflow-hidden">
              {c.image_url && (
                <div className="h-40 bg-gradient-to-br from-rose-400 to-purple-600 flex items-center justify-center">
                  <PlayCircle className="h-12 w-12 text-white/70" />
                </div>
              )}
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {c.level === 'beginner' ? 'Principiantes' : c.level === 'intermediate' ? 'Intermedio' : c.level === 'advanced' ? 'Avanzado' : 'Todos los niveles'}
                  </Badge>
                  {c.price === 0 && <Badge className="bg-green-100 text-green-800 text-xs">Gratis</Badge>}
                </div>
                <h3 className="font-semibold text-lg">{c.title}</h3>
                {c.short_desc && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{c.short_desc}</p>}
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  {c.duration_minutes && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{c.duration_minutes} min</span>}
                  {c.price > 0 && <span className="text-rose-600 font-medium">{formatPrice(c.price)}</span>}
                  {c.price === 0 && <span className="text-green-600 font-medium">Gratuito</span>}
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white" size="sm">
                  <Link href={`/cursos/${c.slug}`} className="text-white w-full">Ver curso</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
