import QuestionField from "../QuestionComponents/QuestionField";
import FormButton from "./FormButton";
import axios, { AxiosError } from "axios";
import { questionUrl, submissionUrl } from "../../global/env";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth, NOT_AUTHORIZED } from "../Contexts/AuthContext";
import ErrorPage from "../ToolComponents/ErrorPage";
import '../../css/form.scss'
import { useToast } from "../Contexts/ToastContext";
import ToastTypeE from "../ToastComponents/ToastTypeE";

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

const sendSubmssion = async (
    submission: Submission, token: string
) => {
    try {
        const response = await axios.post(submissionUrl, {
            projectId: submission.projectId,
            answeredQuestions: submission.answeredQuestions,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
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
};

const FILL_ALL_FIELDS = "Please answer all required questions";
const SOMETHING_WENT_WRONG = "Something went wrong"
const SUCCESS = "Succesfull submission"

const SurveyForm = () => {

    const [answers, setAnswers] = useState<AnsweredQuestion[]>([])
    const { projectId } = useParams()

    const auth = useAuth()
    const toastContext = useToast()

    if (!auth.getLogged()) {
        return (
            <ErrorPage errorMessageProp={NOT_AUTHORIZED} />
        )
    }

    const { data: questions } = useQuery({
        queryKey: ['getQuestions'],
        queryFn: () => getQuestions(auth.getToken()),
    });

    const handleAddAnswers = (answerId: number, questionId: number, text: string) => {
        //Check if answer for question exists and if not, add new answer
        const answerForQuestionExists = answers.some((answer) => answer.questionId === questionId);
        if (!answerForQuestionExists) {
            let answeredQuestion: AnsweredQuestion = {
                answerId: answerId,
                questionId: questionId,
                text: text
            }
            setAnswers((prevState) => [...prevState, answeredQuestion]);
            return
        }

        //Iterate through existing answers. If new answer exists return it, if not return existing
        const newAnswers = answers.map((a: AnsweredQuestion) => {
            if (a.questionId == questionId) {
                let answeredQuestion: AnsweredQuestion = {
                    answerId: answerId,
                    questionId: questionId,
                    text: text
                }
                return answeredQuestion
            }
            return a
        })

        setAnswers(newAnswers)
    }

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault()

        const requiredAnswers: AnsweredQuestion[] = []
        const requiredQuestions: Question[] = []

        //Check if answers exist for all required questions 
        questions?.data.forEach((question: Question) => {
            if (question.type === 1) {
                requiredQuestions.push(question)
                answers.forEach((answer: AnsweredQuestion) => {
                    if (answer.questionId === question.id) {
                        requiredAnswers.push(answer)
                    }
                });
            }
        });
        const requiredAnswersExist = requiredAnswers.length === requiredQuestions.length

        if (Number(projectId) === -1 || !requiredAnswersExist) {
            toastContext.dispatch(FILL_ALL_FIELDS, ToastTypeE.Error, 5000)
            return;
        }

        //Send submission post request to backend and verify response
        const submission: Submission = {
            answeredQuestions: answers,
            projectId: Number(projectId)
        }

        const res = await sendSubmssion(submission, auth.getToken())
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

    return (
        <div className="form">
            <form onSubmit={(e) => handleSubmitForm(e)}>
                {questions?.data
                    .map((q: Question) => {
                        return <QuestionField question={q} key={q.id} addAnswer={handleAddAnswers}></QuestionField>
                    })}
                <FormButton projectId={Number(projectId)} />
            </form>
        </div>
    )
}

export default SurveyForm;