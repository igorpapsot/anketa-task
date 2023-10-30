import { useEffect, useState } from "react";
import ErrorPage from "../ToolComponents/ErrorPage";
import TextInput from "../ToolComponents/TextInput";
import NumberInput from "../ToolComponents/NumberInput";
import axios, { AxiosError } from "axios";
import { questionUrl, weightVersionUrl } from "../../global/env";
import QuestionSelect from "./QuestionSelect";
import { useAuth, NOT_AUTHORIZED } from "../ToolComponents/Auth";
import WeightList from "./WeightList";

const WEIGHT_EXISTS = "Weight for this questions already added"
const SELECT_ALL_QUESTIONS = "Please create weights for all questions"
const SUCCESS = "Succesfull creating of weight version"
const NULL = "Please select weight and question"
const ENTER_NAME = "Please enter version name"

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


const WeightVersionForm = () => {

    const auth = useAuth()

    if (!auth.getLogged() || auth.getUser()?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] !== "Admin") {
        return (
            <ErrorPage errorMessageProp={NOT_AUTHORIZED} />
        )
    }

    const [error, setError] = useState<string>("")

    const [versionName, setVersionName] = useState<string>("")
    const [weightValue, setWeightValue] = useState<number>(0)
    const [weights, setWeights] = useState<Weight[]>([])
    const [selectedQuestionId, setSelectedQuestionId] = useState<number>(-1)
    const [questions, setQuestions] = useState<Question[]>([])

    const getQuestions = async () => {
        console.log("Getting questions...")
        const res = await axios.get(questionUrl, {
            headers: {
                Authorization: `Bearer ${auth.getToken()}`
            }
        });
        if (res && res.status == 200) {
            setQuestions(res.data)
        }
    };

    useEffect(() => {
        getQuestions()
    }, [])

    const addWeightHandler = () => {
        if (weightValue === 0 || selectedQuestionId === -1) {
            setError(NULL)
            return
        }

        const weightForQuestion = weights.some((w) => w.index === selectedQuestionId);
        if (!weightForQuestion) {
            let weight: Weight = {
                index: selectedQuestionId,
                value: weightValue
            }
            setWeights((prevState) => [...prevState, weight]);
            setError("")
            return
        }
        setError(WEIGHT_EXISTS)
    }

    const addVersionHandler = async () => {
        if (versionName === "") {
            setError(ENTER_NAME)
            return
        }

        const allWeightsExist = weights.length === questions.length
        if (!allWeightsExist) {
            setError(SELECT_ALL_QUESTIONS)
            return
        }
        console.log("Sending data ...")
        const res = await addWeightVersionRequest(versionName, weights)
        console.log(res)

        if (!res) {
            setError("Something went wrong")
            return
        }

        if (res === 200) {
            setError(SUCCESS)
            return
        }

        setError("Something went wrong")
    }

    const removeWeightHandler = (weightIndex: number) => {
        setWeights((prev) => {
            return [...prev.filter(a => a.index !== weightIndex)]
        })
    }

    return (
        <div className="weightVersions">
            <label className={error === SUCCESS ? "formSuccess" : "formError"}>{error}</label>
            <QuestionSelect questions={questions} questionId={selectedQuestionId} setQuestionId={setSelectedQuestionId} />
            <NumberInput label="Weight value" state={weightValue} setState={setWeightValue} min={1} max={10} />
            <button className="button authButton" onClick={() => addWeightHandler()}>Add weight</button>
            <TextInput label="Version name" state={versionName} setState={setVersionName} type="text" />
            <button type="submit" className="button authButton" onClick={() => addVersionHandler()}>Submit</button>

            <WeightList weights={weights} removeWeightHandler={removeWeightHandler} />
        </div>

    )
}

export default WeightVersionForm;