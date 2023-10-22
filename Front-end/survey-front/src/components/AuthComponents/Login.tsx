import { useState } from "react"
import AuthInput from "./AuthInput"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <form className="authPage">
            <AuthInput label="Username" state={username} setState={setUsername} type="text"></AuthInput>
            <AuthInput label="Password" state={password} setState={setPassword} type="password"></AuthInput>
            <br />
            <button className="button authButton">Login</button>
        </form>
    )
}

export default Login