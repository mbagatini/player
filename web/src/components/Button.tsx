import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    styleType?: 'primary' | 'secondary'
}

export function Button({
    children,
    styleType = 'primary',
    className,
    ...rest
}: ButtonProps) {
    const colorStyle =
        styleType === 'primary'
            ? 'bg-purple-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:to-70%'
            : 'bg-slate-400 hover:bg-slate-500'

    return (
        <button
            className={`min-h-10 px-6 py-2 rounded-full text-slate-50 text-sm transition-colors ${className} ${colorStyle}`}
            {...rest}
        >
            {children}
        </button>
    )
}
