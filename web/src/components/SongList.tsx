import { useCallback, useEffect, useState } from 'react'
import { api } from '../services/api'
import { Song } from '../dto/song'
import { Button } from './Button'
import { Song as SongInfo } from './Song'
import { SongSearchForm } from './SongSearchForm'

export function SongList() {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [songsCount, setSongsCount] = useState(0)
    const [songs, setSongs] = useState<Song[]>([])

    const handleSongsSearch = useCallback(() => {
        let params: Record<any, any> = { page }

        if (search.length) {
            params = {
                ...params,
                title: search,
                author: search,
                keywords: search,
            }
        }

        api.get('/songs', { params })
            .then((result) => {
                setSongsCount(result.data.total)

                if (page === 1) {
                    setSongs(result.data.results)
                } else {
                    setSongs((current) => [...current, ...result.data.results])
                }
            })
            .catch((error) => {
                alert(error)
            })
    }, [page, search])

    useEffect(() => {
        handleSongsSearch()
    }, [handleSongsSearch])

    return (
        <section className="flex flex-col">
            <div className="my-6 flex justify-between items-center">
                <SongSearchForm
                    setQuerySearch={(query) => {
                        setPage(1)
                        setSearch(query)
                    }}
                />
                <Button onClick={() => alert('ihuuu adicionar')}>
                    + adicionar música
                </Button>
            </div>

            {!songs.length ? (
                <p className="p-4">...ops, nenhuma música foi encontrada</p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {songs.map((song, idx) => (
                        <SongInfo key={song.id} index={idx + 1} data={song} />
                    ))}
                </ul>
            )}

            {songs.length < songsCount && (
                <Button
                    className="my-4 mx-auto"
                    onClick={() => setPage(page + 1)}
                >
                    ver mais ...
                </Button>
            )}
        </section>
    )
}
