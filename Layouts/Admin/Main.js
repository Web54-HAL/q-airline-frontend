import Navbar from "../NavBar/AdminNavBar";
import { Outlet } from "react-router-dom";
function LayoutAdmin () {
    return (
    <>
    <div>
        <Navbar/>
        <main>
        <Outlet/>
        </main>
    </div>
    
   
    </>
    )
}
export default LayoutAdmin;
