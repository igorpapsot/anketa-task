import { useState } from "react";
import InputChoice from "./InputChoice";
import InputQuestion from "./InputQuestion";

const InputField = ({ question, addAnswer }: { question: Question; addAnswer: any }) => {

    const [selectedId, setSelectedId] = useState<number>()

    const setSelectedIdHandler = (id: number) => {
        setSelectedId(id)
        addAnswer(id, question.id)
    }

    return (
        <div className="inputField">
            <InputQuestion question={question} />
            {question.answers.map((a: Answer) => {
                return <InputChoice answer={a} selectedId={selectedId} setSelectedId={setSelectedIdHandler} key={a.id} />
            })}
        </div>
    )
}

export default InputField;