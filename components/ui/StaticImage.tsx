import React from 'react';

interface StaticImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}

export default function StaticImage({
  src,
  alt,
  width,
  height,
  className = '',
  fill = false,
  style = {},
  priority,
  sizes,
  ...props
}: StaticImageProps) {
  // Если fill=true, используем абсолютное позиционирование
  const imgStyle: React.CSSProperties = fill
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        ...style,
      }
    : {
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
        ...style,
      };

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={imgStyle}
      loading={priority ? 'eager' : 'lazy'}
      {...props}
    />
  );
} 