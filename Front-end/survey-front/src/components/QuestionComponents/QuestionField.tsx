import { useState } from "react";
import Answer from "./Answer";
import InputQuestion from "./Question";
import '../../css/form.scss'

const QuestionField = ({ question, addAnswer }: { question: Question; addAnswer: any }) => {

    const [selectedId, setSelectedId] = useState<number>(-1)

    const setSelectedIdHandler = (id: number) => {
        setSelectedId(id)
        addAnswer(id, question.id, "")
    }

    const setTextHandler = (id: number, text: string) => {
        addAnswer(id, question.id, text)
    }

    return (
        <>
            <div className={question.type === 0 ? "textInput" : "radioInput"}>
                <InputQuestion question={question} />
                {question.answers.map((a: Answer) => {
                    return <Answer answer={a} selectedId={selectedId} setSelectedId={setSelectedIdHandler} key={a.id} setText={setTextHandler} />
                })}
            </div>
        </>
    )
}

export default QuestionField;