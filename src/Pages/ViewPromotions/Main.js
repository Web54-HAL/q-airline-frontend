import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";

function App() {
  const [myState, setMyState] = useState([]); // To store data from API
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const itemsPerPage = 9; // Number of items per page

  // Fetch data using Axios
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/promotions");
        setMyState(response.data); // Save fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedItems = myState.slice(indexOfFirstItem, indexOfLastItem);

  // Handle pagination change
  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 100, behavior: "smooth" }); // Scroll to top
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Danh Sách Khuyến Mãi</h1>

      {/* Render Paginated Items */}
      <div>
        {paginatedItems.map((item) => (
          <h1 key={item.promotion_id}>{item.title}</h1>
        ))}
      </div>

      {/* Pagination Component */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
        {myState.length > 0 && (
          <Pagination
            variant="outlined"
            color="primary"
            count={Math.ceil(myState.length / itemsPerPage)} // Calculate total pages
            page={currentPage}
            onChange={paginate}
          />
        )}
      </div>
    </div>
  );
}

export default App;
