import InputField from "../InputComponents/InputField";
import FormButton from "./FormButton";
import FormHeader from "./FormHeader";

const Form = () => {

    const Inputs = ["Question 1", "Question 2", "Question 3"]

    return (
        <div className="form">
            <FormHeader />
            {Inputs
                .map((input: string) => (
                    <InputField input={input} key={input}></InputField>
                ))}
            <FormButton />
        </div>
    )
}

export default Form;