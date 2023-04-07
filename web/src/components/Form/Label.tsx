import { LabelHTMLAttributes, ReactNode } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode
}

export function Label({ className, ...props }: LabelProps) {
    return (
        <label
            {...props}
            className={`text-sm lg:text-base font-semibold ${className}`}
        >
            {props.children}
        </label>
    )
}
