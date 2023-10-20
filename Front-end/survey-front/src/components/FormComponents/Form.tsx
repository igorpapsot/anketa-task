import InputField from "../InputComponents/InputField";
import FormButton, { RootState } from "./FormButton";
import FormHeader from "./FormHeader";
import axios from "axios";
import { questionUrl } from "../../global/env";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";

const Form = () => {

    const [answers, setAnswers] = useState<AnsweredQuestion[]>([])
    const projectId = useSelector((state: RootState) => state.project.projectId)

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

    const handleAddAnswers = (answerId: number) => {
        var answeredQuestion: AnsweredQuestion = {
            answerId: answerId
        }
        //TODO: Dodati odgovor na pitanje ako ne postoji ili zameniti postojeci
        setAnswers((prevState: any) => [...prevState, answeredQuestion])
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
            <FormHeader />
            <form onSubmit={(e) => handleSubmitForm(e)}>
                {questions?.data
                    .map((q: Question) => {
                        return <InputField question={q} key={q.id} addAnswer={handleAddAnswers}></InputField>
                    })}
                <FormButton />
            </form>


        </div>
    )
}

export default Form;