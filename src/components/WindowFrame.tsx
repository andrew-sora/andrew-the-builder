import type { ReactNode } from 'react';

type WindowFrameProps = {
  caption?: string;
  children: ReactNode;
  className?: string;
  placeholder?: boolean;
  placeholderLabel?: string;
  url?: string;
  title?: string;
};

export default function WindowFrame({
  caption,
  children,
  className = '',
  placeholder,
  placeholderLabel,
}: WindowFrameProps) {
  return (
    <div className={`frame-card ${className}`.trim()}>
      <div className="frame-card__screen">
        {children}
        {placeholder && placeholderLabel && (
          <span className="dummy">{placeholderLabel}</span>
        )}
      </div>

      {caption && (
        <figcaption className="frame-card__caption">
          {caption}
        </figcaption>
      )}
    </div>
  );
}
