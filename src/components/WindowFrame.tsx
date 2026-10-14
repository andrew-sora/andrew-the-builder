import type { ReactNode } from 'react';

type WindowFrameProps = {
  url?: string;
  title?: string;
  caption?: string;
  children: ReactNode;
  className?: string;
  placeholder?: boolean;
  placeholderLabel?: string;
};

export default function WindowFrame({
  url,
  title,
  caption,
  children,
  className = '',
  placeholder,
  placeholderLabel,
}: WindowFrameProps) {
  // Format clean URL if provided
  let displayUrl = url;
  if (url) {
    try {
      const parsed = new URL(url);
      displayUrl = parsed.hostname + (parsed.pathname !== '/' ? parsed.pathname : '');
    } catch {
      displayUrl = url;
    }
  }

  return (
    <div className={`window-frame ${className}`.trim()}>
      <div className="window-frame__bar">
        <div className="window-frame__dots" aria-hidden="true">
          <span className="window-frame__dot window-frame__dot--close" />
          <span className="window-frame__dot window-frame__dot--min" />
          <span className="window-frame__dot window-frame__dot--max" />
        </div>

        {(displayUrl || title) && (
          <div className="window-frame__address mono">
            <svg
              className="window-frame__lock"
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="window-frame__url">{displayUrl || title}</span>
          </div>
        )}

        <div className="window-frame__spacer" aria-hidden="true" />
      </div>

      <div className="window-frame__screen">
        {children}
        {placeholder && placeholderLabel && (
          <span className="dummy">{placeholderLabel}</span>
        )}
      </div>

      {caption && (
        <figcaption className="window-frame__caption">
          <span className="window-frame__caption-badge mono">SHOT</span>
          <span className="window-frame__caption-text">{caption}</span>
        </figcaption>
      )}
    </div>
  );
}
