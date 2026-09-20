import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminSession } from '@/hooks/useAdminSession';
import { Upload } from 'lucide-react';

const memoryCache: Record<string, string> = {};

export const EditableImage = ({
  id,
  defaultSrc = '',
  alt = 'growVelo course preview',
  className = '',
  imgClassName = '',
}: {
  id: string;
  defaultSrc?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
}) => {
  const { isAdmin } = useAdminSession();

  const [src, setSrc] = useState<string>(() => {
    if (memoryCache[id]) return memoryCache[id];
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem(`cache_img_${id}`);
      if (local) {
        memoryCache[id] = local;
        return local;
      }
    }
    return defaultSrc;
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      try {
        const { data } = await supabase
          .from('content_blocks')
          .select('content, value')
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
      } catch (err) {
        // এরর হলেও সাইট আটকে থাকবে না
      }
    };

    fetchImage();
    return () => {
      isMounted = false;
    };
  }, [id, src]);

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
        alert('আপলোড ত্রুটি: ' + uploadError.message);
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

      await supabase.from('content_blocks').upsert(payload, { onConflict: 'key' });

      setSrc(publicUrl);
      memoryCache[id] = publicUrl;
      localStorage.setItem(`cache_img_${id}`, publicUrl);
    } catch (err: any) {
      alert('সমস্যা হয়েছে: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const displaySrc = src || defaultSrc;

  return (
    <div className={`relative group inline-block overflow-hidden ${className}`}>
      {displaySrc ? (
        <img
          src={displaySrc}
          alt={alt}
          loading="eager"
          decoding="async"
          className={`w-full h-full object-cover transition-opacity duration-150 ${imgClassName}`}
        />
      ) : (
        <div className="w-full h-full bg-neutral-800" />
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
