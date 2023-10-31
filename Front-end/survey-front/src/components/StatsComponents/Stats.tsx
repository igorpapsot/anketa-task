import { useState } from "react"
import SurveySelect from "../ToolComponents/SurveySelect"
import axios from "axios"
import { gradesUrl, weightVersionUrl } from "../../global/env"
import { useAuth, NOT_AUTHORIZED } from "../ToolComponents/AuthContext"
import ErrorPage from "../ToolComponents/ErrorPage"
import { useQuery } from "@tanstack/react-query"
import StatsTable from "./StatsTable"
import Dropdown from "../ToolComponents/Dropdown"
import '../../css/stats.scss'

const getWeightVersions = async (token: string) => {
    console.log("Getting weight versions...")
    let res = await axios.get(weightVersionUrl, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(res)
    if (res && res.status == 200) {
        return res
    }
}

const getGrades = async (projectId: number, selectedVersion: number, token: string) => {
    console.log("Getting submission grades...")
    let res = await axios.get(gradesUrl + projectId + "/Version/" + selectedVersion, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res
}

const Stats = () => {

    const auth = useAuth()

    if (!auth.getLogged() || auth.getUser()?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] !== "Admin") {
        return (
            <ErrorPage errorMessageProp={NOT_AUTHORIZED} />
        )
    }

    const [projectId, setProjectId] = useState<number>(-1)
    const [grades, setGrades] = useState<Grade[]>([])
    const [selectedVersion, setSelectedVersion] = useState<number>(-1)
    const [btnClicked, setBtnClicked] = useState<boolean>(false)

    const { data: versions } = useQuery({
        queryKey: ['getWeightVersions'],
        queryFn: () => getWeightVersions(auth.getToken()),
    });

    const showStatsHandler = async () => {
        const res = await getGrades(projectId, selectedVersion, auth.getToken())
        console.log(res)
        if (res && res.status == 200) {
            setGrades(res.data)
            setBtnClicked(true)
        }
    }

    return (
        <div className="weightVersions">
            <SurveySelect stats={true} setSelectedProjectId={setProjectId} />
            <Dropdown selectedValue={selectedVersion} values={versions?.data.map((v: WeightVersion) => { return { id: v.id, value: v.versionName } })} setSelected={setSelectedVersion} label={"Weight version"} />
            <button className="button" onClick={() => showStatsHandler()}>Show stats</button>

            {/* If project is selected, there is no submissions and button for stats is clicked*/}
            {projectId !== -1 && grades.length === 0 && btnClicked ? <p>No submissions for this project found</p> : <></>}

            {/* If project is selected, there are submissions and button for stats is clicked*/}
            {projectId !== -1 && grades.length !== 0 && btnClicked &&
                <StatsTable grades={grades} />}
        </div>
    )
}

export default Stats