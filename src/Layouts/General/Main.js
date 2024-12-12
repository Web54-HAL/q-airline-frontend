import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/GeneralNavBar";
import Footer from "../Footer/Main";
function Layouts () {
    return (
    <>
    <div>
        
        <NavBar/>
        <main>
        <Outlet/>
        </main>
        <footer>
        <Footer/>
        </footer>
    </div>
    
   
    </>
    )
}
export default Layouts;
