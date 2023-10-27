import { useState } from "react"
import TextInput from "../ToolComponents/TextInput"
import axios, { AxiosError } from "axios";
import { registerUrl } from "../../global/env";
import { useNavigate } from "react-router-dom";

const registerRequest = async (username: string, password: string) => {
    try {
        const response = await axios.post(registerUrl, {
            username: username,
            password: password
        });
        return response.status;
    } catch (e) {
        let error = e as AxiosError;
        if (error.response) {
            return error.response.status;
        } else {
            return false;
        }
    }
}

const SUCCESFULL_REGISTER = "Succesfull register"
const UNSUCCESFULL_REGISTER = "Wrong username or password"
const FILL_OUT_FIELDS = "Please fill out all fields"
const PASSWORDS_NOT_MATCHING = "Passwords dont match"

const Register = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const registerHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        if (username == "" || password == "") {
            setError(FILL_OUT_FIELDS)
            return
        }

        if (password !== repeatPassword) {
            setError(PASSWORDS_NOT_MATCHING)
            return
        }

        const res = await registerRequest(username, password)
        console.log(res)

        if (!res) {
            setError(UNSUCCESFULL_REGISTER)
            return
        }

        if (res === 200) {
            setError(SUCCESFULL_REGISTER)
            navigate("/login")
            return
        }

        setError(UNSUCCESFULL_REGISTER)
    }

    return (
        <form className="authPage" onSubmit={(e) => registerHandler(e)}>
            <label className={error === SUCCESFULL_REGISTER ? "formSuccess" : "formError"}>{error}</label>
            <TextInput label="Username" state={username} setState={setUsername} type="email"></TextInput>
            <TextInput label="Password" state={password} setState={setPassword} type="password"></TextInput>
            <TextInput label="Repeat password" state={repeatPassword} setState={setRepeatPassword} type="password"></TextInput>
            <br />
            <button type="submit" className="button authButton">Register</button>
        </form>
    )
}

export default Register