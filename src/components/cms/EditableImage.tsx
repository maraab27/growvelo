import React, { useState } from "react";

interface EditableImageProps {
  id?: string;
  defaultSrc?: string;
  src?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
}

export function EditableImage({
  id,
  defaultSrc = "",
  src,
  alt = "",
  className = "",
  imgClassName = "",
}: EditableImageProps) {
  const [imgError, setImgError] = useState(false);
  const imageSource = src || defaultSrc;

  return (
    <div className={`relative inline-block overflow-hidden ${className}`}>
      <img
        src={imageSource}
        alt={alt}
        className={imgClassName}
        onError={() => setImgError(true)}
      />
    </div>
  );
}

export default EditableImage;
