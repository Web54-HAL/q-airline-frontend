import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
}));

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    image: "",
    name: "",
    updated_at: "",
    markdown: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Trạng thái Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Thông báo hiển thị
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Mức độ thông báo (success, error, etc.)

  // Fetch data from the local JSON file
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async () => {
    if (!newProduct.image || !newProduct.name) {
      setSnackbarMessage("Vui lòng điền đầy đủ thông tin.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true); // Hiển thị Snackbar
    } else {
      try {
        const response = await axios.post("http://localhost:5000/admin", {
          ...newProduct,
          created_at: new Date().toISOString(),
          updated_at: newProduct.updated_at || new Date().toISOString(),
        });
  
        setProducts((prev) => [...prev, response.data]);
  
        setNewProduct({ image: "", name: "", updated_at: "", markdown: "" });
        setOpenDialog(false);
  
        setSnackbarMessage("Sản phẩm đã được thêm thành công!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true); // Hiển thị Snackbar
      } catch (error) {
        console.error("Error adding product:", error);
        setSnackbarMessage("Đã xảy ra lỗi khi thêm sản phẩm. Vui lòng thử lại.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true); // Hiển thị Snackbar
      }
    }
  };
  

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false); // Đóng Snackbar
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" sx={{ marginBottom: 2, textAlign: "center" }}>
        Promotion List
      </Typography>
      <Button
        variant="contained"
        sx={{ marginBottom: 2, float: "right" }}
        onClick={() => setOpenDialog(true)}
      >
        Thêm sản phẩm
      </Button>
      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Ảnh</StyledTableCell>
              <StyledTableCell>Tên sản phẩm</StyledTableCell>
              <StyledTableCell>Ngày cập nhật</StyledTableCell>
              <StyledTableCell>Ngày tạo</StyledTableCell>
              <StyledTableCell>Markdown</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img src={product.image} alt={product.name} width="80" />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.updated_at}</TableCell>
                <TableCell>{product.created_at}</TableCell>
                <TableCell>{product.markdown || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Thêm sản phẩm</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              label="Đường dẫn ảnh"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              fullWidth
              placeholder="Nhập đường dẫn ảnh"
              required
            />
            <TextField
              label="Tên sản phẩm"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              fullWidth
              placeholder="Nhập tên sản phẩm"
              required
            />
            <TextField
              label="Ngày cập nhật"
              name="updated_at"
              value={newProduct.updated_at}
              onChange={handleInputChange}
              fullWidth
              placeholder="Tự động thêm nếu không nhập (dd/mm/yyyy hh:mm)"
            />
            <TextField
              label="Markdown"
              name="markdown"
              value={newProduct.markdown}
              onChange={handleInputChange}
              fullWidth
              placeholder="Nội dung Markdown (tùy chọn)"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleAddProduct}>
            Lưu sản phẩm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
