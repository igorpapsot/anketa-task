import FormSelect from "../ToolComponents/FormSelect"

const SurveySelect = () => {
    return (
        <div className="dropDownPage">
            <h1>Survey for evaluating clients</h1>
            <FormSelect stats={false}></FormSelect>
        </div>
    )
}

export default SurveySelect