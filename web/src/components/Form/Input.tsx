import { InputHTMLAttributes, forwardRef, Ref } from 'react'
import { FieldError } from 'react-hook-form'
import { Label } from './Label'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: FieldError
}

function InputElement(
    { label, error, ...props }: InputProps,
    ref: Ref<HTMLInputElement>,
) {
    return (
        <fieldset className="flex flex-col gap-2 justify-between">
            {label && <Label htmlFor={props.name}>{label}</Label>}

            <input
                {...props}
                ref={ref}
                className={`min-h-10 p-4 bg-slate-50 rounded-md ${
                    error ? 'border border-rose-600' : 'border border-slate-300'
                }`}
            />

            {error && (
                <span className="pl-1 text-xs text-rose-600">
                    {error.message}
                </span>
            )}
        </fieldset>
    )
}

export const Input = forwardRef(InputElement)
