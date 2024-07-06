import { SelectHTMLAttributes  } from "react"

export interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    onChange: any
    value: string
    children: React.ReactNode
}

export type Options = {
    priority: {
        low: 'low'
        medium: 'mideium'
        high: 'high'
    }
}