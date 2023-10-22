import { useState } from "react"
import AuthInput from "./AuthInput"

const Register = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    return (
        <form className="authPage">
            <AuthInput label="Email" state={email} setState={setEmail} type="email"></AuthInput>
            <AuthInput label="Username" state={username} setState={setUsername} type="text"></AuthInput>
            <AuthInput label="Password" state={password} setState={setPassword} type="password"></AuthInput>
            <br />
            <button className="button authButton">Login</button>
        </form>
    )
}

export default Register