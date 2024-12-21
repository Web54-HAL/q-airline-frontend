import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import "../../../color.css";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: "#159F91",
  color: "#ffffff",
  textAlign: "center",
}));

const StyledTableRow = styled(TableRow)(({ isOdd }) => ({
  backgroundColor: isOdd ? "#C3FEFC" : "#ffffff",
  "&:hover": {
    backgroundColor: "#e0f7fa",
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  backgroundColor: "#f9f9f9",
  padding: theme.spacing(3),
  borderRadius: "8px",
}));

export default function PostPromotions() {
  const [promotions, setPromotions] = useState([]);
  const [newPromotion, setNewPromotion] = useState({
    promotion_id: "",
    title: "",
    markdown_content: "",
    preview_image_url: "",
    created_at: "",
    start_date: "",
    end_date: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = () => setSnackbarOpen(false);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:3000/promotions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPromotions(response.data);
      } catch (error) {
        console.error("Error fetching promotions:", error);
        setSnackbarMessage("Error fetching data. Please try again later.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };

    fetchPromotions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPromotion((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPromotion = async () => {
    const { title, markdown_content, preview_image_url, start_date, end_date } =
      newPromotion;

    if (
      !title ||
      !markdown_content ||
      !preview_image_url ||
      !start_date ||
      !end_date
    ) {
      setSnackbarMessage("Please fill in all the required information.");

      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    try {
      const newPromotionData = {
        ...newPromotion,
        created_at: new Date().toISOString(), 
      };

      const response = await axios.post(
        "http://localhost:3000/promotions",
        newPromotionData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`, 
          },
        }
      );

      setPromotions((prev) => [...prev, response.data]);
      setNewPromotion({
        promotion_id: "",
        title: "",
        markdown_content: "",
        preview_image_url: "",
        created_at: "",
        start_date: "",
        end_date: "",
      });
      setOpenDialog(false);
      setSnackbarMessage("The promotion has been added successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error adding promotion:", error);
      setSnackbarMessage(
        "An error occurred while adding the promotion. Please try again."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h5"
        sx={{
          marginBottom: 2,
          textAlign: "center",
          color: "var(--primary-color)",
          fontWeight: "bold",
        }}
      >
        Promotion List
      </Typography>
      <Button
        variant="contained"
        sx={{ marginBottom: 2, backgroundColor: "var(--primary-color)", float: "right" }}
        onClick={() => setOpenDialog(true)}
      >
        Add New Promotion
      </Button>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 500,
          overflowY: "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: "30px", textAlign: "center" }}>
                ID
              </StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Markdown Content</StyledTableCell>
              <StyledTableCell>Preview Image</StyledTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>End Date</StyledTableCell>
              <StyledTableCell>Created At</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promotions.map((promotion, index) => (
              <StyledTableRow
                key={promotion.promotion_id}
                isOdd={index % 2 !== 0}
              >
                <TableCell sx={{ width: "30px", textAlign: "center" }}>
                  {promotion.promotion_id}
                </TableCell>
                <TableCell>{promotion.title}</TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "pre-wrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    maxWidth: 300,
                  }}
                >
                  {promotion.markdown_content}
                </TableCell>
                <TableCell>
                  <img
                    src={promotion.preview_image_url}
                    alt={promotion.title}
                    style={{
                      width: "80px",
                      height: "auto",
                      borderRadius: "5px",
                    }}
                  />
                </TableCell>
                <TableCell>{promotion.start_date || "N/A"}</TableCell>
                <TableCell>{promotion.end_date || "N/A"}</TableCell>
                <TableCell>
                  {promotion.created_at
                    ? new Date(promotion.created_at).toLocaleString()
                    : "N/A"}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            backgroundColor: "var(--primary-color)",
            color: "#ffffff",
            marginBottom: "20px",
          }}
        >
          Add New Promotion
        </DialogTitle>
        <StyledDialogContent>
          <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
            <TextField
              label="Title"
              name="title"
              value={newPromotion.title}
              onChange={handleInputChange}
              fullWidth
              required
              placeholder="Enter title"
            />
            <TextField
              label="Markdown Content"
              name="markdown_content"
              value={newPromotion.markdown_content}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              required
              placeholder="Enter markdown content"
            />
            <TextField
              label="Image URL"
              name="preview_image_url"
              value={newPromotion.preview_image_url}
              onChange={handleInputChange}
              fullWidth
              placeholder="Enter image URL"
            />
            <TextField
              label="Start Date"
              name="start_date"
              value={newPromotion.start_date}
              onChange={handleInputChange}
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="End Date"
              name="end_date"
              value={newPromotion.end_date}
              onChange={handleInputChange}
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </StyledDialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddPromotion}
            sx={{
              backgroundColor: "var(--primary-color)",
              color: "white",
              borderRadius: "8px",
              padding: "8px 16px",
            }}
          >
            Save Promotion
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
