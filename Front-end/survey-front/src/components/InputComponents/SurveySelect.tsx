import { NOT_AUTHORIZED, useAuth } from "../ToolComponents/Auth"
import ErrorPage from "../ToolComponents/ErrorPage"
import FormSelect from "../ToolComponents/FormSelect"

const SurveySelect = () => {
    const auth = useAuth()

    if (!auth.getLogged()) {
        return (
            <ErrorPage errorMessageProp={NOT_AUTHORIZED} />
        )
    }

    return (
        <div className="dropDownPage">
            <h1>Survey for evaluating clients</h1>
            <FormSelect stats={false}></FormSelect>
        </div>
    )
}

export default SurveySelect