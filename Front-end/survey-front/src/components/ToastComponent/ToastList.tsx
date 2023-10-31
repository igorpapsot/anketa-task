import { ToastType } from "../Contexts/ToastContext"
import Toast from "./Toast"
import '../../css/toast.scss'

const ToastList = ({ toasts }: { toasts: ToastType[] }) => {

    if (toasts) {
        console.log("rendering toasts...")
        return (
            <div className="toastList">
                {toasts.map((t: ToastType, i) => <Toast text={t.text} type={t.type} key={i} />)}
            </div>
        )
    }

}

export default ToastList