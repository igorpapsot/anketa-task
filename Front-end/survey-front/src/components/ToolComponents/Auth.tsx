import { useContext } from "react";
import { createContext } from "react";
import jwt_decode from "jwt-decode";

// Define the context
interface AuthContextType {
    //logged: boolean;
    login: (jwt: string) => void;
    logout: () => void;
    getLogged: () => boolean;
    getUser: () => Jwt | null;
}

export const NOT_AUTHORIZED = "You are not authorized to view this page"

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: JSX.Element }) {
    const logout = () => {
        localStorage.removeItem("jwt");
    };

    const getLogged = () => {
        console.log("1")
        if (localStorage.getItem("jwt")) {
            console.log("2")
            return true;
        } else {
            console.log("3")
            return false;
        }
    };

    const getUser = () => {
        const jwt = localStorage.getItem("jwt");

        if (typeof jwt === "string") {
            const decoded = jwt_decode(jwt);
            return decoded as Jwt;
        }
        return null;
    };

    const login = (jwt: string) => {
        if (jwt) {
            localStorage.setItem("jwt", jwt)
        }
    }

    return (
        <AuthContext.Provider value={{ getLogged, getUser, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};