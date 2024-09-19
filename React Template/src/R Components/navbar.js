import { navbarData } from "../Data/data";

const Navbar = () => {

    return(
        <div className="nav-wrap">
            <nav id="mainnav" className="mainnav st-2">
                <ul className="menu">
                {navbarData.buttons.map((item, idx) => (
                    <li 
                    className="menu-item"
                    key={idx}>
                        {item.comp}
                    </li>
                ))}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;