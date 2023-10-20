const InputChoice = ({ answer, selectedId, setSelectedId }: { answer: Answer; selectedId?: number; setSelectedId: any }) => {

    const checked = selectedId === answer.id

    const setSelectedHandler = () => {
        console.log("set selected answer")
        setSelectedId(answer.id)
    }

    return (
        <div className="choice">
            <input className="choiceButton" type="radio" checked={checked} value={answer.value} onChange={() => { setSelectedHandler() }} />
            <label className="choiceVal">{answer.description}</label>
        </div>
    )
}

export default InputChoice;