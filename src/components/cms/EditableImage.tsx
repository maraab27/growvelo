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
  defaultSrc: string;
  className?: string;
  imgClassName?: string;
}) => {
  const { isAdmin } = useAdminSession();
  const [src, setSrc] = useState(defaultSrc);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchImage = async () => {
      const { data, error } = await supabase
        .from('content_blocks')
        .select('content')
        .eq('id', id)
        .maybeSingle();

      if (!error && data?.content && isMounted) {
        setSrc(data.content);
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
      alert('ইমেজ স্টোরেজে আপলোড করতে সমস্যা হয়েছে: ' + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('gallery')
      .getPublicUrl(fileName);

    // ডাটাবেজে পার্মানেন্টলি সেভ করা
    const { error: dbError } = await supabase.from('content_blocks').upsert({
      id,
      content: publicUrl,
      updated_at: new Date().toISOString(),
    });

    if (dbError) {
      alert('ডাটাবেজে সেভ হতে সমস্যা হয়েছে: ' + dbError.message);
    } else {
      setSrc(publicUrl);
    }
    setUploading(false);
  };

  return (
    <div className={`relative group inline-block overflow-hidden ${className}`}>
      <img
        src={src}
        alt="Editable asset"
        className={`w-full h-full object-cover transition duration-200 ${imgClassName}`}
      />
      {isAdmin && (
        <label className="absolute inset-0 bg-black/60 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20 backdrop-blur-xs p-1">
          <Upload className="w-4 h-4 mb-0.5 text-white" />
          <span className="text-[10px] font-sans font-bold">
            {uploading ? 'আপলোড হচ্ছে...' : 'Change'}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
};
