import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminSession } from '@/hooks/useAdminSession';
import { Upload } from 'lucide-react';

export const EditableImage = ({ id, defaultSrc, className }: { id: string, defaultSrc: string, className?: string }) => {
  const { isAdmin } = useAdminSession();
  const [src, setSrc] = useState(defaultSrc);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      // আমরা ছবিগুলোর URL-ও content_blocks টেবিলে সেভ রাখব
      const { data } = await supabase.from('content_blocks').select('content').eq('id', id).single();
      if (data && data.content) setSrc(data.content);
    };
    fetchImage();
  }, [id]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `img_${Math.random()}.${fileExt}`;

    // আমরা আগে তৈরি করা gallery বাকেটের ভেতরেই ছবিগুলো রাখব
    const { error: uploadError } = await supabase.storage.from('gallery').upload(fileName, file);

    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(fileName);
      setSrc(publicUrl);
      
      // নতুন ছবির লিঙ্কটি ডাটাবেজে আপডেট করা
      await supabase.from('content_blocks').upsert({
        id,
        content: publicUrl,
        updated_at: new Date().toISOString()
      });
    } else {
      alert('ছবি আপলোডে সমস্যা হয়েছে!');
    }
    setUploading(false);
  };

  return (
    <div className={`relative group inline-block overflow-hidden ${className || ''}`}>
      <img src={src} alt="Editable Content" className={`w-full h-full object-cover ${className || ''}`} />
      
      {isAdmin && (
        <label className="absolute inset-0 bg-background/80 text-foreground flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10 backdrop-blur-sm border-2 border-primary border-dashed m-1 rounded-md no-print">
          <Upload className="w-5 h-5 mb-1 text-primary" />
          <span className="text-xs font-bangla font-bold">পরিবর্তন করুন</span>
          {uploading && <span className="text-[10px] mt-1 text-muted-foreground">আপলোড হচ্ছে...</span>}
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      )}
    </div>
  );
};
