import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/UserNavbar";

function LayoutsUser () {
    return (
    <>
        <NavBar/>
        <Outlet/>
    </>
    )
}
export default LayoutsUser;
