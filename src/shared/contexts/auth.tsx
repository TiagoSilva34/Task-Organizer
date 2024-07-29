import { useMutation } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { loginFn } from "../services/todoApi.service";
import { ITODO } from "../models/ITodo";

type Props = {
    children: React.ReactNode
}

interface IAuthContext {
    authenticated: boolean
    setAuthenticated: (newState: boolean) => void
    Login: (username: string, password: string) => Promise<void>
}

const initial_state: IAuthContext = {
    authenticated: false,
    setAuthenticated: () => { },
    Login: function (username = "", password: string): Promise<void> {
        throw new Error("Function not implemented.");
    }
}

export const AuthContext = createContext<IAuthContext>(initial_state)

export const AuthProvider = ({ children }: Props) => {
    const [authenticated, setAuthenticated] = useState(initial_state.authenticated)

    const create = useMutation({
        mutationFn: (newTodo: ITODO) => loginFn(newTodo),
        onSuccess: async (data) => {

            if (data)
            localStorage.setItem("@AppUser", JSON.stringify(data))
        },
    })
    const Login = (username: string, password: string): any => {
        const newTodo: any = {
            username: username,
            password: password
        }
        
        create.mutate(newTodo)
    }   

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated, Login }}>
            {children}
        </AuthContext.Provider>
    )
}