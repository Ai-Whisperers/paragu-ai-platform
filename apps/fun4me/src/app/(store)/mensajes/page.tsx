'use client';

import { useCallback, useEffect, useState } from 'react';
import { MessageCircle, Send, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

interface MessageThread {
  id: string;
  participant1: string;
  participant2: string;
  last_message_at?: string | null;
}

interface MessageRow {
  id: string;
  thread_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export default function MensajesPage() {
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMsg, setNewMsg] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const init = useCallback(async () => {
    const supabase = createClient();
    const { data: { user: u } } = await supabase.auth.getUser();
    setUser(u);
    if (!u) return;

    // @ts-expect-error message_threads not in generated Database types yet
    const { data } = await supabase
      .from('message_threads')
      .select('*')
      .or(`participant1.eq.${u.id},participant2.eq.${u.id}`)
      .order('last_message_at', { ascending: false });
    setThreads((data as MessageThread[] | null) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount; memoized via useCallback
    init();
  }, [init]);

  const loadMessages = useCallback(async (threadId: string) => {
    setSelectedThread(threadId);
    const supabase = createClient();
    // @ts-expect-error messages not in generated Database types yet
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('thread_id', threadId)
      .order('created_at');
    setMessages((data as MessageRow[] | null) || []);
  }, []);

  async function sendMessage() {
    if (!newMsg.trim() || !selectedThread || !user) return;
    const supabase = createClient();
    // @ts-expect-error messages not in generated Database types yet
    await supabase.from('messages').insert({
      thread_id: selectedThread,
      sender_id: user.id,
      content: newMsg.trim(),
    });
    setNewMsg('');
    loadMessages(selectedThread);
  }

  const getOtherParticipant = useCallback((thread: MessageThread) => {
    return thread.participant1 === user?.id ? thread.participant2 : thread.participant1;
  }, [user]);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>;

  const participantMap = new Map<string, { id: string; name: string }>();
  threads.forEach(t => {
    const other = getOtherParticipant(t);
    if (!participantMap.has(other)) participantMap.set(other, { id: other, name: other.slice(0, 8) });
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2"><MessageCircle className="h-7 w-7" /> Mensajes</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardHeader><CardTitle className="text-lg">Conversaciones</CardTitle></CardHeader>
          <CardContent className="p-0">
            {threads.length === 0 ? (
              <p className="text-muted-foreground text-center py-8 text-sm">No tenés mensajes todavía</p>
            ) : (
              threads.map(t => (
                <button
                  key={t.id}
                  onClick={() => loadMessages(t.id)}
                  className={`w-full text-left p-4 border-b hover:bg-muted/50 transition-colors ${selectedThread === t.id ? 'bg-rose-50' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-rose-400 to-purple-500 text-white text-sm">
                        {getOtherParticipant(t).slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">Usuario {getOtherParticipant(t).slice(0, 8)}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.last_message_at ? new Date(t.last_message_at).toLocaleDateString('es-PY') : ''}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          {selectedThread ? (
            <>
              <CardHeader className="border-b pb-3">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSelectedThread(null)}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-rose-400 to-purple-500 text-white text-xs">U</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-base">Conversación</CardTitle>
                </div>
              </CardHeader>
              <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
                {messages.map(m => (
                  <div key={m.id} className={`flex ${m.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                      m.sender_id === user?.id
                        ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white'
                        : 'bg-muted'
                    }`}>
                      {m.content}
                      <div className={`text-xs mt-1 ${m.sender_id === user?.id ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {new Date(m.created_at).toLocaleTimeString('es-PY', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t flex gap-2">
                <Input
                  value={newMsg}
                  onChange={e => setNewMsg(e.target.value)}
                  placeholder="Escribí un mensaje..."
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage} size="icon" className="bg-gradient-to-r from-rose-500 to-purple-600 text-white">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-[400px] text-muted-foreground">
              <div className="text-center">
                <MessageCircle className="mx-auto h-12 w-12 mb-3 opacity-30" />
                <p>Seleccioná una conversación</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
