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
import ManageTickets from "./Pages/Admin/ManageTickets/Main";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layouts />}>
          {/* Qanh làm home */}
          <Route path="/" element={<HomePage />} />
          {/* Qanh làm search*/}
          <Route path="search" element={<Search />} />
          {/* xong */}
          <Route path="SignIn" element={<SignInSide />} />
          {/* xong */}
          <Route path="SignUp" element={<SignUp />} />
        </Route>
        <Route path="/user" element={<LayoutsUser />}>
          <Route path="search" element={<Search />} />
          <Route
            path="booking/:flightId/:from/:to/:departureTime/:bookingDate"
            element={<Booking />}
          />
          {/* xong */}
          <Route path="dashboard" element={<BookingList />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          {/* xong */}
          <Route path="flight" element={<AddFlight />} />
        {/* xong */}
          <Route path="plane" element={<AddPlane />} />
          {/* xong */}
          <Route path="promotion" element={<PostPromotions />} />
          <Route path="ticket" element={<ManageTickets />} />
        </Route>
      </Routes>
    </>
  );
}
