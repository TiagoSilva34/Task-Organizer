import { SelectHTMLAttributes  } from "react"

export interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    onChange: any
}

export type Options = {
    priority: {
        low: 'low'
        medium: 'mideium'
        high: 'high'
    }
}