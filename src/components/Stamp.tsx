/** Round availability stamp. The ring text is decorative; the status is repeated for screen readers. */
export default function Stamp({ text }: { text: string }) {
  const ring = `${text.toUpperCase()} · `;
  return (
    <div className="stamp">
      <span className="sr-only">{text}</span>
      <svg className="stamp__ring" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
        <defs>
          <path id="stamp-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text>
          <textPath href="#stamp-circle" textLength="272" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
      </svg>
      <span className="stamp__dot" aria-hidden="true" />
    </div>
  );
}
