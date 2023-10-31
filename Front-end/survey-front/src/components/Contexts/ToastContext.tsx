import { createContext, useContext, useState } from "react";
import ToastTypeE from "../ToastComponents/ToastTypeE";
import ToastList from "../ToastComponents/ToastList";

interface ToastContextType {
    dispatch: any;
}

export interface ToastType {
    text: string
    type: ToastTypeE
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export default function ToastProvider({ children }: { children: JSX.Element }) {

    const [toasts, setToasts] = useState<ToastType[]>([])

    const dispatch = (text: string, type: ToastTypeE) => {
        setToasts((prev) => [...prev, { text, type }])

        setTimeout(() => {
            setToasts((prev) => prev.slice(1))
        }, 5000)
    }

    return (
        <ToastContext.Provider value={{ dispatch }}>
            <ToastList toasts={toasts} />
            {children}
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within an ToastProvider");
    }
    return context;
};
