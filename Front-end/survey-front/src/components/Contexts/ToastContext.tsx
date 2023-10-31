import { createContext, useContext, useState } from "react";
import ToastTypeE from "../ToastComponent/ToastTypeE";
import ToastList from "../ToastComponent/ToastList";

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
        console.log("dispatch")
        setToasts((prev) => [...prev, { text, type }])
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
        throw new Error("useToast must be used within an AuthProvider");
    }
    return context;
};
