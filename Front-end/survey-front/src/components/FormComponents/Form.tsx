import InputField from "../InputComponents/InputField";
import FormButton from "./FormButton";
import axios from "axios";
import { questionUrl } from "../../global/env";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Form = () => {

    const [answers, setAnswers] = useState<AnsweredQuestion[]>([])
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

    const handleAddAnswers = (answerId: number, questionId: number) => {
        const answerExists = answers.some((answer) => answer.questionId === questionId);
        if (!answerExists) {
            var answeredQuestion: AnsweredQuestion = {
                answerId: answerId,
                questionId: questionId
            }
            setAnswers((prevState) => [...prevState, answeredQuestion]);
        }
    }

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault()
        var submission: Submission = {
            answeredQuestions: answers,
            projectId: Number(projectId)
        }
        console.log(submission)
    }

    return (
        <div className="form">
            <form onSubmit={(e) => handleSubmitForm(e)}>
                {questions?.data
                    .map((q: Question) => {
                        return <InputField question={q} key={q.id} addAnswer={handleAddAnswers}></InputField>
                    })}
                <FormButton projectId={Number(projectId)} />
            </form>
        </div>
    )
}

export default Form;