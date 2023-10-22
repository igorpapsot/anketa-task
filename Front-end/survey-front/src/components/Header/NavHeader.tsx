import { Link } from "react-router-dom";

const NavHeader = () => {
    return (
        <div className="navHeader">
            <Link to={"/"} className="navLink">Home</Link>
            <Link to={"register"} className="navLink navLinkAuth">Register</Link>
            <Link to={"login"} className="navLink navLinkAuth">Login</Link>
        </div>
    )
}

export default NavHeader;