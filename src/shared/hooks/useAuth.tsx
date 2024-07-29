import { useContext } from "react"
import { AuthContext } from "../contexts/auth"

export const useAuth = (): any => {
    const context = useContext(AuthContext)

    return context
}