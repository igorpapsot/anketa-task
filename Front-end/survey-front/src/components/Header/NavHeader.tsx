import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../ToolComponents/Auth";

const NavHeader = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const logoutHandler = () => {
        auth.logout()
        navigate("/")
    }

    return (
        <div className="navHeader">
            {auth.getLogged() ?
                <>
                    <Link to={"/survey"} className="navLink">Survey</Link>
                    <Link to={"stats"} className="navLink navLinkLeft">Statistics</Link>
                    <a className="navLink" onClick={() => logoutHandler()}>Log out</a>
                </>
                :
                <>
                    <Link to={"/login"} className="navLink">Login</Link>
                    <Link to={"register"} className="navLink">Register</Link>
                </>}




        </div>
    )
}

export default NavHeader;