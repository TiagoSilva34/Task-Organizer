import { useNavigate } from "react-router-dom"
import { Button } from "../../shared/components/Button"
import { Form } from "../../shared/components/Form"
import { Input } from "../../shared/components/Input"
import "./styles.scss"
import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../shared/contexts/auth"

export const Login = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setUPassword] = useState<string>("")

    const context = useContext(AuthContext)
    const navigation = useNavigate()

    const handleUsername = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }, [username])

    const handlePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setUPassword(event.target.value)
    }, [password])

    const handleLogin = () => {
       context.Login(username, password)
       context.setAuthenticated(true)

       setTimeout(() => {
        debugger
            let AppUser = JSON.parse(localStorage.getItem("@AppUser") as any)

            console.log(AppUser)

            if (AppUser.username) navigation('/task')
       }, 1000)
    }

    useEffect(() => {
        localStorage.removeItem("cache")
    }, [])
    
    return (
        <div className="container-signin">
            <Form className="form-signin">
                <h1>Sign In</h1>
                <Input type="text" placeholder="Typing your username" className="username" onChange={handleUsername} />
                <Input type="password" placeholder="Typing your password" className="password" onChange={handlePassword} />
                <Button disabled={false} className="btn-signin" type="button" onClick={handleLogin}>sign in</Button>
            </Form>
        </div>
    )
}