import { useState, useEffect } from "react";
import axios from "axios";

export const useAddPlaneLogic = () => {
  const [formData, setFormData] = useState({
    manufacturer: "",
    customer_seat_count: "",
  });
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [editData, setEditData] = useState(null); // State cho chế độ chỉnh sửa

  const token = localStorage.getItem("access_token");

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Thêm tàu bay mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return handleError("Authentication required. Please log in.");
    if (!formData.manufacturer || !formData.customer_seat_count)
      return handleError("*All fields are required.");
    if (Number(formData.customer_seat_count) <= 0)
      return handleError("Seat count must be greater than 0.");

    try {
      const response = await axios.post(
        "http://localhost:3000/planes",
        { ...formData, customer_seat_count: Number(formData.customer_seat_count) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPlanes((prevPlanes) => [...prevPlanes, response.data]);
      setFormData({ manufacturer: "", customer_seat_count: "" });
      handleSuccess("Plane added successfully!");
    } catch (error) {
      handleError(error.response?.data?.message || "Failed to add plane.");
    }
  };

  // Fetch danh sách planes
  const fetchPlanes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/planes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlanes(response.data);
      setLoading(false);
    } catch (error) {
      handleError("Failed to load planes data.");
      setLoading(false);
    }
  };

  // Cập nhật thông tin tàu bay
  const updatePlane = async (id, updatedData) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/planes/${id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPlanes((prevPlanes) =>
        prevPlanes.map((plane) => (plane.plane_id === id ? response.data : plane))
      );
      handleSuccess("Plane updated successfully!");
    } catch (error) {
      handleError("Failed to update plane.");
    }
  };

  // Thông báo lỗi hoặc thành công
  const handleError = (message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity("error");
    setOpenSnackbar(true);
  };

  const handleSuccess = (message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  useEffect(() => {
    fetchPlanes();
  }, []);

  return {
    formData,
    planes,
    loading,
    openSnackbar,
    snackbarMessage,
    snackbarSeverity,
    editData,
    setEditData,
    handleChange,
    handleSubmit,
    updatePlane,
    setOpenSnackbar,
  };
};
