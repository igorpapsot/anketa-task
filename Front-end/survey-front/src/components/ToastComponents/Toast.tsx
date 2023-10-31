import ToastType from "./ToastTypeE";
import '../../css/toast.scss'

const Toast = ({ text, type }: { text: string, type: ToastType }) => {

    return (
        <>
            <div className={type}>
                <div className="bar" />
                <p>{text}</p>
            </div>
        </>

    )
}

export default Toast;