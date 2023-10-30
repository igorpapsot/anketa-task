import { useState } from "react"
import TextInput from "../ToolComponents/TextInput"
import axios, { AxiosError } from "axios";
import { loginUrl } from "../../global/env";
import { useAuth } from "../ToolComponents/AuthContext";
import { useNavigate } from "react-router-dom";

const loginRequest = async (username: string, password: string) => {
    try {
        const response = await axios.post(loginUrl, {
            username: username,
            password: password
        });
        console.log(response.data)
        return response;
    } catch (e) {
        let error = e as AxiosError;
        if (error.response) {
            return error.response;
        } else {
            return false;
        }
    }
}

const SUCCESFULL_LOGIN = "Succesfull login"
const UNSUCCESFULL_LOGIN = "Wrong username or password"
const FILL_OUT_FIELDS = "Please fill out all fields"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const auth = useAuth()
    const navigate = useNavigate()

    const loginHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        if (username == "" || password == "") {
            setError(FILL_OUT_FIELDS)
            return
        }

        const res = await loginRequest(username, password)

        if (!res) {
            setError(UNSUCCESFULL_LOGIN)
            return
        }

        if (res.status === 200) {
            setError(SUCCESFULL_LOGIN)
            auth.login(res.data)
            navigate("/survey")
            return
        }

        setError(UNSUCCESFULL_LOGIN)
    }

    return (
        <form className="authPage" onSubmit={(e) => loginHandler(e)}>
            <label className={error === SUCCESFULL_LOGIN ? "formSuccess" : "formError"}>{error}</label>
            <TextInput label="Username" state={username} setState={setUsername} type="email"></TextInput>
            <TextInput label="Password" state={password} setState={setPassword} type="password"></TextInput>
            <br />
            <button type="submit" className="button">Login</button>
        </form>
    )
}

export default Login