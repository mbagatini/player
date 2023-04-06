export function Header() {
    return (
        <header className="w-screen h-20 px-4 bg-slate-50 border border-b-slate-200">
            <div className="h-full w-full max-w-4xl m-auto flex items-center px-2 py-4">
                <img src="/vite.svg" alt="Player" />
                <p className="font-extrabold text-2xl ml-2 text-purple-600">
                    player
                </p>

                <span className="ml-auto text-sm text-slate-500">
                    Uma biblioteca de músicas para chamar de sua
                </span>
            </div>
        </header>
    )
}
