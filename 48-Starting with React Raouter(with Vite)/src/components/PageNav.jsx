import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
function PageNav() {
  return <nav className={styles.nav}>
    <ul>
        <li>
            <NavLink to="/"> Home </NavLink>
            <NavLink to="/product"> Product </NavLink>
            <NavLink to="/pricing"> Pricing </NavLink>
            <NavLink to ="*"> PageNotFound </NavLink>
        </li>
    </ul>
  </nav>;
}
export default PageNav;
//? 3 now we need to create a nav bar to navigate between the pages
// ? 4 NavLink is a component from the react-router-dom library used for navigation in a React application. It is similar to the Link component but provides additional styling capabilities for the active link.
