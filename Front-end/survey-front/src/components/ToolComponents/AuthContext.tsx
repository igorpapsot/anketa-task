import { useContext } from "react";
import { createContext } from "react";
import jwt_decode from "jwt-decode";

interface AuthContextType {
    login: (jwt: string) => void;
    logout: () => void;
    getLogged: () => boolean;
    getUser: () => Jwt | null;
    getToken: () => string
}

export const NOT_AUTHORIZED = "You are not authorized to view this page"

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: JSX.Element }) {
    const logout = () => {
        localStorage.removeItem("jwt");
    };

    const getLogged = () => {
        if (localStorage.getItem("jwt")) {
            return true;
        } else {
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

    const getToken = () => {
        const jwt = localStorage.getItem("jwt")
        if (jwt) {
            return jwt
        }

        return ""
    }

    return (
        <AuthContext.Provider value={{ getLogged, getUser, logout, login, getToken }}>
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