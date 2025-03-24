import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import Styles from "./AppLayout.module.css";
function AppLayout() {
  return <div className={Styles.app}>
    <Sidebar/>
    <Map />
    <User/> 
  </div>;
}
export default AppLayout;
