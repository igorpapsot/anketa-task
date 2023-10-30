const Answer = ({ answer, selectedId, setSelectedId, setText }: { answer: Answer; selectedId?: number; setSelectedId: any; setText: any }) => {

    const checked = selectedId === answer.id

    const setSelectedHandler = () => {
        console.log("set selected answer")
        setSelectedId(answer.id)
    }

    return (
        <div className="choice">
            {answer.type === 1 ?
                <><input className="choiceButton" type="radio" checked={checked} value={answer.value} onChange={() => { setSelectedHandler() }} />
                    <label className="choiceVal">{answer.description}</label></>
                : <textarea className="textChoice" onChange={(e) => setText(answer.id, e.target.value)}></textarea>}
        </div>
    )
}

export default Answer;