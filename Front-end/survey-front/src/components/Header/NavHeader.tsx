import { Link } from "react-router-dom";

const NavHeader = () => {
    return (
        <div className="navHeader">
            <Link to={"/"} className="navLink navLinkHome">Home</Link>
            <Link to={"register"} className="navLink">Register</Link>
            <Link to={"login"} className="navLink">Login</Link>
        </div>
    )
}

export default NavHeader;