import axios from "axios";
import { projectUrl } from "../../global/env";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const ProjectDropDown = ({ selectedClient }: { selectedClient: number | undefined }) => {

    const [projects, setProjects] = useState<Project[]>()
    const navigate = useNavigate()
    //const dispatch = useDispatch()
    //const projectId = useSelector((state: RootState) => state.project.projectId)
    const [projectId,] = useState<number>(-1)

    const getProjects = async () => {
        if (selectedClient) {
            console.log("Getting projects...")
            const res = await axios.get(projectUrl + selectedClient);
            if (res && res.status == 200) {
                setProjects(res.data)
            }
        }
    };

    useEffect(() => {
        getProjects()
    }, [selectedClient])

    const selectHandler = (e: string) => {
        //dispatch(projectActions.setProjectId(e))
        navigate("survey/" + e)
    }

    const label = <label>Project:</label>

    if (!selectedClient || !projects) {
        return (
            <>
                {label}
                <select className="dropdown button">
                    <option>No project found</option>
                </select>
            </>
        )
    }

    return (
        <>
            {label}
            <select className="dropdown button" value={projectId} onChange={(e) => { selectHandler(e.target.value) }}>
                {projectId === -1 || selectedClient == -1 ? <option value={-1} hidden>Select project</option> : <option value={-1}>Select project</option>}
                {selectedClient === -1 && <option value={-1} disabled>Please select client first</option>}
                {projects.map((p: Project) => {
                    return <option value={p.id} key={p.id}>{p.name}</option>
                })}
            </select>
        </>
    )
}

export default memo(ProjectDropDown);