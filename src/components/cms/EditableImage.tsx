import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminSession } from '@/hooks/useAdminSession';
import { Upload } from 'lucide-react';

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
  const [src, setSrc] = useState(defaultSrc || '');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchImage = async () => {
      const { data } = await supabase
        .from('content_blocks')
        .select('*')
        .or(`id.eq.${id},key.eq.${id}`)
        .maybeSingle();

      if (data && isMounted) {
        const foundUrl = data.content || data.value;
        if (foundUrl) setSrc(foundUrl);
      }
    };
    fetchImage();
    return () => { isMounted = false; };
  }, [id]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${id.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(fileName, file, { cacheControl: '3600', upsert: true });

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
    setUploading(false);
  };

  return (
    <div className={`relative group inline-block overflow-hidden ${className}`}>
      {src ? (
        <img
          src={src}
          alt="Course Thumbnail"
          className={`w-full h-full object-cover transition duration-200 ${imgClassName}`}
        />
      ) : (
        <div className="w-full h-full bg-linear-to-br from-neutral-800 to-neutral-900 flex items-center justify-center text-xs text-white/40">
          No Image
        </div>
      )}

      {isAdmin && (
        <label
          onClick={(e) => {
            // কার্ডের ভেতরে চলে যাওয়া আটকানোর ম্যাজিক লাইন
            e.stopPropagation();
          }}
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
