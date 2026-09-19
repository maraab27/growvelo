import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminSession } from '@/hooks/useAdminSession';
import { Youtube, Save } from 'lucide-react';

export const EditableEmbed = ({ slotId }: { slotId: string }) => {
  const { isAdmin } = useAdminSession();
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchUrl = async () => {
      const { data } = await supabase.from('video_urls').select('url').eq('slot_id', slotId).single();
      if (data) setUrl(data.url);
    };
    fetchUrl();
  }, [slotId]);

  const handleSave = async () => {
    await supabase.from('video_urls').upsert({ slot_id: slotId, url, updated_at: new Date().toISOString() });
    alert('ভিডিও লিঙ্ক সেভ হয়েছে!');
  };

  const getEmbedUrl = (fullUrl: string) => {
    if (fullUrl.includes('youtube.com') || fullUrl.includes('youtu.be')) {
      const videoId = fullUrl.split('v=')[1]?.split('&')[0] || fullUrl.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return fullUrl;
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden glass-strong font-bangla group">
      {isAdmin && (
        <div className="absolute top-0 left-0 w-full p-3 bg-background/95 backdrop-blur z-10 flex flex-col sm:flex-row gap-2 no-print opacity-0 group-hover:opacity-100 transition-opacity border-b border-border">
          <input 
            type="text" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            placeholder="ইউটিউব ভিডিওর লিঙ্ক দিন..."
            className="flex-1 p-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
          />
          <button onClick={handleSave} className="bg-primary text-primary-foreground px-4 py-2 text-sm rounded-lg flex items-center justify-center gap-2 font-bold">
            <Save className="w-4 h-4" />
            সেভ
          </button>
        </div>
      )}
      
      <div className="aspect-video bg-muted flex items-center justify-center">
        {url ? (
          <iframe 
            src={getEmbedUrl(url)} 
            className="w-full h-full border-0" 
            allowFullScreen 
          />
        ) : (
          <div className="flex flex-col items-center text-muted-foreground p-6 text-center">
            <Youtube className="w-12 h-12 mb-2 opacity-50" />
            <p>অ্যাডমিন প্যানেল থেকে ভিডিও লিঙ্ক যুক্ত করুন</p>
          </div>
        )}
      </div>
    </div>
  );
};
