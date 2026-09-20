import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminSession } from '@/hooks/useAdminSession';
import { Upload } from 'lucide-react';

const memoryCache: Record<string, string> = {};

export const EditableImage = ({
  id,
  defaultSrc,
  className = '',
  imgClassName = '',
}: {
  id: string;
  defaultSrc?: string;
  className?: string;
  imgClassName?: string;
}) => {
  const { isAdmin } = useAdminSession();

  // মেমোরি ক্যাশ থাকলে সেটা, নইলে সাথে সাথে ডিফল্ট ইমেজ দেখাবে (০ সেকেন্ড ডিলে)
  const [src, setSrc] = useState<string>(() => {
    if (memoryCache[id]) return memoryCache[id];
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem(`cache_img_${id}`);
      if (local) {
        memoryCache[id] = local;
        return local;
      }
    }
    return defaultSrc || '';
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      try {
        const { data } = await supabase
          .from('content_blocks')
          .select('*')
          .or(`id.eq.${id},key.eq.${id}`)
          .maybeSingle();

        if (data && isMounted) {
          const foundUrl = data.content || data.value;
          if (foundUrl && foundUrl !== src) {
            setSrc(foundUrl);
            memoryCache[id] = foundUrl;
            localStorage.setItem(`cache_img_${id}`, foundUrl);
          }
        }
      } catch (e) {
        // কোনো এরর হলেও যেন সাইট আটকে না থাকে
      }
    };

    fetchImage();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${id.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.${fileExt}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(fileName, file, { cacheControl: '31536000', upsert: true });

      if (uploadError) {
        alert('স্টোরেজে আপলোড সমস্যা: ' + uploadError.message);
        setUploading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(fileName);

      const payload = {
        key: id,
        id: id,
        value: publicUrl,
        content: publicUrl,
        updated_at: new Date().toISOString(),
      };

      const { error: dbError } = await supabase
        .from('content_blocks')
        .upsert(payload, { onConflict: 'key' });

      if (dbError) {
        await supabase.from('content_blocks').upsert(payload, { onConflict: 'id' });
      }

      setSrc(publicUrl);
      memoryCache[id] = publicUrl;
      localStorage.setItem(`cache_img_${id}`, publicUrl);
    } catch (err: any) {
      alert('আপলোড সমস্যা: ' + err?.message);
    } finally {
      setUploading(false);
    }
  };

  const finalSrc = src || defaultSrc;

  return (
    <div className={`relative group inline-block overflow-hidden ${className}`}>
      {finalSrc ? (
        <img
          src={finalSrc}
          alt="GrowVelo Asset"
          loading="eager"
          decoding="async"
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      ) : (
        <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-xs text-white/30">
          Loading...
        </div>
      )}

      {isAdmin && (
        <label
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-0 bg-black/60 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-30 backdrop-blur-xs p-1"
        >
          <Upload className="w-5 h-5 mb-1 text-white" />
          <span className="text-xs font-sans font-bold">
            {uploading ? 'আপলোড হচ্ছে...' : 'Change'}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onClick={(e) => e.stopPropagation()}
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
};
