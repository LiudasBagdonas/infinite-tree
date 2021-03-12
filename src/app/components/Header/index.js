import './index.css';
import { BrowserRouter as Router, NavLink } from "react-router-dom";

function Header() {

    return (
        <header>
            <nav>
                <NavLink to="/">
                    <p>Type 1</p>
                </NavLink>
                <NavLink to="/type2">
                    <p>Type 2</p>
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;