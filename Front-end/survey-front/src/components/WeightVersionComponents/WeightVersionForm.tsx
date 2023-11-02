import { useState } from "react";
import ErrorPage from "../ToolComponents/ErrorPage";
import TextInput from "../ToolComponents/TextInput";
import axios from "axios";
import { questionUrl, weightVersionUrl } from "../../global/env";
import { useAuth, NOT_AUTHORIZED } from "../Contexts/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import '../../css/weightVersions.scss'
import { useToast } from "../Contexts/ToastContext";
import ToastTypeE from "../ToastComponents/ToastTypeE";
import QuestionWeight from "./QuestionWeight";

const addWeightVersionRequest = async (versionName: string, weights: Weight[]) => {
    return await axios.post(weightVersionUrl, {
        versionName: versionName,
        weights: weights
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    })
        .then((response) => {
            return response
        })
        .catch((error) => {
            throw error
        });
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

const SUCCESS = "Succesfull creating of weight version"
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
    const [weights, setWeights] = useState<Weight[]>([])

    const { data: questions } = useQuery({
        queryKey: ['getQuestions'],
        queryFn: () => getQuestions(auth.getToken()),
    });

    const { isPending, mutateAsync } = useMutation({
        mutationFn: () => addWeightVersionRequest(versionName, weights),
        onError: () => toastContext.dispatch(SOMETHING_WENT_WRONG, ToastTypeE.Error, 10000),
        onSuccess: () => toastContext.dispatch(SUCCESS, ToastTypeE.Success, 5000)
    });

    const changeWeightHandler = (questionId: number, weightValue: number) => {

        const weightForQuestionExists = weights.some((w) => w.index === questionId);
        if (!weightForQuestionExists) {
            let weight: Weight = {
                index: questionId,
                value: weightValue
            }
            setWeights((prevState) => [...prevState, weight]);
            return
        }

        const nextWeights = weights.map((w) => {
            if (w.index === questionId) {
                w.value = weightValue
                return w;
            } else {
                return w;
            }
        });

        setWeights(nextWeights);
    }

    const addVersionHandler = async () => {
        if (versionName === "") {
            toastContext.dispatch(ENTER_NAME, ToastTypeE.Error, 5000)
            return
        }

        console.log("Sending data ...")
        await mutateAsync()
    }

    return (
        <div className="weightVersions">
            <div className="weightQuestionRow">
                {questions?.data.map((q: Question) => { return <QuestionWeight q={q} changeWeight={changeWeightHandler} key={q.id} /> })}
            </div>

            <div className="weightVersionRow">
                <TextInput label="Version name" state={versionName} setState={setVersionName} type="text" />
                <button type="submit" className="button" onClick={() => addVersionHandler()}>Submit</button>
                {isPending && <strong>Submitting...</strong>}
            </div>
        </div>
    )
}

export default WeightVersionForm;