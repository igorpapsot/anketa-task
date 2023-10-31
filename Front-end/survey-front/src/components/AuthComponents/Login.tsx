import { useState } from "react";
import TextInput from "../ToolComponents/TextInput";
import axios, { AxiosError } from "axios";
import { loginUrl } from "../../global/env";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import '../../css/auth.scss';
import { useToast } from "../Contexts/ToastContext";
import ToastTypeE from "../ToastComponents/ToastTypeE";

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

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const auth = useAuth()
    const toastContext = useToast()
    const navigate = useNavigate()

    const loginHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        if (username == "" || password == "") {
            toastContext.dispatch(FILL_OUT_FIELDS, ToastTypeE.Error)
            return
        }

        const res = await loginRequest(username, password)

        if (!res) {
            toastContext.dispatch(UNSUCCESFULL_LOGIN, ToastTypeE.Error)
            return
        }

        if (res.status === 200) {
            toastContext.dispatch(SUCCESFULL_LOGIN, ToastTypeE.Success)
            auth.login(res.data)
            navigate("/survey")
            return
        }

        toastContext.dispatch(UNSUCCESFULL_LOGIN, ToastTypeE.Error)
    }

    return (
        <form className="authPage" onSubmit={(e) => loginHandler(e)}>
            <TextInput label="Username" state={username} setState={setUsername} type="email"></TextInput>
            <TextInput label="Password" state={password} setState={setPassword} type="password"></TextInput>
            <button type="submit" className="button">Login</button>
        </form>
    )
}

export default Login