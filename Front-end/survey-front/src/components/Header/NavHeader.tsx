import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import '../../css/navHeader.scss'
import { useState } from "react";

const STATS = "stats"
const VERSIONS = 'versions'
const SURVEY = "survey"
const LOGIN = "login"
const REGISTER = "register"

const NavHeader = () => {
    const [selected, setSelected] = useState<string>("")

    const auth = useAuth()
    const navigate = useNavigate()


    const logoutHandler = () => {
        auth.logout()
        navigate("/")
    }

    return (
        <div className="navHeader">
            {auth.getUser()?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Admin" &&
                <>
                    <Link to={"stats"} className={selected === STATS ? "navLinkSelected" : "navLink"}
                        onClick={() => setSelected(STATS)}>Statistics</Link>

                    <Link to={"weight-versions"} className={selected === VERSIONS ? "navLinkSelected" : "navLink"}
                        onClick={() => setSelected(VERSIONS)}>Weight versions</Link>
                </>
            }
            {auth.getLogged() ?
                <>
                    <Link to={"survey"} className={selected === SURVEY ? "navLinkSelected" : "navLink"}
                        onClick={() => setSelected(SURVEY)}>Survey</Link>

                    <a className="navLink navLinkLeft" onClick={() => logoutHandler()}>Log out</a>
                </>
                :
                <>
                    <Link to={"login"} className={selected === LOGIN ? "navLinkSelected" : "navLink"}
                        onClick={() => setSelected(LOGIN)}>Login</Link>

                    <Link to={"register"} className={selected === REGISTER ? "navLinkSelected" : "navLink"}
                        onClick={() => setSelected(REGISTER)}>Register</Link>
                </>}
        </div>
    )
}

export default NavHeader;