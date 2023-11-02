import QuestionField from "../QuestionComponents/QuestionField";
import FormButton from "./FormButton";
import axios from "axios";
import { questionUrl, submissionUrl } from "../../global/env";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    return await axios.post(submissionUrl, {
        projectId: submission.projectId,
        answeredQuestions: submission.answeredQuestions,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        });
};

const FILL_ALL_FIELDS = "Please answer all required questions";
const SOMETHING_WENT_WRONG = "Something went wrong"
const SUCCESS = "Succesfull submission"

const SurveyForm = () => {
    const [answers, setAnswers] = useState<AnsweredQuestion[]>([])
    const { projectId } = useParams()

    const auth = useAuth()
    const toastContext = useToast()
    const navigate = useNavigate()

    if (!auth.getLogged()) {
        return (
            <ErrorPage errorMessageProp={NOT_AUTHORIZED} />
        )
    }

    const { data: questions } = useQuery({
        queryKey: ['getQuestions'],
        queryFn: () => getQuestions(auth.getToken()),
    });

    const { isPending, mutateAsync } = useMutation({
        mutationFn: (submission: Submission) => sendSubmssion(submission, auth.getToken()),
        onError: () => toastContext.dispatch(SOMETHING_WENT_WRONG, ToastTypeE.Error, 5000),
        onSuccess: () => {
            toastContext.dispatch(SUCCESS, ToastTypeE.Success, 5000)
            navigate("/survey")
        },
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

        await mutateAsync(submission)
    }

    return (
        <div className="form">
            <form onSubmit={(e) => handleSubmitForm(e)}>
                {questions?.data
                    .map((q: Question) => {
                        return <QuestionField question={q} key={q.id} addAnswer={handleAddAnswers}></QuestionField>
                    })}
                <FormButton projectId={Number(projectId)} />
                {isPending && <strong>Submitting...</strong>}
            </form>
        </div>
    )
}

export default SurveyForm;