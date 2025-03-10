import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import Styles from "./AppLayout.module.css";
function AppLayout() {
  return <div className={Styles.app}>
    <Sidebar/>
    <Map /> 
  </div>;
}
export default AppLayout;
