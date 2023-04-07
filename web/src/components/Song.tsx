import dayjs from 'dayjs'
import { Song as SongDTO } from '../dto/song'
import deleteIcon from '../assets/trash.svg'

interface SongProps {
    index: number
    data: SongDTO
    handleDeletion: () => void
}

export function Song({ index, data, handleDeletion }: SongProps) {
    const formattedDate = dayjs(data.releaseDate).format('MMM YYYY')

    return (
        <li className="flex gap-2 rounded-md bg-slate-50 border border-slate-200 group">
            <div className="flex-auto flex items-center p-4">
                <span className="w-10 text-purple-600">#{index}</span>
                <div>
                    <p className="font-bold">{data.title}</p>
                    <span className="text-slate-700">{data.author.name}</span>
                </div>
            </div>
            <span className="flex-none p-4 my-auto rounded-r-md text-xs text-slate-500">
                {`lançado • ${formattedDate.toLowerCase()}`}
            </span>
            <button
                type="button"
                onClick={handleDeletion}
                className="flex-none rounded-r-md p-4 bg-slate-200 border border-slate-50 hidden group-hover:block"
            >
                <img src={deleteIcon} width={20} alt="Remove icon" />
            </button>
        </li>
    )
}
