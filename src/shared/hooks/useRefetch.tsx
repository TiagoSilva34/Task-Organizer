import { useState } from "react"

export const useRefetch = () => {
    const [refetch, setRefetch] = useState(false)
    const [status, setStatus] = useState(false)

    const handleRefetch = () => {
        setRefetch(!refetch)
    }

    const checkTodoStatus = () => {
        setStatus(!status)
    }

    return {
        refetch,
        handleRefetch,
        status,
        checkTodoStatus
    }
}