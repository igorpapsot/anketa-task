const QuestionSelect = ({ questionId, questions, setQuestionId }: { questionId: number, questions: Question[] | undefined, setQuestionId: any; }) => {

    const label = <label>Question</label>;

    const selectHandler = (val: string) => {
        setQuestionId(Number(val))
    }

    if (questions == undefined) {
        return (
            <>
                {label}
                <select className="dropdown button">
                    <option>No questions found</option>
                </select>
            </>
        )
    }

    return (
        <>
            {label}
            <select className="authInput button" onChange={(e) => { selectHandler(e.target.value) }}>
                {questionId === -1 && <option value={-1} hidden>Select question</option>}
                {questions.map((c: Question) => {
                    return <option value={c.id} key={c.id}>{c.index}:{c.description}</option>
                })}
            </select>
        </>
    )
}

export default QuestionSelect