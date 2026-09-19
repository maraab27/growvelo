import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminSession } from '@/hooks/useAdminSession';
import { Upload, Trash2 } from 'lucide-react';

export const EditableGallery = () => {
  const { isAdmin } = useAdminSession();
  const [images, setImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const fetchImages = async () => {
    const { data } = await supabase.from('gallery_images').select('*').order('order_index');
    if (data) setImages(data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage.from('gallery').upload(filePath, file);
    
    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(filePath);
      await supabase.from('gallery_images').insert({
        url: publicUrl,
        storage_path: filePath,
        bucket_key: 'gallery'
      });
      fetchImages();
    }
    setUploading(false);
  };

  const handleDelete = async (id: string, storagePath: string) => {
    await supabase.storage.from('gallery').remove([storagePath]);
    await supabase.from('gallery_images').delete().eq('id', id);
    fetchImages();
  };

  return (
    <div className="w-full space-y-4 font-bangla">
      {isAdmin && (
        <div className="glass p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 no-print">
          <span className="font-bold text-lg">গ্যালারি এডিটর</span>
          <label className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
            <Upload className="w-4 h-4" />
            {uploading ? 'আপলোড হচ্ছে...' : 'ছবি যোগ করুন'}
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative group rounded-xl overflow-hidden glass-strong aspect-square">
            <img src={img.url} alt="Gallery" className="w-full h-full object-cover" />
            {isAdmin && (
              <button 
                onClick={() => handleDelete(img.id, img.storage_path)}
                className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity no-print shadow-lg"
                title="ছবি ডিলিট করুন"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        {images.length === 0 && !uploading && (
          <div className="col-span-full py-10 text-center text-muted-foreground glass rounded-xl">
            গ্যালারিতে কোনো ছবি নেই।
          </div>
        )}
      </div>
    </div>
  );
};
