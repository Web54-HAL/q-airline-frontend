import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/UserNavbar";
import Footer from "../Footer/Main";
function LayoutsUser () {
    return (
    <>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </>
    )
}
export default LayoutsUser;
