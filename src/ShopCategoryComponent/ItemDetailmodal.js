import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getToken } from "../Helper/Storage";
import { useNavigate } from "react-router-dom";

const ItemDetailmodal = ({ itemOpen, setItemOpen }) => {
  const navigate = useNavigate();
  const token = getToken();
  console.log("first", token);
  const handleClose = () => {
    setItemOpen(false);
  };

  const handleContenue = () => {
    if (token) {
      navigate("/selling/select-condition");
      setItemOpen(false);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Dialog
        open={itemOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: { maxHeight: "80vh", borderRadius: "20px" },
        }}
      >
        <DialogTitle sx={{ fontWeight: "600" }}>
          Confirm details
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            The item details below will pre-fill your listing.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} display="flex" justifyContent="center">
              <img
                src="https://i.ebayimg.com/images/g/FtMAAOSwvK1jl6Zg/s-l1600.png"
                alt="img"
                style={{
                  width: "100%",
                  maxWidth: "200px",
                  borderRadius: "10px",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ mb: 1, fontWeight: "600" }}>
                Size 10 - Nike Kendrick Lamar x Cortez Basic Slip House Shoes
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Brand:</strong> Nick <br />
                <strong>Shoes Size:</strong> 10 <br />
                <strong>Style Code:</strong> AV2950-100
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleContenue}
            variant="contained"
            sx={{ width: "40%", borderRadius: "20px", color: "white" }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ItemDetailmodal;
