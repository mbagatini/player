import { useCallback, useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { api } from '../services/api'
import { Song } from '../dto/song'
import { Button } from '../components/Button'
import { Song as SongInfo } from '../components/Song'
import { SongSearchForm } from '../components/SongSearchForm'
import { RegisterSongForm } from '../components/RegisterSongForm'
import { Header } from '../components/Header'
import { useToast } from '../hooks/useToast'

export function SongList() {
    const { addToast } = useToast()
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [songsCount, setSongsCount] = useState(0)
    const [songs, setSongs] = useState<Song[]>([])
    const [registerSongModalIsOpen, setRegisterSongModalIsOpen] =
        useState(false)

    async function handleDeleteSong(id: number) {
        try {
            const index = songs.findIndex((song) => song.id === id)

            await api.delete(`/songs/${id}`)

            setSongsCount((prevValue) => prevValue - 1)
            setSongs((prevValues) => [
                ...prevValues.slice(0, index),
                ...prevValues.slice(index + 1),
            ])
        } catch (error) {
            addToast({
                toastType: 'error',
                title: 'Isso é constrangedor...',
                message: 'Não foi possível remover a música da sua biblioteca',
            })
        }
    }

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
                addToast({
                    toastType: 'error',
                    title: 'Isso é constrangedor...',
                    message: error.message,
                })
            })
    }, [page, search])

    useEffect(() => {
        handleSongsSearch()
    }, [handleSongsSearch])

    return (
        <>
            <Header />
            <section className="flex flex-col w-full max-w-4xl p-4 m-auto mt-20 relative">
                <div className="my-6 flex justify-between items-center">
                    <SongSearchForm
                        setQuerySearch={(query) => {
                            setPage(1)
                            setSearch(query)
                        }}
                    />

                    <Dialog.Root
                        open={registerSongModalIsOpen}
                        onOpenChange={setRegisterSongModalIsOpen}
                    >
                        <Dialog.Trigger asChild>
                            <Button type="button">+ adicionar música</Button>
                        </Dialog.Trigger>

                        <Dialog.Portal>
                            <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0 z-10" />
                            <Dialog.Content className="absolute z-20 top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-200 p-10 rounded-2xl w-full max-w-md">
                                <RegisterSongForm
                                    setIsOpen={setRegisterSongModalIsOpen}
                                    refreshResults={() => setPage(1)}
                                />
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>

                {!songs.length ? (
                    <p className="p-4">...ops, nenhuma música foi encontrada</p>
                ) : (
                    <ul className="flex flex-col gap-2 max-w-full">
                        {songs.map((song, idx) => (
                            <SongInfo
                                key={song.id}
                                index={idx + 1}
                                data={song}
                                handleDeletion={() => handleDeleteSong(song.id)}
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
        </>
    )
}
