import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { Input } from './Form/Input'
import { Button } from './Button'
import closeIcon from '../assets/x.svg'
import { ArrayInput, useArrayInput } from './Form/ArrayInput'

type FormFields = {
    title: string
    author: string
    releaseDate: Date
    keywords: string[]
}

export function RegisterSongForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormFields>()

    const keywordsControl = useArrayInput([])

    async function handleRegisterSong(data: FormFields) {
        const songData = {
            title: data.title,
            author: data.author,
            releaseDate: data.releaseDate,
            keywords: keywordsControl.values,
        }

        console.log(songData)

        setTimeout(() => {
            reset()
        }, 1500)
    }

    return (
        <>
            <Dialog.Title className="text-black font-bold text-2xl pb-6">
                Adicionar música
            </Dialog.Title>

            <form
                onSubmit={handleSubmit(handleRegisterSong)}
                className="flex flex-col gap-6"
            >
                <Input
                    type="text"
                    label="Título"
                    placeholder="Nome da música"
                    {...register('title', {
                        required: 'Informe o nome da música',
                    })}
                    error={errors.title}
                />

                <Input
                    type="text"
                    label="Artista"
                    placeholder="Nome do artista"
                    {...register('author', {
                        required: 'Informe o artista',
                    })}
                    error={errors.author}
                />

                <Input
                    type="date"
                    label="Data de lançamento"
                    {...register('releaseDate', {
                        required: 'Informe a data de lançamento',
                    })}
                    error={errors.releaseDate}
                />

                <ArrayInput
                    label="Palavras-chave"
                    placeholder="Digite e aperte espaço para adicionar"
                    arrayInputControl={keywordsControl}
                />

                <Button type="submit" className="mt-4 h-12">
                    salvar
                </Button>
            </form>

            <Dialog.Close className="absolute top-6 right-6 rounded-md">
                <img src={closeIcon} width={24} alt="Clear search icon" />
            </Dialog.Close>
        </>
    )
}
