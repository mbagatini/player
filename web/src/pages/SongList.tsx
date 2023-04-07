import { useCallback, useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { api } from '../services/api'
import { Song } from '../dto/song'
import { Button } from '../components/Button'
import { Song as SongInfo } from '../components/Song'
import { SongSearchForm } from '../components/SongSearchForm'
import { RegisterSongForm } from '../components/RegisterSongForm'
import { Header } from '../components/Header'

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
        <>
            <Header />
            <div className="w-full max-w-4xl p-4 m-auto">
                <section className="flex flex-col">
                    <div className="my-6 flex justify-between items-center">
                        <SongSearchForm
                            setQuerySearch={(query) => {
                                setPage(1)
                                setSearch(query)
                            }}
                        />

                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <Button type="button">
                                    + adicionar música
                                </Button>
                            </Dialog.Trigger>

                            <Dialog.Portal>
                                <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />
                                <Dialog.Content className="absolute bg-slate-200 p-10 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <RegisterSongForm />
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>
                    </div>

                    {!songs.length ? (
                        <p className="p-4">
                            ...ops, nenhuma música foi encontrada
                        </p>
                    ) : (
                        <ul className="flex flex-col gap-2">
                            {songs.map((song, idx) => (
                                <SongInfo
                                    key={song.id}
                                    index={idx + 1}
                                    data={song}
                                />
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
            </div>
        </>
    )
}
