import { NOT_AUTHORIZED, useAuth } from "../ToolComponents/AuthContext"
import ErrorPage from "../ToolComponents/ErrorPage"
import SurveySelect from "../ToolComponents/SurveySelect"

const SurveyPage = () => {
    const auth = useAuth()

    if (!auth.getLogged()) {
        return (
            <ErrorPage errorMessageProp={NOT_AUTHORIZED} />
        )
    }

    return (
        <div className="surveySelect">
            <h1>Survey for evaluating clients</h1>
            <SurveySelect stats={false}></SurveySelect>
        </div>
    )
}

export default SurveyPage