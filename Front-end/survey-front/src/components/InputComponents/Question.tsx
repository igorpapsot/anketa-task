const Question = ({ question }: { question: Question }) => {

    return (
        <>  {question.type === 1 ?
            <>
                <h3 className="tooltip">{question.description}*<span className="tooltiptext">Required question</span></h3>

            </> :
            <h3>{question.description}</h3>}

        </>
    )
}

export default Question;