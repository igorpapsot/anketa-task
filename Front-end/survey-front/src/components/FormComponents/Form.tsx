import QuestionField from "../InputComponents/QuestionField";
import FormButton from "./FormButton";
import axios, { AxiosError } from "axios";
import { questionUrl, submissionUrl } from "../../global/env";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth, NOT_AUTHORIZED } from "../ToolComponents/Auth";
import ErrorPage from "../ToolComponents/ErrorPage";

const Form = () => {

    const [answers, setAnswers] = useState<AnsweredQuestion[]>([])
    const [formReponse, setFormReponse] = useState<string>("")
    const { projectId } = useParams()

    const auth = useAuth()

    if (!auth.getLogged()) {
        return (
            <ErrorPage errorMessageProp={NOT_AUTHORIZED} />
        )
    }

    const sendSubmssion = async (
        submission: Submission
    ) => {
        try {
            const response = await axios.post(submissionUrl, {
                projectId: submission.projectId,
                answeredQuestions: submission.answeredQuestions,
            }, {
                headers: {
                    Authorization: `Bearer ${auth.getToken()}`
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

    const getQuestions = async () => {
        console.log("Getting questions...")
        const res = await axios.get(questionUrl, {
            headers: {
                Authorization: `Bearer ${auth.getToken()}`
            }
        });
        if (res && res.status == 200) {
            return res
        }
    };

    const { data: questions } = useQuery({
        queryKey: ['getQuestions'],
        queryFn: getQuestions,
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
            setFormReponse("Please answer all required questions")
            return;
        }

        //Send submission post request to backend and verify response
        const submission: Submission = {
            answeredQuestions: answers,
            projectId: Number(projectId)
        }

        const res = await sendSubmssion(submission)
        console.log(res)

        if (!res) {
            setFormReponse("Something went wrong")
            return
        }

        if (res === 200) {
            setFormReponse("Succesfull submission")
            return
        }

        setFormReponse("Something went wrong")
    }


    return (
        <div className="form">
            <label className={formReponse === "Succesfull submission" ? "formSuccess" : "formError"}>{formReponse}</label>
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

export default Form;