import './index.css';
import { BrowserRouter as Router, NavLink } from "react-router-dom";

function Header() {

    return (
        <header>
            <nav>
                <NavLink to="/">
                    <p>Home</p>
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;