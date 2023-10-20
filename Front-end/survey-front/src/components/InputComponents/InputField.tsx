import { useState } from "react";
import InputChoice from "./InputChoice";
import InputQuestion from "./InputQuestion";

const InputField = ({ question }: { question: Question }) => {

    const [selectedId, setSelectedId] = useState<number>()

    return (
        <div className="inputField">
            <InputQuestion question={question} />
            {question.answers.map((a: Answer) => {
                return <InputChoice answer={a} selectedId={selectedId} setSelectedId={setSelectedId} key={a.id} />
            })}
        </div>
    )
}

export default InputField;