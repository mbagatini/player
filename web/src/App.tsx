import { Header } from './components/Header'
import { SongList } from './components/SongList'
import './styles/global.css'

export function App() {
    return (
        <>
            <Header />
            <div className="w-full max-w-4xl p-4 m-auto">
                <SongList />
            </div>
        </>
    )
}
