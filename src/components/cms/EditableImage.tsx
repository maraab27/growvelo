import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminSession } from '@/hooks/useAdminSession';
import { Upload } from 'lucide-react';

// গ্লোবাল মেমোরি ক্যাশ — এক পেজ থেকে অন্য পেজে গেলেও এই ডেটা ব্রাউজার ধরে রাখবে
const memoryCache: Record<string, string> = {};

// ব্রাউজারের লোকালস্টোরেজ থেকে ইনিশিয়াল ক্যাশ লোড করা
const getCachedUrl = (id: string, fallback?: string): string => {
  if (memoryCache[id]) return memoryCache[id];
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem(`cache_img_${id}`);
    if (local) {
      memoryCache[id] = local;
      return local;
    }
  }
  return fallback || '';
};

const setCachedUrl = (id: string, url: string) => {
  memoryCache[id] = url;
  if (typeof window !== 'undefined') {
    localStorage.setItem(`cache_img_${id}`, url);
  }
};

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
  
  // প্রথম রেন্ডারেই ক্যাশ থেকে ইনস্ট্যান্ট ছবি তুলে আনা (০ মিলিসেকেন্ড ডিলে)
  const [src, setSrc] = useState<string>(() => getCachedUrl(id, defaultSrc));
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      // ব্যাকগ্রাউন্ডে চেক করবে কোনো নতুন আপডেট আছে কি না
      const { data } = await supabase
        .from('content_blocks')
        .select('*')
        .or(`id.eq.${id},key.eq.${id}`)
        .maybeSingle();

      if (data && isMounted) {
        const foundUrl = data.content || data.value;
        if (foundUrl && foundUrl !== src) {
          setSrc(foundUrl);
          setCachedUrl(id, foundUrl);
        }
      }
    };

    fetchImage();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${id.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.${fileExt}`;

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

    // ইনস্ট্যান্ট স্টেট ও ক্যাশ আপডেট
    setSrc(publicUrl);
    setCachedUrl(id, publicUrl);
    setUploading(false);
  };

  return (
    <div className={`relative group inline-block overflow-hidden ${className}`}>
      {src ? (
        <img
          src={src}
          alt="Editable asset"
          loading="eager"
          decoding="async"
          className={`w-full h-full object-cover transition duration-200 ${imgClassName}`}
        />
      ) : (
        <div className="w-full h-full bg-linear-to-br from-neutral-800 to-neutral-900 flex items-center justify-center text-xs text-white/40">
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
