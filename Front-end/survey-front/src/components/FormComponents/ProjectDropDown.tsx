import axios from "axios";
import { projectUrl } from "../../global/env";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectActions } from "../../redux/project";
import { RootState } from "./FormButton";

const ProjectDropDown = ({ selectedClient }: { selectedClient: number | undefined }) => {

    const [projects, setProjects] = useState<Project[]>()
    const dispatch = useDispatch()
    const projectId = useSelector((state: RootState) => state.project.projectId)

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
        dispatch(projectActions.setProjectId(e))
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
                {projectId === -1 && <option value={-1} hidden>Select project</option>}
                {projects.map((p: Project) => {
                    return <option value={p.id} key={p.id}>{p.name}</option>
                })}
            </select>
        </>
    )
}

export default ProjectDropDown;