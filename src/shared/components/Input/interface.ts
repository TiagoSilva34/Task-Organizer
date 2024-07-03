import { InputHTMLAttributes } from "react"

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement>{
    type: string 
    placeholder?: string 
    value?: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
}