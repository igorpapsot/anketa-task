import { useState } from "react";
import TextInput from "../ToolComponents/TextInput";
import axios from "axios";
import { loginUrl } from "../../global/env";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import '../../css/auth.scss';
import { useToast } from "../Contexts/ToastContext";
import ToastTypeE from "../ToastComponents/ToastTypeE";
import { useMutation } from "@tanstack/react-query";

const loginRequest = async (username: string, password: string) => {
    return await axios.post(loginUrl, {
        username: username,
        password: password
    })
        .then((response) => {
            return response
        })
        .catch((error) => {
            throw error
        })
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

    const { isPending, mutateAsync } = useMutation({
        mutationFn: () => loginRequest(username, password),
        onError: () => toastContext.dispatch(UNSUCCESFULL_LOGIN, ToastTypeE.Error, 10000),
        onSuccess: (response) => {
            toastContext.dispatch(SUCCESFULL_LOGIN, ToastTypeE.Success, 5000)
            auth.login(response.data)
            navigate("/survey")
        },
    });

    const loginHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        if (username == "" || password == "") {
            toastContext.dispatch(FILL_OUT_FIELDS, ToastTypeE.Error, 1000)
            return
        }

        await mutateAsync()
    }

    return (
        <form className="authPage" onSubmit={(e) => loginHandler(e)}>
            <TextInput label="Username" state={username} setState={setUsername} type="email"></TextInput>
            <TextInput label="Password" state={password} setState={setPassword} type="password"></TextInput>
            <button type="submit" className="button">Login</button>

            {isPending && <strong>Loging in...</strong>}
        </form>
    )
}

export default Login