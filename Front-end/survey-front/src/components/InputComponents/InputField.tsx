import InputChoice from "./InputChoice";
import InputQuestion from "./InputQuestion";

const InputField = ({ input }: { input: string }) => {

    return (
        <div className="inputField">
            <InputQuestion question={input} />
            <InputChoice />
            <InputChoice />
            <InputChoice />
        </div>
    )
}

export default InputField;