import { useSelector } from "react-redux";

export interface RootState {
    project: {
        projectId: number;
    };
}
const FormButton = () => {

    const projectId = useSelector((state: RootState) => state.project.projectId)

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(projectId)
    }

    return (
        <div className="submitBtnArea">
            <button className="submitBtn button" type="submit" disabled={projectId === -1} onClick={(e) => { submitHandler(e) }}>Submit</button>
        </div>
    )
}

export default FormButton;