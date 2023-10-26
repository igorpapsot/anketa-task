import axios from "axios";
import { projectUrl } from "../../global/env";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const ProjectDropDown = ({ selectedClient, stats, setProjectId }: {
    selectedClient: number | undefined; stats: boolean | undefined; setProjectId: any
}) => {

    const [projects, setProjects] = useState<Project[]>()
    const navigate = useNavigate()

    const getProjects = async () => {
        if (selectedClient) {
            console.log("Getting projects...")
            let res = await axios.get(projectUrl + selectedClient);

            if (res && res.status == 200) {
                setProjects(res.data)
            }
        }
    };

    useEffect(() => {
        if (selectedClient === -1) {
            return;
        }

        getProjects()
    }, [selectedClient])

    const selectHandler = (e: string) => {
        if (!stats) {
            navigate("/survey/" + e)
            return
        }
        setProjectId(e)

    }

    if (!projects && !selectedClient) {
        return (
            <>
                <label>Projects:</label>
                <select className="dropdown button">
                    <option hidden>No project found</option>
                </select>
            </>
        )
    }

    return (
        <>
            <label>Projects:</label>
            <select className="dropdown button" onChange={(e) => { selectHandler(e.target.value) }}>
                <option hidden>Select project</option>
                {selectedClient === -1 ? <option value={-1} disabled>Please select client first</option> : <></>}
                {projects?.map((p: Project) => {
                    return <option value={p.id} key={p.id}>{p.name}</option>
                })}
            </select>
        </>
    )
}

export default memo(ProjectDropDown);