import QuestionField from "../InputComponents/QuestionField";
import FormButton from "./FormButton";
import axios, { AxiosError } from "axios";
import { questionUrl, submissionUrl } from "../../global/env";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const sendSubmssion = async (
    submission: Submission
) => {
    try {
        const response = await axios.post(submissionUrl, {
            projectId: submission.projectId,
            answeredQuestions: submission.answeredQuestions,
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

const Form = () => {

    const [answers, setAnswers] = useState<AnsweredQuestion[]>([])
    const [formReponse, setFormReponse] = useState<string>("")
    //const projectId = useSelector((state: RootState) => state.project.projectId)
    const { projectId } = useParams()

    const getQuestions = async () => {
        console.log("Getting questions...")
        const res = await axios.get(questionUrl);
        if (res && res.status == 200) {
            return res
        }
    };

    const { data: questions } = useQuery({
        queryKey: ['getQuestions'],
        queryFn: getQuestions,
    });

    const handleAddAnswers = (answerId: number, questionId: number, text: string) => {
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
        const submission: Submission = {
            answeredQuestions: answers,
            projectId: Number(projectId)
        }
        console.log(submission)


        if (submission.projectId === -1 || submission.answeredQuestions.length !== questions?.data.length) {
            setFormReponse("Please answer all questions")
            return;
        }

        // const res = await sendSubmssion(submission)
        // console.log(res)

        // if (!res) {
        //     setFormReponse("Something went wrong")
        //     return
        // }

        // if (res === 200) {
        //     setFormReponse("Succesfull submission")
        //     return
        // }

        // setFormReponse("Something went wrong")
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