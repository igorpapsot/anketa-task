import { useState } from "react"
import TextInput from "../ToolComponents/TextInput"
import axios, { AxiosError } from "axios";
import { registerUrl } from "../../global/env";
import { useNavigate } from "react-router-dom";
import '../../css/auth.scss'
import { useToast } from "../Contexts/ToastContext";
import ToastTypeE from "../ToastComponents/ToastTypeE";

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
const PASSWORDS_NOT_MATCHING = "Passwords don't match"

const Register = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const toastContext = useToast()
    const navigate = useNavigate()

    const registerHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        if (username == "" || password == "") {
            toastContext.dispatch(FILL_OUT_FIELDS, ToastTypeE.Error, 5000)
            return
        }

        if (password !== repeatPassword) {
            toastContext.dispatch(PASSWORDS_NOT_MATCHING, ToastTypeE.Error, 5000)
            return
        }

        const res = await registerRequest(username, password)
        console.log(res)

        if (!res) {
            toastContext.dispatch(UNSUCCESFULL_REGISTER, ToastTypeE.Error, 5000)
            return
        }

        if (res === 200) {
            toastContext.dispatch(SUCCESFULL_REGISTER, ToastTypeE.Success, 5000)
            navigate("/login")
            return
        }

        toastContext.dispatch(UNSUCCESFULL_REGISTER, ToastTypeE.Error, 5000)
    }

    return (
        <form className="authPage" onSubmit={(e) => registerHandler(e)}>
            <TextInput label="Username" state={username} setState={setUsername} type="email"></TextInput>
            <TextInput label="Password" state={password} setState={setPassword} type="password"></TextInput>
            <TextInput label="Repeat password" state={repeatPassword} setState={setRepeatPassword} type="password"></TextInput>
            <button type="submit" className="button">Register</button>
        </form>
    )
}

export default Register