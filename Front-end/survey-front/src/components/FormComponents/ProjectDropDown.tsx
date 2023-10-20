import axios from "axios";
import { projectUrl } from "../../global/env";
import { useEffect, useState } from "react";

const ProjectDropDown = ({ selectedClient }: { selectedClient: number | undefined }) => {

    const [projects, setProjects] = useState<Project[]>()
    const [selectedProjectId, setSelectedProjectId] = useState<number>()

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
        setSelectedProjectId(Number(e))
    }

    const label = <label>Project:</label>

    if (!selectedClient || !projects) {
        return (
            <>
                {label}
                <select className="clientDropdown button">
                    <option>No project found</option>
                </select>
            </>
        )
    }

    return (
        <>
            {label}
            <select className="clientDropdown button" onChange={(e) => { selectHandler(e.target.value) }}>
                {projects.map((p: Project) => {
                    return <option value={p.id} key={p.id}>{p.name}</option>
                })}
            </select>
        </>
    )
}

export default ProjectDropDown;