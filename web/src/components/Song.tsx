import dayjs from 'dayjs'
import { Song as SongDTO } from '../dto/song'

interface SongProps {
    index: number
    data: SongDTO
}

export function Song({ index, data }: SongProps) {
    const formattedDate = dayjs(data.releaseDate).format('MMM YYYY')

    return (
        <li className="p-4 flex justify-between items-center gap-2 rounded-md bg-slate-50 border border-slate-200">
            <div className="flex items-center">
                <span className="w-10 text-purple-600">#{index}</span>
                <div>
                    <p className="font-bold">{data.title}</p>
                    <span className="text-slate-700">{data.author.name}</span>
                </div>
            </div>
            <span className="text-xs text-slate-500">
                {`lançado • ${formattedDate.toLowerCase()}`}
            </span>
        </li>
    )
}
