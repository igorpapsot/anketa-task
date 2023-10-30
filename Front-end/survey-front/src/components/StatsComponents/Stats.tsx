import { useState } from "react"
import FormSelect from "../ToolComponents/FormSelect"
import axios from "axios"
import { gradesUrl, weightVersionUrl } from "../../global/env"
import { useAuth, NOT_AUTHORIZED } from "../ToolComponents/Auth"
import ErrorPage from "../ToolComponents/ErrorPage"
import WeightVersionSelect from "./WeightVersionSelect"
import { useQuery } from "@tanstack/react-query"
import StatsTable from "./StatsTable"

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

    const getWeightVersions = async () => {
        console.log("Getting weight versions...")
        let res = await axios.get(weightVersionUrl, {
            headers: {
                Authorization: `Bearer ${auth.getToken()}`
            }
        });
        console.log(res)
        if (res && res.status == 200) {
            return res
        }
    }

    const { data: versions } = useQuery({
        queryKey: ['getWeightVersions'],
        queryFn: getWeightVersions,
    });

    const getGrades = async () => {
        console.log("Getting submission grades...")
        let res = await axios.get(gradesUrl + projectId + "/Version/" + selectedVersion, {
            headers: {
                Authorization: `Bearer ${auth.getToken()}`
            }
        });
        console.log(res)
        if (res && res.status == 200) {
            setGrades(res.data)
        }
        setBtnClicked(true)
    };

    const showStatsHandler = () => {
        getGrades()
    }

    return (
        <div className="weightVersions">
            <FormSelect stats={true} setSelectedProjectId={setProjectId} />
            <WeightVersionSelect version={selectedVersion} versions={versions?.data} setVersion={setSelectedVersion} />
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