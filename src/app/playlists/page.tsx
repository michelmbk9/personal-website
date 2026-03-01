import { createClient } from '@/lib/supabase/server'
import SpotifyEmbed from '@/components/ui/SpotifyEmbed'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Playlists — Michel Moubarak' }
export const revalidate = 3600

export default async function PlaylistsPage() {
  const supabase = await createClient()
  const { data: playlists } = await supabase
    .from('spotify_playlists')
    .select('*')
    .order('display_order')

  return (
    <div className="px-14 py-12 max-w-3xl">
      <h1 className="font-serif text-[38px] font-normal tracking-tight text-[#111] mb-2">Playlists</h1>
      <p className="text-[14px] font-light text-[#666] mb-10 leading-relaxed">
        What I&apos;m listening to. Music for focus, mornings, and everything in between.
      </p>

      {playlists && playlists.length > 0 ? (
        <div className="grid grid-cols-2 gap-6">
          {playlists.map((pl) => (
            <div key={pl.id}>
              <SpotifyEmbed playlistId={pl.playlist_id} />
              <div className="mt-3">
                <h3 className="font-serif text-[16px] font-normal text-[#111] mb-1">{pl.name}</h3>
                {pl.description && (
                  <p className="text-[12px] font-light text-[#666] leading-relaxed">{pl.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[14px] font-light text-[#AAAAAA]">Playlists coming soon.</p>
      )}
    </div>
  )
}
