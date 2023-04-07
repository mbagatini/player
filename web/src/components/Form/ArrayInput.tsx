import { useState, KeyboardEvent, InputHTMLAttributes } from 'react'
import { Label } from './Label'
import closeIcon from '../../assets/x.svg'
import { FieldError } from 'react-hook-form'

export type UseArrayInputProps = {
    values: string[]
    handleChange: (index: number, value: string) => void
    addValue: (event: KeyboardEvent<HTMLInputElement>) => void
    removeValue: (index: number) => void
}

export function useArrayInput(
    defaultValues: string[] = [],
): UseArrayInputProps {
    const [values, setValues] = useState(defaultValues)

    function handleChange(index: number, value: string) {
        setValues((prevValues) => [
            ...prevValues.slice(0, index),
            value,
            ...prevValues.slice(index + 1),
        ])
    }

    function addValue(event: KeyboardEvent<HTMLInputElement>) {
        const target = event.target as HTMLInputElement
        const newValue = target.value.replaceAll(' ', '')

        if (event.code === 'Space' && newValue.length) {
            setValues((prevValues) => [...prevValues, newValue])
            target.value = ''
        }

        if (event.code === 'Backspace' && newValue.length === 0) {
            if (values.length > 0) removeValue(values.length - 1)
        }
    }

    function removeValue(index: number) {
        setValues((prevValues) => [
            ...prevValues.slice(0, index),
            ...prevValues.slice(index + 1),
        ])
    }

    return {
        values,
        handleChange,
        addValue,
        removeValue,
    }
}

interface ArrayInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: FieldError
    arrayInputControl: UseArrayInputProps
}

export function ArrayInput({
    label,
    error,
    arrayInputControl,
    ...props
}: ArrayInputProps) {
    const { values, addValue, removeValue } = arrayInputControl

    return (
        <fieldset className="flex flex-col gap-2 ">
            {label && <Label htmlFor={props.name}>{label}</Label>}

            <div className=" min-h-10 p-2 bg-slate-50 rounded-md border border-slate-300 flex items-start flex-wrap">
                <ul className="flex flex-wrap gap-1">
                    {values.map((value, index) => (
                        <li
                            key={index}
                            className="flex items-center px-2 py-1 gap-1 rounded-md bg-slate-300 hover:cursor-pointer"
                        >
                            <span>{value}</span>
                            <i onClick={() => removeValue(index)}>
                                <img
                                    src={closeIcon}
                                    alt="Remove tag"
                                    className="w-4 h-4"
                                />
                            </i>
                        </li>
                    ))}
                </ul>
                <input
                    className="w-full px-1 py-2 bg-transparent focus:border-none focus:outline-none"
                    onKeyUp={(event) => addValue(event)}
                    {...props}
                />
            </div>

            {error && (
                <span className="text-xs text-rose-600">{error.message}</span>
            )}
        </fieldset>
    )
}
