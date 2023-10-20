import InputField from "../InputComponents/InputField";
import FormButton from "./FormButton";
import FormHeader from "./FormHeader";
import axios from "axios";
import { questionUrl } from "../../global/env";
import { useQuery } from "@tanstack/react-query";

const Form = () => {

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

    return (
        <div className="form">
            <FormHeader />
            {questions?.data
                .map((q: Question) => {
                    return <InputField question={q} key={q.id}></InputField>
                })}
            <FormButton />
        </div>
    )
}

export default Form;