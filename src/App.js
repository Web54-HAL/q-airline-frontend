import SignUp from "./Pages/SignUp_Page/Main";
import Layouts from "./Layouts/General/Main";
import SignInSide from "./Pages/SignIn_Page/Main";
import { Route, Routes } from "react-router-dom";
import Booking from "./Pages/Booking/Main";
import LayoutsUser from "./Layouts/RegistedUser/Main";
import BookingList from "./Pages/ViewBooking/Main";
import Search from "./Pages/Search_Page/search";
import HomePage from "./Pages/Home_Page/Main";
import LayoutAdmin from "./Layouts/Admin/Main";
import AddFlight from "./Pages/Admin/AddFlight/Main";
import AddPlane from "./Pages/Admin/AddPlane/Main";
import PostPromotions from "./Pages/Admin/PostPromotions/Main";
import FlightTable from "./Pages/Search_Page/flight";
import ManageTickets from "./Pages/Admin/ManageTickets/Main";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route path="/" element={<HomePage />} />
          <Route path="search" element={<Search />} />
          <Route path="SignIn" element={<SignInSide />} />
          <Route path="SignUp" element={<SignUp />} />
          {/* <Route path="flight" element={<FlightTable />} /> */}
      
        </Route>
        <Route path="/user" element={<LayoutsUser />}>
          <Route path="/user" element={<HomePage />} />
          <Route path="/user/search" element={<Search />} />
          <Route
            path="booking/:flightId/:from/:to/:departureTime/:bookingDate"
            element={<Booking />}
          />
          <Route path="/user/bookinglist" element={<BookingList />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="/admin" element={<HomePage />} />
          <Route path="flight" element={<AddFlight />} />
          <Route path="plane" element={<AddPlane />} />
          <Route path="promotion" element={<PostPromotions />} />
          <Route path="ticket" element={<ManageTickets/>} />
        </Route>

      </Routes>
    </>
  );
}
