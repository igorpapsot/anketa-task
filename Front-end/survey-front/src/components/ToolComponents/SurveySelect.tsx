import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { clientUrl, projectUrl } from "../../global/env";
import { useAuth } from "../Contexts/AuthContext";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";
import '../../css/surveySelect.scss'

const SurveySelect = ({ setSelectedProjectId, stats }: { setSelectedProjectId?: any; stats: boolean }) => {

    const [projects, setProjects] = useState<Project[]>()
    const [selectedClientId, setSelectedClientId] = useState<number>(-1)

    const navigate = useNavigate()
    const auth = useAuth()

    const getClients = async () => {
        console.log("Getting clients...")
        const res = await axios.get(clientUrl, {
            headers: {
                Authorization: `Bearer ${auth.getToken()}`
            }
        });
        if (res && res.status == 200) {
            return res
        }
    };

    const getProjects = async () => {
        if (selectedClientId != -1) {
            console.log("Getting projects...")
            let res = await axios.get(projectUrl + selectedClientId, {
                headers: {
                    Authorization: `Bearer ${auth.getToken()}`
                }
            });

            if (res && res.status == 200) {
                setProjects(res.data)
            }
        }
    };

    const { data: clients } = useQuery({
        queryKey: ['getClients'],
        queryFn: getClients,
    });


    useEffect(() => {
        if (selectedClientId === -1) {
            return;
        }

        getProjects()
    }, [selectedClientId])

    const selectHandler = (e: string) => {
        if (!stats) {
            navigate("/survey/" + e)
            return
        }
        setSelectedProjectId(e)

    }

    return (
        <>
            <Dropdown values={clients?.data.map((c: Client) => { return { id: c.id, value: c.name } })}
                selectedValue={selectedClientId} setSelected={setSelectedClientId} label="Client" />
            <Dropdown values={projects?.map((p: Project) => { return { id: p.id, value: p.name } })}
                selectedValue={-1} setSelected={selectHandler} label="Project" />
        </>
    )
}

export default SurveySelect;