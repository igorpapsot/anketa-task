import { useState } from "react"
import FormSelect from "../ToolComponents/FormSelect"
import axios from "axios"
import { gradesUrl, weightVersionUrl } from "../../global/env"
import { useAuth, NOT_AUTHORIZED } from "../ToolComponents/Auth"
import ErrorPage from "../ToolComponents/ErrorPage"
import WeightVersionSelect from "./WeightVersionSelect"
import { useQuery } from "@tanstack/react-query"

const Stats = () => {
    const [projectId, setProjectId] = useState<number>(-1)
    const [grades, setGrades] = useState<Grade[]>([])
    const [selectedVersion, setSelectedVersion] = useState<number>(-1)
    const [btnClicked, setBtnClicked] = useState<boolean>(false)

    const auth = useAuth()

    if (!auth.getLogged() || auth.getUser()?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] !== "Admin") {
        return (
            <ErrorPage errorMessageProp={NOT_AUTHORIZED} />
        )
    }

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

    const getAverageGrade = (original: boolean) => {
        let avg = 0
        grades.forEach(grade => {
            if (original) {
                avg = avg + grade.originalScore
                return
            }
            avg = avg + grade.value
        });
        avg = avg / grades.length
        return avg.toFixed(2)
    }

    return (
        <div className="statsPage">
            <FormSelect stats={true} setSelectedProjectId={setProjectId} />
            <WeightVersionSelect version={selectedVersion} versions={versions?.data} setVersion={setSelectedVersion} />
            <button className="button statsButton" onClick={() => showStatsHandler()}>Show stats</button>
            {/* If project is selected, there is no submissions and button for stats is clicked*/}
            {projectId !== -1 && grades.length === 0 && btnClicked ? <p>No submissions for this project found</p> : <></>}

            {/* If project is selected, there are submissions and button for stats is clicked*/}
            {projectId !== -1 && grades.length !== 0 && btnClicked ? (
                <table className="gradeTable">
                    <thead>
                        <tr>
                            <th>Submission</th>
                            <th>Original grade</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map((g: Grade) => (
                            <tr key={g.submissionId}>
                                <td>{g.submissionId}</td>
                                <td>{g.originalScore}</td>
                                <td>{g.value}</td>
                            </tr>
                        ))}
                        <tr>
                            <td className="average-row">Average</td>
                            <td className="average-row">{getAverageGrade(true)}</td>
                            <td className="average-row">{getAverageGrade(false)}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <></>
            )}

        </div>

    )
}

export default Stats