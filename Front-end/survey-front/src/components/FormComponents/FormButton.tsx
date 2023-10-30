const FormButton = ({ projectId }: { projectId: number }) => {

    return (
        <div className="submitBtnArea">
            <button className="submitBtn button" type="submit" disabled={projectId === -1}>Submit</button>
        </div>
    )
}

export default FormButton;