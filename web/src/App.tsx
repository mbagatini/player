import { ToastProvider } from './hooks/useToast'
import { SongList } from './pages/SongList'
import './styles/global.css'

export function App() {
    return (
        <ToastProvider>
            <SongList />
        </ToastProvider>
    )
}
