import { useEffect, useState } from "react";

const QuestionWeight = ({ q, changeWeight }: { q: Question; changeWeight: any; }) => {
    const [weightValue, setWeightValue] = useState<number>(1)

    useEffect(() => {
        const timeOutId = setTimeout(() => changeWeight(q.id, weightValue), 500);
        return () => clearTimeout(timeOutId);

    }, [weightValue])


    return (
        <div className="questionWeight">
            <p>{q.index + ". " + q.description}</p>
            <input value={weightValue} onChange={(e) => setWeightValue(Number(e.target.value))} type="number"
                min={0.1} step={0.1} className="numberInput" />
        </div>
    )
}

export default QuestionWeight