import Home1 from "./Pages/Home_Page/Main";
import NavBar from "./Layouts/NavBar/Main";
import SignUp from "./Pages/SignUp_Page/Main";
import Layouts from "./Layouts/Main";
import SignInSide from "./Pages/SignIn_Page/Main";
import { Route, Routes } from "react-router-dom";
import Booking from "./Pages/Booking/details";
import LayoutsUser from "./Layouts/User/Main";
import BookingList from "./Pages/MyBooking/Main";
import App1 from "./Pages/ViewPromotions/Main";
//import Layouts from "./Layouts/User/Main";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route path="/" element={<Home1 />} />
          <Route path="/SignIn" element={<SignInSide />} />
          <Route path="SignUp" element={<SignUp />} />
        </Route>
        <Route path="/user" element={<LayoutsUser />}>
          <Route path="booking_details" element={<Booking />} />
          <Route path="dashboard" element={<BookingList/>}/>
          <Route path="view" element={<App1/>}/>
        </Route>
        
      </Routes>
        
      
    </>
  );
}
