import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../ToolComponents/AuthContext";
import '../../css/navHeader.scss'

const NavHeader = () => {
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
                    <Link to={"stats"} className="navLink">Statistics</Link>
                    <Link to={"weight-versions"} className="navLink">Weight versions</Link>
                </>
            }
            {auth.getLogged() ?
                <>
                    <Link to={"survey"} className="navLink navLinkLeft">Survey</Link>
                    <a className="navLink" onClick={() => logoutHandler()}>Log out</a>
                </>
                :
                <>
                    <Link to={"login"} className="navLink">Login</Link>
                    <Link to={"register"} className="navLink">Register</Link>
                </>}
        </div>
    )
}

export default NavHeader;