import { FormEvent, useState } from 'react'

import searchIcon from '../assets/search.svg'
import clearIcon from '../assets/x.svg'

interface SongSearchFormProps {
    setQuerySearch: (query: string) => void
}

export function SongSearchForm({ setQuerySearch }: SongSearchFormProps) {
    const [search, setSearch] = useState('')

    function handleFormSubmit(e: FormEvent) {
        e.preventDefault()
        setQuerySearch(search)
    }

    return (
        <form
            onSubmit={handleFormSubmit}
            className="w-1/2 flex bg-slate-100 border border-slate-300 rounded-full relative"
        >
            <input
                type="text"
                placeholder="O que você está procurando?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="appearance-none w-full px-6 py-2 rounded-l-full font-bold text-black placeholder:text-slate-700"
            />

            {search && (
                <button
                    type="button"
                    className="h-full px-4 absolute right-10"
                    onClick={() => {
                        setSearch('')
                        setQuerySearch('')
                    }}
                >
                    <img src={clearIcon} width={24} alt="Clear search icon" />
                </button>
            )}

            <button
                type="submit"
                className="pl-2 pr-4 py-2 rounded-r-full hover:bg-slate-200 transition-colors"
            >
                <img src={searchIcon} width={24} alt="Search icon" />
            </button>
        </form>
    )
}
