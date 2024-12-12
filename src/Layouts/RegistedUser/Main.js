import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/GeneralNavBar"

function LayoutsUser () {
    return (
    <>
        <NavBar/>
        <Outlet/>
    </>
    )
}
export default LayoutsUser;
