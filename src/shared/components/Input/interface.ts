import { InputHTMLAttributes } from "react"

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement>{
    type: string 
    placeholder?: string 
    value?: any
    onChange: React.ChangeEventHandler<HTMLInputElement>
}