import { useState } from "react";
import ErrorPage from "../ToolComponents/ErrorPage";
import TextInput from "../ToolComponents/TextInput";
import NumberInput from "../ToolComponents/NumberInput";
import axios, { AxiosError } from "axios";
import { questionUrl, weightVersionUrl } from "../../global/env";
import { useAuth, NOT_AUTHORIZED } from "../Contexts/AuthContext";
import WeightList from "./WeightList";
import Dropdown from "../ToolComponents/Dropdown";
import { useQuery } from "@tanstack/react-query";
import '../../css/weightVersions.scss'
import { useToast } from "../Contexts/ToastContext";
import ToastTypeE from "../ToastComponents/ToastTypeE";

const addWeightVersionRequest = async (versionName: string, weights: Weight[]) => {
    try {
        const response = await axios.post(weightVersionUrl, {
            versionName: versionName,
            weights: weights
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
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

const getQuestions = async (token: string) => {
    console.log("Getting questions...")
    const res = await axios.get(questionUrl, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (res && res.status == 200) {
        return res
    }
};

const WEIGHT_EXISTS = "Weight for this questions already added"
const SELECT_ALL_QUESTIONS = "Please create weights for all questions"
const SUCCESS = "Succesfull creating of weight version"
const NULL = "Please select weight and question"
const ENTER_NAME = "Please enter version name"
const SOMETHING_WENT_WRONG = "Something went wrong"

const WeightVersionForm = () => {

    const auth = useAuth()
    const toastContext = useToast()

    if (!auth.getLogged() || auth.getUser()?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] !== "Admin") {
        return (
            <ErrorPage errorMessageProp={NOT_AUTHORIZED} />
        )
    }

    const [versionName, setVersionName] = useState<string>("")
    const [weightValue, setWeightValue] = useState<number>(0)
    const [weights, setWeights] = useState<Weight[]>([])
    const [selectedQuestionId, setSelectedQuestionId] = useState<number>(-1)

    const { data: questions } = useQuery({
        queryKey: ['getQuestions'],
        queryFn: () => getQuestions(auth.getToken()),
    });

    const addWeightHandler = () => {
        if (weightValue === 0 || selectedQuestionId === -1) {
            toastContext.dispatch(NULL, ToastTypeE.Error, 5000)
            return
        }

        const weightForQuestion = weights.some((w) => w.index === selectedQuestionId);
        if (!weightForQuestion) {
            let weight: Weight = {
                index: selectedQuestionId,
                value: weightValue
            }
            setWeights((prevState) => [...prevState, weight]);
            return
        }
        toastContext.dispatch(WEIGHT_EXISTS, ToastTypeE.Error, 5000)
    }

    const addVersionHandler = async () => {
        if (versionName === "") {
            toastContext.dispatch(ENTER_NAME, ToastTypeE.Error, 5000)
            return
        }

        const allWeightsExist = weights.length === questions?.data.length
        if (!allWeightsExist) {
            toastContext.dispatch(SELECT_ALL_QUESTIONS, ToastTypeE.Error, 5000)
            return
        }
        console.log("Sending data ...")
        const res = await addWeightVersionRequest(versionName, weights)
        console.log(res)

        if (!res) {
            toastContext.dispatch(SOMETHING_WENT_WRONG, ToastTypeE.Error, 5000)
            return
        }

        if (res === 200) {
            toastContext.dispatch(SUCCESS, ToastTypeE.Success, 5000)
            return
        }

        toastContext.dispatch(SOMETHING_WENT_WRONG, ToastTypeE.Error, 5000)
    }

    const removeWeightHandler = (weightIndex: number) => {
        setWeights((prev) => {
            return [...prev.filter(a => a.index !== weightIndex)]
        })
    }

    return (
        <div className="weightVersions">
            <Dropdown values={questions?.data.map((q: Question) => { return { id: q.id, value: q.index + ":" + q.description } })}
                selectedValue={selectedQuestionId} setSelected={setSelectedQuestionId} label={"Question"} />

            <NumberInput label="Weight value" state={weightValue} setState={setWeightValue} min={1} max={10} />
            <button className="button" onClick={() => addWeightHandler()}>Add weight</button>
            <TextInput label="Version name" state={versionName} setState={setVersionName} type="text" />
            <button type="submit" className="button" onClick={() => addVersionHandler()}>Submit</button>

            <WeightList weights={weights} removeWeightHandler={removeWeightHandler} />
        </div>
    )
}

export default WeightVersionForm;