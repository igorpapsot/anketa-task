import { useEffect, useState } from "react"
import FormSelect from "../ToolComponents/FormSelect"
import axios from "axios"
import { submissionUrl } from "../../global/env"

const Stats = () => {
    const [projectId, setProjectId] = useState<number>(3)
    const [submissions, setSubmissions] = useState<Submission[]>([])

    const getSubmissions = async () => {
        console.log("Getting projects...")
        let res = await axios.get(submissionUrl + projectId);

        if (res && res.status == 200) {
            setSubmissions(res.data)
        }
    };

    useEffect(() => {
        if (projectId === -1) {
            return;
        }

        getSubmissions()
    }, [projectId])

    return (
        <div className="dropDownPage">
            {projectId}
            <FormSelect stats={true} setSelectedProjectId={setProjectId} />
            <button className="button statsButton">Show stats</button>
            <ul>
                {submissions.map((s: Submission) => {
                    return <li>{s.projectId} {s.answeredQuestions.toString()}</li>
                })}
            </ul>
        </div>

    )
}

export default Stats