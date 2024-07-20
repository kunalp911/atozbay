import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Grid,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getToken } from "../Helper/Storage";
import { useNavigate } from "react-router-dom";
import { apiCallNew } from "../Network_Call/apiservices";
import ApiEndPoints from "../Network_Call/ApiEndPoint";
import logos from "../Assets/image/bay.png";

const ItemDetailmodal = ({ itemOpen, setItemOpen, id }) => {
  const navigate = useNavigate();
  const token = getToken();
  const [productDetails, setProductLists] = React.useState({});
  const [load, setload] = useState(false);

  useEffect(() => {
    if (id) {
      getProductDetails(id);
    }
  }, [id]);

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

  const getProductDetails = (id) => {
    try {
      setload(true);
      apiCallNew("get", {}, ApiEndPoints.ProductShopDetail + id).then(
        (response) => {
          if (response.success) {
            setProductLists(response.result);
            setload(false);
          }
        }
      );
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };
  return (
    <div>
      {load && (
        <div style={styles.backdrop}>
          <CircularProgress style={styles.loader} />
        </div>
      )}
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
                src={
                  productDetails?.product_images &&
                  productDetails.product_images.length > 0
                    ? productDetails.product_images[0].product_image
                    : logos
                }
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
                {productDetails?.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {productDetails?.product_attributes?.map((item) => (
                  <>
                    <strong>{item?.attribute_name}:</strong>{" "}
                    {item?.attr_val_name}
                    <br />
                  </>
                ))}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <button onClick={handleContenue} className="btn btn-continesss">
            Continue
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    color: "white",
  },
};

export default ItemDetailmodal;
