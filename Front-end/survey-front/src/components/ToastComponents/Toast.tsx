import ToastType from "./ToastTypeE";
import '../../css/toast.scss'
import { useToast } from "../Contexts/ToastContext";

const Toast = ({ text, type, id }: { text: string, type: ToastType, id: string | undefined }) => {

    const toastContext = useToast()

    const clickHandler = () => {
        if (!id) {
            return
        }
        toastContext.closeToast(id)
    }

    return (
        <>
            <div className={type} onClick={() => clickHandler()}>
                <div className="bar" />
                <p>{text}</p>
            </div>
        </>

    )
}

export default Toast;