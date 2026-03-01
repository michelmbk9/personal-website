'use client'

export default function SpotifyEmbed({ playlistId }: { playlistId: string }) {
  return (
    <iframe
      src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`}
      width="100%"
      height="152"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      className="rounded-none"
    />
  )
}
