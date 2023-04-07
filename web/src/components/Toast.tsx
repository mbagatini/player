import * as ToastPrimitive from '@radix-ui/react-toast'
import closeIcon from '../assets/x.svg'

export interface ToastProps extends ToastPrimitive.ToastProps {
    toastType?: 'error' | 'message'
    title: string
    message: string
}

export function Toast({ toastType = 'message', ...props }: ToastProps) {
    return (
        <ToastPrimitive.Root
            {...props}
            className='bg-white rounded-lg p-4 text-black border border-slate-300/70 [&[data-state="open"]]:animate-slide-in [&[data-swipe="end"]]:animate-swipe-out [&[data-state="closed"]]:animate-hide [&[data-swipe="cancel"]]:animate-hide'
        >
            <div className="flex justify-between items-center">
                <ToastPrimitive.Title
                    className={`font-bold text-sm ${
                        toastType === 'error' ? 'text-rose-600' : ''
                    }`}
                >
                    {props.title}
                </ToastPrimitive.Title>
                <ToastPrimitive.Close aria-label="Close">
                    <img src={closeIcon} width={24} alt="Clear search icon" />
                </ToastPrimitive.Close>
            </div>
            <ToastPrimitive.Description asChild>
                <span className="text-sm">{props.message}</span>
            </ToastPrimitive.Description>
            <ToastPrimitive.Close />
        </ToastPrimitive.Root>
    )
}
