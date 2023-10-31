import { createContext, useContext, useState } from "react";
import ToastTypeE from "../ToastComponents/ToastTypeE";
import ToastList from "../ToastComponents/ToastList";
import { v4 as uuidv4 } from 'uuid';

export interface ToastType {
    id?: string,
    text: string,
    type: ToastTypeE,
    duration: number
}

interface ToastContextType {
    dispatch: (text: string, type: ToastTypeE, duration: number) => void;
    closeToast: (toastId: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export default function ToastProvider({ children }: { children: JSX.Element }) {

    const [toasts, setToasts] = useState<ToastType[]>([])

    const dispatch = (text: string, type: ToastTypeE, duration: number) => {
        const id = uuidv4();
        setToasts((prev) => [...prev, { id, text, type, duration }])

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, duration)
    }

    const closeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }

    return (
        <ToastContext.Provider value={{ dispatch, closeToast }}>
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
