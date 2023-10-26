import { useState } from "react"
import FormSelect from "../ToolComponents/FormSelect"
import axios from "axios"
import { gradesUrl } from "../../global/env"
import { useAuth, NOT_AUTHORIZED } from "../ToolComponents/Auth"
import ErrorPage from "../ToolComponents/ErrorPage"

const Stats = () => {
    const [projectId, setProjectId] = useState<number>(-1)
    const [grades, setGrades] = useState<Grade[]>([])
    const [btnClicked, setBtnClicked] = useState<boolean>(false)

    const auth = useAuth()

    if (!auth.getLogged()) {
        return (
            <ErrorPage errorMessageProp={NOT_AUTHORIZED} />
        )
    }

    const getGrades = async () => {
        console.log("Getting submission grades...")
        let res = await axios.get(gradesUrl + projectId);
        console.log(res)
        if (res && res.status == 200) {
            setGrades(res.data)
        }
        setBtnClicked(true)
    };

    const showStatsHandler = () => {
        getGrades()
    }

    const getAverageGrade = () => {
        let avg = 0
        grades.forEach(grade => {
            avg = avg + grade.value
        });
        avg = avg / grades.length
        return avg.toFixed(2)
    }

    const getAverageOriginalGrade = () => {
        let avg = 0
        grades.forEach(grade => {
            avg = avg + grade.originalScore
        });
        avg = avg / grades.length
        return avg.toFixed(2)
    }

    return (
        <div className="statsPage">
            <FormSelect stats={true} setSelectedProjectId={setProjectId} />
            <button className="button statsButton" onClick={() => showStatsHandler()}>Show stats</button>
            {/* If project is selected, there is no submissions and button for stats is clicked*/}
            {projectId !== -1 && grades.length === 0 && btnClicked ? <p>No submissions for this project found</p> : <></>}

            {/* If project is selected, there are submissions and button for stats is clicked*/}
            {projectId !== -1 && grades.length !== 0 && btnClicked ? (
                <table className="gradeTable">
                    <thead>
                        <tr>
                            <th>Weight version</th>
                            <th>Original grade</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map((g: Grade) => (
                            <tr key={g.submissionId}>
                                <td>{g.weightVersion}</td>
                                <td>{g.originalScore}</td>
                                <td>{g.value}</td>
                            </tr>
                        ))}
                        <tr>
                            <td className="average-row">Average</td>
                            <td className="average-row">{getAverageOriginalGrade()}</td>
                            <td className="average-row">{getAverageGrade()}</td>
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