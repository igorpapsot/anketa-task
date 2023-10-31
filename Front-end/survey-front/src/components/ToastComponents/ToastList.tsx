import { ToastType } from "../Contexts/ToastContext"
import Toast from "./Toast"
import '../../css/toast.scss'

const ToastList = ({ toasts }: { toasts: ToastType[] }) => {

    if (toasts) {
        return (
            <div className="toastList">
                {toasts.map((t: ToastType, i) => <Toast text={t.text} type={t.type} key={i} />)}
            </div>
        )
    }

    else return <></>

}

export default ToastList