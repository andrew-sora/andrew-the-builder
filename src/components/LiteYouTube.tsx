'use client';

import { useState } from 'react';

// Privacy-friendly embed host and thumbnail.
const youtubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const youtubeEmbed = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;

/** Click-to-load facade: no YouTube request is made until the visitor presses play. */
export default function LiteYouTube({ id, title, playLabel }: { id: string; title: string; playLabel: string }) {
  const [active, setActive] = useState(false);

  return (
    <div className="video">
      {active ? (
        <iframe
          src={youtubeEmbed(id)}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          style={{ backgroundImage: `url(${youtubeThumb(id)})` }}
          aria-label={`${playLabel}: ${title}`}
          onClick={() => setActive(true)}
        >
          <span>▶ {playLabel}</span>
        </button>
      )}
    </div>
  );
}
