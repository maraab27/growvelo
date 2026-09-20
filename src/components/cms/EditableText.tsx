import React, { useRef } from 'react';

import { useCms } from '@/components/cms/CmsProvider';

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
  const { isAdmin, values, stage } = useCms();
  const fallback = children?.toString() || '';
  const content = values[id] ?? fallback;
  const elementRef = useRef<HTMLElement>(null);

  const handleBlur = () => {
    if (!elementRef.current) return;
    
    const newText = elementRef.current.innerText;
    if (newText !== content) {
      stage(id, newText);
    }
  };

  return (
    <Tag
      ref={elementRef as React.Ref<never>}
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
