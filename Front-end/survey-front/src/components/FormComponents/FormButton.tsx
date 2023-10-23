
export interface RootState {
    project: {
        projectId: number;
    };
}
const FormButton = ({ projectId }: { projectId: number }) => {

    //const projectId = useSelector((state: RootState) => state.project.projectId)

    return (
        <div className="submitBtnArea">
            <button className="submitBtn button" type="submit" disabled={projectId === -1} onClick={() => console.log(projectId)}>Submit</button>
        </div>
    )
}

export default FormButton;