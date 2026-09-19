import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminSession } from '@/hooks/useAdminSession';

interface EditableTextProps {
  id: string;
  children: React.ReactNode; // Default fallback text
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({ 
  id, 
  children, 
  as: Tag = 'span',
  className = '' 
}) => {
  const { isAdmin } = useAdminSession();
  const [content, setContent] = useState<string>(children?.toString() || '');
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('content_blocks')
        .select('value')
        .eq('key', id)
        .single();
        
      if (!error && data) {
        setContent(data.value);
      }
    };
    fetchContent();
  }, [id]);

  const handleBlur = async () => {
    if (!elementRef.current) return;
    
    const newText = elementRef.current.innerText;
    if (newText !== content) {
      setContent(newText);
      await supabase.from('content_blocks').upsert({ 
        key: id, 
        value: newText,
        updated_at: new Date().toISOString()
      });
    }
  };

  return (
    <Tag
      ref={elementRef as any}
      contentEditable={isAdmin}
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={`font-bangla transition-all duration-200 ${
        isAdmin 
          ? 'hover:outline hover:outline-2 hover:outline-dashed hover:outline-primary/50 cursor-text rounded-sm px-1 min-w-[20px] inline-block' 
          : ''
      } ${className}`}
    >
      {content}
    </Tag>
  );
};
