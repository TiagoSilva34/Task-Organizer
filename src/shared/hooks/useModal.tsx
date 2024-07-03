import { useState } from "react"

export const useModel = () => {
    const [isOpen, setOpen] = useState(false)

    const toggle = () => {
        setOpen(!isOpen)
    }

    return {
        isOpen,
        toggle
    }
}