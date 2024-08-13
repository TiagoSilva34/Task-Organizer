import { useMutation } from "@tanstack/react-query";
import { createContext, SetStateAction, useEffect, useState } from "react";
import { loginFn } from "../services/todoApi.service";
import { ITODO } from "../models/ITodo";

type Props = {
    children: React.ReactNode
}

interface IAuthContext {
    authenticated: boolean
    token: string 
    setToken: React.Dispatch<SetStateAction<string>>
    setAuthenticated: (newState: boolean) => void
    Login: (username: string, password: string) => Promise<void>
    setRefetch: React.Dispatch<SetStateAction<boolean>>
    refetch: boolean
}

const initial_state: IAuthContext = {
    authenticated: false,
    token: "",
    refetch: false,
    setRefetch: () => {},
    setAuthenticated: () => { },
    setToken: () => {},
    Login: function (username = "", password: string): Promise<void> {
        throw new Error("Function not implemented.");
    }
}

export const AuthContext = createContext<IAuthContext>(initial_state)

export const AuthProvider = ({ children }: Props) => {
    const [authenticated, setAuthenticated] = useState(initial_state.authenticated)
    const [token, setToken] = useState<string>("")
    const [refetch, setRefetch] = useState<boolean>(initial_state.refetch)


    const create = useMutation({
        mutationFn: (newTodo: ITODO) => loginFn(newTodo),
        onSuccess: async (data: any) => {
            debugger
            if (data.username === "tiago@hotmail.com") {
                setToken(data.token)
                localStorage.setItem("@AppUser", JSON.stringify(data))
            }
        },
    })

    const Login = (username: string, password: string): any => {
        const newTodo: any = {
            username: username,
            password: password
        }
        create.mutate(newTodo)
    }   

    useEffect(() => {
        let authentication = JSON.parse(localStorage.getItem('@AppUser') as any)
        
        if (!!authentication && authentication.token) setToken(authentication.token)
    }, [token])

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated, Login, token, setToken, refetch, setRefetch }}>
            {children}
        </AuthContext.Provider>
    )
}