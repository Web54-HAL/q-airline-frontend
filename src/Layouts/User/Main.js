import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/Main"

function LayoutsUser () {
    return (
    <>
    
        <NavBar/>
        <Outlet/>
    
   
    </>
    )
}
export default LayoutsUser;
