import { ButtonHTMLAttributes } from 'react'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    type: "submit" | "reset" | "button"
    disabled: boolean
    children: React.ReactNode
    onClick: React.MouseEventHandler<HTMLButtonElement>
}