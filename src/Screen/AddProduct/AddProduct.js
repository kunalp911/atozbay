import React, { useEffect, useState } from "react";
import logos from "../../Assets/image/bay.png";
import { json, Link, useLocation, useNavigate } from "react-router-dom";
import "./addproduct.css";
import { useDropzone } from "react-dropzone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  List,
  ListItem,
  DialogActions,
  ListItemText,
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  CircularProgress,
  IconButton,
  Box,
  Modal,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@material-ui/core";
import { toast } from "react-toastify";
import moment from "moment/moment";
import CloseIcon from "@mui/icons-material/Close";
import { formatCapitalize } from "../../Component/ReuseFormat/ReuseFormat";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
  },
}));
const PreviewModal = ({ open, onClose, formData, images, imagess }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle className="font-weight-bold" variant="h5">
        Product Preview
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Basic Details</Typography>
            <List>
              <ListItem>
                <strong>Name:</strong> {formData.name || "N/A"}
              </ListItem>
              <ListItem>
                <strong>SKU:</strong> {formData.sku || "N/A"}
              </ListItem>
              <ListItem>
                <strong>Condition:</strong>{" "}
                {formData.condition_description || "N/A"}
              </ListItem>
              <ListItem>
                <strong>Description:</strong> {formData.description || "N/A"}
              </ListItem>
              <ListItem>
                <strong>Price:</strong> {formData.price || "N/A"}{" "}
              </ListItem>
              <ListItem>
                <strong>Auction Duration:</strong>{" "}
                {formData.auction_duration || "N/A"}
              </ListItem>
              <ListItem>
                <strong>Available Quantity:</strong>{" "}
                {formData.available_quantity || "N/A"}
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Other Details</Typography>
            <List>
              <ListItem>
                <strong>Starting Bid:</strong> {formData.starting_bid || "N/A"}
              </ListItem>
              <ListItem>
                <strong>Brand ID:</strong> {formData.brand_id || "N/A"}
              </ListItem>
              <ListItem>
                <strong>Color ID:</strong> {formData.color_id || "N/A"}
              </ListItem>
              <ListItem>
                <strong>Category ID:</strong> {formData.category_id || "N/A"}
              </ListItem>
              <ListItem>
                <strong>Shipping in Days:</strong>{" "}
                {formData.shipping_in_days || "N/A"}
              </ListItem>
              <ListItem>
                <strong>Shipping Charge:</strong>{" "}
                {formData.shipping_charge || "N/A"}
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Images</Typography>
            {images.length > 0 ? (
              <Grid container spacing={2}>
                {images.map((image, index) => (
                  <Grid item key={index} xs={6} sm={4}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Product Preview ${index + 1}`}
                      style={{ width: "100%" }}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : imagess ? null : (
              <Typography>No images uploaded</Typography>
            )}
            <Grid container spacing={2}>
              {imagess?.map((image, index) => (
                <Grid item key={index} xs={6} sm={4}>
                  <img
                    src={image?.product_image}
                    alt={`Product Preview ${index + 1}`}
                    style={{ width: "100%" }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AddProduct = () => {
  const classes = useStyles();
  const location = useLocation();
  const conditionName = location.state?.condition;
  const updateProduct = location.state?.product || null;
  const draf = location.state?.statuss || null;
  const isUpdateMode = !!updateProduct;
  const initialSelectedAttributes = updateProduct?.product_attributes?.reduce(
    (acc, item) => {
      acc[item?.product_attr_id] = item?.product_attr_value_id;
      return acc;
    },
    {}
  );
  const navigate = useNavigate();
  const [colorList, setColorList] = React.useState([]);
  const [openPreview, setOpenPreview] = useState(false);
  const [brandList, setBrandList] = React.useState([]);
  const [isPhoto, setIsPhoto] = useState(true);
  const [images, setImages] = useState([]);
  const [updateImage, setUpdateImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);
  const [subCategoriesList, setSubCategoriesList] = React.useState([]);
  const [attributesList, setAttributesList] = useState([]);
  const [attributesValueList, setAttributesValueList] = useState({});
  const [selectedAttributes, setSelectedAttributes] = useState(
    initialSelectedAttributes || {}
  );
  const [open, setOpen] = useState(false);
  const [openss, setOpenss] = useState(false);
  const [opensss, setOpensss] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [step, setStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [load, setload] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [customAttributes, setCustomAttributes] = useState({
    custom_attribute_name: "",
    custom_attribute_value: "",
    id: null,
  });

  const [refundType, setRefundType] = useState("");
  const [customArray, setCustomArray] = useState([]);
  const [customCategory, setCustomCategory] = useState("");
  const [customCategoryMain, setCustomCategoryMain] = useState("");
  const [customCategoryData, setCustomCategoryData] = useState("");
  const [openPackage, setOpenPackage] = useState(false);
  const [addProductFormData, setAddProductFormData] = useState({
    name: "",
    sku: "",
    condition_description: "",
    description: "",
    price: "",
    price_format: "",
    auction_duration: "",
    available_quantity: "",
    starting_bid: "",
    brand_id: "",
    color_id: 4,
    category_id: "",
    short_desc: "short description",
    shipping_in_days: "",
    shipping_charge: "",
    return_days: "",
  });
  const formattedDateTime = moment(`${date} ${time}`, "YYYY-MM-DD H:mm").format(
    "YYYY-MM-DD HH:mm"
  );
  console.log("updateProduct", updateProduct);
  console.log("addProductFormData", addProductFormData);
  console.log("categoriesList", categoriesList);
  useEffect(() => {
    if (updateProduct) {
      setAddProductFormData({
        name: updateProduct?.name,
        sku: updateProduct?.sku,
        condition_description: updateProduct?.condition_description,
        description: updateProduct?.description,
        price: updateProduct?.product_prices?.price,
        price_format: updateProduct?.product_prices?.price_format,
        auction_duration: updateProduct?.product_prices?.auction_duration,
        available_quantity: updateProduct?.product_prices?.available_quantity,
        starting_bid: updateProduct?.product_prices?.starting_bid,
        brand_id: updateProduct?.brand_id,
        color_id: updateProduct?.color_id || 4,
        category_id: updateProduct?.category_id,
        short_desc: updateProduct?.short_desc,
        shipping_in_days: updateProduct?.product_shipping?.shipping_in_days,
        shipping_charge: updateProduct?.product_shipping?.shipping_charge,
        return_days: updateProduct?.return_days,
      });

      // Initialize attributes

      setUpdateImage(updateProduct?.product_images);
      getAttributesList(updateProduct?.category_id);
      setCategoryName(updateProduct?.category_name);
      setSelectedValue(updateProduct?.item_condition);
      setDate(updateProduct?.product_prices?.auction_date_time);
      setCustomArray(updateProduct?.custom_attributes);
    }
  }, []);

  useEffect(() => {
    setAddProductFormData((prevData) => ({
      ...prevData,
      condition_description: selectedValue || conditionName || "",
    }));
    window.scrollTo(0, 0);
  }, [selectedValue, conditionName]);

  useEffect(() => {
    setAddProductFormData((prevData) => ({
      ...prevData,
      return_days: refundType === "1" ? updateProduct?.return_days : "",
    }));
  }, [refundType]);

  useEffect(() => {
    setAddProductFormData((addProductFormData) => {
      return {
        ...addProductFormData,
        category_id: customCategoryData
          ? customCategoryData
          : updateProduct?.category_id,
      };
    });
  }, [customCategoryData]);

  useEffect(() => {
    setRefundType(updateProduct?.return_days ? "1" : "2");
  }, [updateProduct?.return_days]);

  const handleOpenPreview = () => {
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const handleClosePackage = () => setOpenPackage(false);

  const handleCustomAttributes = (e) => {
    const { name, value } = e.target;
    setCustomAttributes({
      ...customAttributes,
      [name]: value,
    });
  };

  const customCategorySubmit = async (e) => {
    const payload = {
      category_name: customCategory,
      parent_id: customCategoryMain,
    };
    try {
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.CategoryAdd
      );
      if (response.success) {
        setCustomCategoryData(response.result);
        setOpenCategory(false);
        toast.success(response.msg);
        getCategories();
      } else {
        toast.error(response.msg[0]);
      }
    } catch (error) {
      toast.error(error.msg[0]);
    }
  };

  const customSubmit = (e) => {
    e.preventDefault();

    if (
      customAttributes.custom_attribute_name &&
      customAttributes.custom_attribute_value
    ) {
      const isEdit = customAttributes.id !== null;

      if (isEdit) {
        // Update the existing attribute
        setCustomArray((prevArray) =>
          prevArray.map((item) =>
            item.id === customAttributes.id
              ? {
                  ...item,
                  custom_attribute_name: customAttributes.custom_attribute_name,
                  custom_attribute_value:
                    customAttributes.custom_attribute_value,
                }
              : item
          )
        );
      } else {
        // Add a new attribute
        const newId =
          customArray.length > 0
            ? Math.max(...customArray.map((attr) => attr.id)) + 1
            : 1;
        setCustomArray((prevArray) => [
          ...prevArray,
          {
            id: newId,
            custom_attribute_name: customAttributes.custom_attribute_name,
            custom_attribute_value: customAttributes.custom_attribute_value,
          },
        ]);
      }
      setOpensss(false);
      setCustomAttributes({
        custom_attribute_name: "",
        custom_attribute_value: "",
        id: null,
      });
    } else {
      setOpensss(true);
    }
  };

  const handleEdit = (item) => {
    setCustomAttributes({
      custom_attribute_name: item?.custom_attribute_name,
      custom_attribute_value: item?.custom_attribute_value,
      id: item?.id,
    });
    setOpensss(true);
  };

  const handleUpdateProduct = async (e, status) => {
    e.preventDefault();
    const attribute_ids = [];
    const attribute_value_ids = [];

    attributesList?.forEach((attribute) => {
      const attributeId = attribute.id;
      const attributeValueId = selectedAttributes[attributeId];

      if (attributeValueId) {
        attribute_ids.push(attributeId);
        attribute_value_ids.push(attributeValueId);
      }
    });
    const allImages = [...(images || []), ...(updateImage || [])];
    const payload = {
      attribute_id: attribute_ids,
      attribute_value_id: attribute_value_ids,
      item_condition: selectedValue ? selectedValue : conditionName,
      video: video || null,
      images: allImages,
      auction_date_time: formattedDateTime,
      custom_attribute_name: customArray?.map(
        (item) => item?.custom_attribute_name
      ),
      custom_attribute_value: customArray?.map(
        (item) => item?.custom_attribute_value
      ),
      custom_attribute_id: customArray?.map((item) => item?.id),
      status: status,
      ...addProductFormData,
    };
    setload(true);
    try {
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.ProductUpdate + updateProduct?.id
      );
      setload(true);
      if (response.success === true) {
        toast.success(response.msg);
        setload(false);
        if (status == 2) {
          navigate("/drafts");
        } else {
          navigate("/product-list");
        }
      } else {
        toast.error(response.msg[0]);
        setload(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAddProductFormData((prevState) => ({
      ...prevState,
      available_quantity:
        addProductFormData?.price_format == 1
          ? addProductFormData?.available_quantity
          : addProductFormData?.price_format == 0
          ? 1
          : "",
    }));
  }, [addProductFormData.price_format]);

  useEffect(() => {
    if (updateProduct) {
      attributesList?.forEach((item) => {
        getAttributesValueList(item.id);
      });
    }
  }, [attributesList]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleOpenss = () => {
    setOpenss(true);
  };

  const handleClosess = () => {
    setOpenss(false);
  };
  const handleOpensss = () => {
    setOpensss(true);
  };

  const handleClosesss = () => {
    setOpensss(false);
  };

  const handleCateOpen = () => {
    setOpenCategory(true);
  };

  const handleCateClose = () => {
    setOpenCategory(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setStep(0);
  };

  const handleCategoryClick = () => {
    setStep(step + 1);
  };

  const handlesetCategory = (category) => {
    getSubCategories(category);
  };

  const handlesetSubCategory = (item) => {
    handleClose();
    setCategoryName(item?.category_name);
    getAttributesList(item?.id);
    setAddProductFormData((addProductFormData) => {
      return { ...addProductFormData, category_id: item?.id };
    });
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const renderContent = () => {
    if (step === 0) {
      return categoriesList
        .filter((item) =>
          item.category_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((category) => (
          <ListItem
            button
            key={category?.id}
            onClick={() => {
              handleCategoryClick(category);
              handlesetCategory(category?.id);
            }}
          >
            <ListItemText primary={category?.category_name} />
            <i className="fa fa-angle-right"></i>
          </ListItem>
        ));
    } else if (step === 1) {
      return subCategoriesList.map((item) => (
        <ListItem
          button
          key={item.id}
          onClick={() => {
            handleCategoryClick(item);
            handlesetSubCategory(item);
          }}
        >
          <ListItemText primary={item?.category_name} />
          {/* <i className="fa fa-angle-right"></i> */}
        </ListItem>
      ));
    }
  };

  const handleImageDelete = (id) => {
    try {
      apiCallNew("delete", {}, ApiEndPoints.ProductImage + id).then(
        (response) => {
          if (response.success) {
            // toast.success(response.msg);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,video/*",
    onDrop: (acceptedFiles) => {
      const imageFiles = [];
      const videoFiles = [];

      acceptedFiles.forEach((file) => {
        file.preview = URL.createObjectURL(file);
        file.id = `${file.name}-${Date.now()}-${Math.random()}`;
        if (file.type.startsWith("image/")) {
          imageFiles.push(file);
        } else if (file.type.startsWith("video/")) {
          videoFiles.push(file);
        }
      });

      if (isPhoto) {
        // setImages((prevImages) => {
        //   const totalImages = prevImages.length + imageFiles.length;

        //   // Get current date
        //   const currentDate = new Date();
        //   const packageEndDate = new Date(activPackage?.user_package_end_date);

        //   // Check if the package has expired
        //   if (packageEndDate < currentDate) {
        //     alert("Your plan has expired. Please renew your plan.");
        //     navigate("/subscription");
        //     imageFiles.forEach((file) => URL.revokeObjectURL(file.preview));
        //     return prevImages;
        //   }

        //   // Check if the user has no subscription (current_no_of_images is 0)
        //   if (activPackage?.current_no_of_images === 0) {
        //     alert(
        //       "You don't have an active plan. Please take a subscription to upload images."
        //     );
        //     navigate("/subscription");
        //     imageFiles.forEach((file) => URL.revokeObjectURL(file.preview));
        //     return prevImages; // Prevent further uploads if no plan is active
        //   }

        //   // For users on a free plan (allowing only 4 images)
        //   if (totalImages > 4) {
        //     alert(
        //       "You can upload a maximum of 4 images for free. Please upgrade your plan to upload more images."
        //     );
        //     navigate("/subscription");
        //     imageFiles.forEach((file) => URL.revokeObjectURL(file.preview));
        //     return prevImages; // Prevent further uploads if they exceed the free limit
        //   }

        //   // Add the images if the user is within the free limit or has an active package
        //   return [...prevImages, ...imageFiles];
        // });
        // setImages((prevImages) => {
        //   const totalImages = prevImages.length + imageFiles.length;

        //   // Get current date
        //   const currentDate = new Date();
        //   const packageEndDate = new Date(activPackage?.user_package_end_date);

        //   // Check if the package has expired
        //   const isPackageExpired = packageEndDate < currentDate;

        //   // Check if the user has no active subscription (current_no_of_images is 0)
        //   const isNoActivePlan = activPackage?.current_no_of_images === 0;

        //   // If the plan is expired or there is no active plan, apply the free plan conditions
        //   if (isPackageExpired || isNoActivePlan) {
        //     // Limit free users to upload only 4 images
        //     if (totalImages > 4) {
        //       alert(
        //         "You can upload a maximum of 4 images for free. Please upgrade your plan to upload more images."
        //       );
        //       navigate("/subscription");
        //       imageFiles.forEach((file) => URL.revokeObjectURL(file.preview));
        //       return prevImages; // Prevent further uploads if they exceed the free limit
        //     }
        //     // Allow uploading images within the free limit
        //     return [...prevImages, ...imageFiles];
        //   }

        //   // For users with an active plan, allow uploads without the 4-image limit
        //   return [...prevImages, ...imageFiles];
        // });

        setImages((prevImages) => {
          const totalImages =
            prevImages?.length +
            imageFiles?.length +
            (updateImage?.length || 0);
          if (totalImages > 4) {
            setOpenPackage(true);
            // navigate("/subscription");
            imageFiles.forEach((file) => URL.revokeObjectURL(file.preview));
            return prevImages;
          }
          return [...prevImages, ...imageFiles];
        });
      } else {
        if (!video && videoFiles.length > 0) {
          setVideo(videoFiles[0]);
        } else if (videoFiles.length > 0) {
          alert("Only one video can be uploaded.");
          videoFiles.forEach((file) => URL.revokeObjectURL(file.preview));
        }
      }
    },
  });

  useEffect(() => {
    return () => {
      images.forEach((file) => URL.revokeObjectURL(file.preview));
      if (video) {
        URL.revokeObjectURL(video.preview);
      }
    };
  }, [images, video]);

  useEffect(() => {
    getColorList();
    getCategories();
    getBrandList();
  }, []);

  const handleAttributeChange = (event, attributeId) => {
    const { value } = event.target;
    setSelectedAttributes((prevState) => ({
      ...prevState,
      [attributeId]: value,
    }));
    getAttributesValueList(attributeId);
  };

  const getAttributesList = (id) => {
    apiCallNew("get", {}, ApiEndPoints.AttributesByCategory + id)
      .then((response) => {
        if (response.success) {
          setAttributesList(response.result);
          response.result.forEach((attribute) => {
            getAttributesValueList(attribute.id);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAttributesValueList = (id) => {
    apiCallNew("get", {}, ApiEndPoints.AttributesValueList + id)
      .then((response) => {
        if (response.success) {
          setAttributesValueList((prevState) => ({
            ...prevState,
            [id]: response.result,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getColorList = () => {
    try {
      apiCallNew("get", {}, ApiEndPoints.ColorList).then((response) => {
        if (response.success) {
          setColorList(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getBrandList = () => {
    try {
      apiCallNew("get", {}, ApiEndPoints.BrandList).then((response) => {
        if (response.success) {
          setBrandList(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = () => {
    try {
      apiCallNew("get", {}, ApiEndPoints.CategoriesList).then((response) => {
        if (response.success) {
          setCategoriesList(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSubCategories = (id) => {
    try {
      apiCallNew("get", {}, ApiEndPoints.SubCategoriesList + id).then(
        (response) => {
          if (response.success) {
            setSubCategoriesList(response.result);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleaddProductChange = (event) => {
    const { name, value } = event.target;
    setAddProductFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleAddProduct = async (e, status) => {
    e.preventDefault();
    const attribute_ids = [];
    const attribute_value_ids = [];

    attributesList?.forEach((attribute, index) => {
      const attributeId = attribute.id;
      const attributeValueId = selectedAttributes[attributeId];

      if (attributeValueId) {
        attribute_ids.push(attributeId);
        attribute_value_ids.push(attributeValueId);
      }
    });
    const payload = {
      attribute_id: attribute_ids,
      attribute_value_id: attribute_value_ids,
      item_condition: selectedValue ? selectedValue : conditionName,
      video: video ? video : null,
      images: images,
      auction_date_time: formattedDateTime,
      custom_attribute_name: customArray?.map(
        (item) => item?.custom_attribute_name
      ),
      custom_attribute_value: customArray?.map(
        (item) => item?.custom_attribute_value
      ),
      status: status,
      ...addProductFormData,
    };

    setload(true);

    try {
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.ProductAdd
      );
      setload(true);
      if (response.success === true) {
        toast.success(response.msg);
        setload(false);
        if (status == 2) {
          navigate("/drafts");
        } else {
          navigate("/product-list");
        }
      } else {
        toast.error(response.msg[0]);
        setload(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {load && (
        <div style={styles.backdrop}>
          <CircularProgress style={styles.loader} />
        </div>
      )}
      <div className="col-12 d-flex justify-content-center border-bottom">
        <img
          src={logos}
          alt="logo"
          width={125}
          style={{ margin: "20px 0px" }}
          onClick={() => navigate("/")}
        />
      </div>
      <div className="container" style={{ padding: "10px 40px" }}>
        <div className="d-flex justify-content-between">
          <h4 className="helo">Complete your listing</h4>
        </div>
        <section className="photos-video mt-2">
          <h6 style={{ fontWeight: "bold" }}>PHOTOS</h6>
          <div
            {...getRootProps({ className: "dropzone" })}
            style={dropzoneStyle}
          >
            <input {...getInputProps()} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={boxStyle} onClick={() => setIsPhoto(true)}>
                <AddPhotoAlternateIcon />
                <p>Add photos</p>
              </div>
              {/* <div style={boxStyle} onClick={() => setIsPhoto(false)}>
                <VideoLibraryIcon />
                <p>Upload video</p>
              </div> */}
            </div>
          </div>
          <div>
            {isUpdateMode && (
              <div
                style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}
              >
                {updateImage?.map((file, index) => (
                  <>
                    <img
                      key={index}
                      src={file.product_image}
                      alt={`img-${index}`}
                      style={mediaPreviewStyle}
                    />
                    <i
                      className="fa fa-times"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleImageDelete(file.id);
                        setUpdateImage((prevImages) =>
                          prevImages.filter((img) => img.id !== file.id)
                        );
                      }}
                    ></i>
                  </>
                ))}
              </div>
            )}
            {images?.length > 0 && <h6 className="mt-3">Uploaded Images</h6>}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {images?.map((file, index) => (
                <div key={file.id} style={{ display: "flex" }}>
                  <img
                    src={file.preview}
                    alt={`img-${file.id}`}
                    style={mediaPreviewStyle}
                  />
                  <i
                    className="fa fa-times"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setImages((prevImages) => {
                        const updatedImages = prevImages.filter(
                          (img) => img.id !== file.id
                        );
                        URL.revokeObjectURL(file.preview);
                        return updatedImages;
                      });
                    }}
                  ></i>
                </div>
              ))}
            </div>
            {video && <h6>Uploaded Video</h6>}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {video && (
                <>
                  <video
                    src={video?.preview}
                    controls
                    width="200"
                    style={{ margin: "10px" }}
                  />
                  <i
                    className="fa fa-times"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      URL.revokeObjectURL(video.preview);
                      setVideo(null);
                    }}
                  ></i>
                </>
              )}
            </div>
          </div>
        </section>
        <section className="details mt-4">
          <div className="listing-section">
            <div className="section-header">TITLE</div>
            <div className="form-group">
              <label for="item-title">Item Title</label>
              <input
                type="text"
                className="form-control"
                id="item-title"
                placeholder="title"
                name="name"
                value={addProductFormData.name}
                onChange={handleaddProductChange}
              />
            </div>
          </div>
          <div className="listing-section">
            <div className="section-header">SKU</div>
            <div className="form-group">
              <label for="item-title">sku</label>
              <input
                type="text"
                className="form-control"
                id="item-title"
                name="sku"
                value={addProductFormData.sku}
                onChange={handleaddProductChange}
              />
            </div>
          </div>
          <div className="listing-section">
            <div className="section-header">ITEM CATEGORY</div>
            <div className="form-group d-flex justify-content-between mt-3">
              <p className="item-condition-name" onClick={handleOpen}>
                <u>{categoryName ? categoryName : "select category"}</u>
              </p>
              <p className="item-condition-name" onClick={handleOpen}>
                <EditIcon />
                Edit
              </p>
            </div>
            <div className="form-group">
              <p className="item-condition-name">
                <u>{customCategory}</u>
              </p>
              <div className="mt-5">
                <p onClick={handleCateOpen}>
                  <span className="addcustom-item">
                    {"+"} Add custom Category
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="listing-section">
            <div className="section-header">ITEM SPECIFICS</div>
            <div className="mt-2 mb-2">
              <h6>Required</h6>
              <p className="text-muted">
                Buyers need these details to find your item.
              </p>
            </div>
            <div className="form-group row">
              <label for="brand" className="col-sm-2 col-form-label">
                Brand
              </label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  id="brand"
                  name="brand_id"
                  value={addProductFormData.brand_id}
                  onChange={handleaddProductChange}
                >
                  <option value={""} hidden>
                    select brand
                  </option>
                  {brandList?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.brand_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {attributesList?.map((item, index) => (
              <div className="form-group row" key={index}>
                <label
                  htmlFor={`attribute-${item.id}`}
                  className="col-sm-2 col-form-label"
                >
                  {item.attribute_name}
                </label>
                <div className="col-sm-10">
                  <select
                    className="form-control"
                    name={item.attribute_name}
                    id={`attribute-${item.id}`}
                    value={selectedAttributes[item.id] || ""}
                    onChange={(e) => handleAttributeChange(e, item.id)}
                  >
                    <option value="" hidden>
                      Select {item?.attribute_name}
                    </option>
                    {Array.isArray(attributesValueList[item.id]) &&
                      attributesValueList[item.id].map((attrValue, idx) => (
                        <option key={idx} value={attrValue.id}>
                          {attrValue.attr_val_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            ))}
            {isUpdateMode
              ? customArray?.map((item, index) => (
                  <div className="form-group row">
                    <label for="cv" className="col-sm-2 col-form-label">
                      {item.custom_attribute_name}
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="cv"
                        value={item.custom_attribute_value}
                      />
                    </div>
                    <div className="col-sm-1">
                      <EditIcon onClick={() => handleEdit(item)} />
                    </div>
                  </div>
                ))
              : customArray?.map((item, index) => (
                  <div className="form-group row">
                    <label for="cv" className="col-sm-2 col-form-label">
                      {item.custom_attribute_name}
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="cv"
                        value={item.custom_attribute_value}
                      />
                    </div>
                  </div>
                ))}
            {/* {customArray?.map((item, index) => (
              <div className="form-group row">
                <label for="cv" className="col-sm-2 col-form-label">
                  {item.customName}
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="cv"
                    value={item.customValue}
                  />
                </div>
              </div>
            ))} */}

            <Dialog
              open={open}
              onClose={handleClose}
              fullWidth={"lg"}
              maxWidth={"md"}
              classes={{ paper: classes.dialogPaper }}
            >
              <Grid container className="d-flex justify-content-between p-2">
                <button
                  disabled={step === 0}
                  onClick={handleBack}
                  className="btn btn-sm"
                >
                  <ArrowBackIosIcon
                    onClick={handleBack}
                    disabled={step === 0}
                    className="mt-1"
                    style={{ cursor: "pointer", fontSize: "30px" }}
                  />
                </button>
                <DialogTitle className="text-center">Item Category</DialogTitle>
                <Button onClick={handleClose} color="primary">
                  Done
                </Button>
              </Grid>
              <DialogContent dividers>
                {step === 0 && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                )}
                <List>{renderContent()}</List>
              </DialogContent>
            </Dialog>
            <div className="form-group">
              <div className="mt-5">
                <p onClick={handleOpensss}>
                  <span className="addcustom-item">
                    {"+"} Add custom item specific
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="listing-section">
            <div className="section-header">CONDITION</div>
            <div className="form-group">
              <h6 className="mt-3">Item condition</h6>
              <div className="d-flex justify-content-between">
                <p className="item-condition-name" onClick={handleOpenss}>
                  <u>{selectedValue ? selectedValue : conditionName}</u>
                </p>
                <p className="item-condition-name" onClick={handleOpenss}>
                  <EditIcon />
                  Edit
                </p>
              </div>
              <div className="form-group">
                <label for="description">Condition description</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="2"
                  name="condition_description"
                  value={addProductFormData.condition_description}
                  onChange={handleaddProductChange}
                ></textarea>
              </div>
              <Dialog
                open={openss}
                onClose={handleClosess}
                fullWidth
                maxWidth="sm"
              >
                <Grid container className="d-flex justify-content-between p-2">
                  <DialogTitle className="text-center">
                    Item condition
                  </DialogTitle>
                  <Button onClick={handleClosess} color="primary">
                    Done
                  </Button>
                </Grid>
                <DialogContent dividers>
                  <RadioGroup value={selectedValue} onChange={handleChange}>
                    <FormControlLabel
                      value="New"
                      control={<Radio />}
                      label={
                        <div>
                          <Typography variant="body1">
                            <strong>New</strong>
                          </Typography>
                          <Typography variant="body2">
                            A brand-new, unused, unopened, undamaged item in its
                            original packaging (where packaging is applicable).
                            Packaging should be the same as what is...
                            <Link href="#">Read more</Link>
                          </Typography>
                        </div>
                      }
                    />
                    <FormControlLabel
                      value="New other (see details)"
                      control={<Radio />}
                      label={
                        <div>
                          <Typography variant="body1">
                            <strong>New other (see details)</strong>
                          </Typography>
                          <Typography variant="body2">
                            A new, unused item with absolutely no signs of wear.
                            The item may be missing the original packaging, or
                            in the original packaging but not sealed. The
                            item...
                            <Link href="#">Read more</Link>
                          </Typography>
                        </div>
                      }
                    />
                    <FormControlLabel
                      value="Used"
                      control={<Radio />}
                      label={
                        <div>
                          <Typography variant="body1">
                            <strong>Used</strong>
                          </Typography>
                          <Typography variant="body2">
                            An item that has been used previously. The item may
                            have some signs of cosmetic wear, but is fully
                            operational and functions as intended. This item...
                            <Link href="#">Read more</Link>
                          </Typography>
                        </div>
                      }
                    />
                    <FormControlLabel
                      value="For parts or not working"
                      control={<Radio />}
                      label={
                        <div>
                          <Typography variant="body1">
                            <strong>For parts or not working</strong>
                          </Typography>
                          <Typography variant="body2">
                            An item that does not function as intended and is
                            not fully operational. This includes items that are
                            defective in ways that render them difficult to
                            use...
                            <Link href="#">Read more</Link>
                          </Typography>
                        </div>
                      }
                    />
                  </RadioGroup>
                </DialogContent>
              </Dialog>
              <Dialog
                open={opensss}
                onClose={handleClosesss}
                fullWidth
                maxWidth="sm"
              >
                <Grid container className="d-flex justify-content-between p-2">
                  <DialogTitle className="text-center">
                    Add custom item specific
                  </DialogTitle>
                  <IconButton
                    aria-label="close"
                    onClick={handleClosesss}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 5,
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
                <DialogContent dividers>
                  <form action="javascript:void(0)" onSubmit={customSubmit}>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="custom_attribute_name"
                        value={customAttributes.custom_attribute_name}
                        onChange={handleCustomAttributes}
                      />
                      Example: Year
                    </div>
                    <div className="form-group">
                      <label>Value</label>
                      <input
                        type="text"
                        className="form-control"
                        name="custom_attribute_value"
                        value={customAttributes.custom_attribute_value}
                        onChange={handleCustomAttributes}
                      />
                      Example: 2017
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-closess"
                        onClick={handleClosesss}
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-savss ms-3">
                        Save
                      </button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              {/* {custom category add} */}
              <Dialog
                open={openCategory}
                onClose={handleCateClose}
                fullWidth
                maxWidth="sm"
              >
                <Grid container className="d-flex justify-content-between p-2">
                  <DialogTitle className="text-center">
                    Add custom Category
                  </DialogTitle>
                  <IconButton
                    aria-label="close"
                    onClick={handleCateClose}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 5,
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
                {console.log("customCategoryMain", customCategoryMain)}
                <DialogContent dividers>
                  <form
                    action="javascript:void(0)"
                    onSubmit={customCategorySubmit}
                  >
                    <div className="form-group">
                      <label>Select Category</label>
                      <select
                        type="text"
                        className="form-control"
                        name="custom_attribute_name"
                        value={customCategoryMain}
                        onChange={(e) => setCustomCategoryMain(e.target.value)}
                      >
                        <option>Select Category</option>
                        {categoriesList.map((item) => (
                          <option key={item?.id} value={item?.id}>
                            {item?.category_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Sub Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="custom_attribute_name"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-closess"
                        onClick={handleCateClose}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-savss ms-3"
                        disabled={!customCategory || !customCategoryMain}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="listing-section">
            <div className="section-header">DESCRIPTION</div>
            <div className="form-group">
              <label for="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="5"
                maxLength={1000}
                placeholder="Enter description here..."
                name="description"
                value={formatCapitalize(addProductFormData.description)}
                onChange={handleaddProductChange}
              ></textarea>
              <small>{addProductFormData?.description?.length}/1000</small>
            </div>
          </div>
          <div className="listing-section">
            <div className="section-header">PRICING</div>
            <div className="form-group">
              <div className="col-sm-4 p-0">
                <label for="brandsa">Format</label>
                <div className="">
                  <select
                    className="form-control"
                    id="brandsa"
                    name="price_format"
                    value={addProductFormData.price_format}
                    onChange={handleaddProductChange}
                  >
                    <option value="" hidden>
                      select format
                    </option>
                    <option value={0}>Auction</option>
                    <option value={1}>Buy it now</option>
                  </select>
                </div>
              </div>
              {addProductFormData.price_format == 1 ? (
                <>
                  <div className="col-sm-4 p-0 mt-2">
                    <label for="brandss">Price</label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="brandss"
                        name="price"
                        value={addProductFormData.price}
                        onChange={handleaddProductChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-4 p-0 mt-2">
                    <label for="brandd">Quantity</label>
                    <div className="">
                      <input
                        type="number"
                        className="form-control"
                        id="brandd"
                        name="available_quantity"
                        value={addProductFormData.available_quantity}
                        onChange={handleaddProductChange}
                      />
                    </div>
                  </div>
                </>
              ) : addProductFormData.price_format == 0 ? (
                <>
                  <div className="col-sm-4 p-0 mt-2">
                    <label for="Action">Action duration</label>
                    <div className="">
                      <select
                        className="form-control"
                        id="Action"
                        name="auction_duration"
                        value={addProductFormData.auction_duration}
                        onChange={handleaddProductChange}
                      >
                        <option value="" hidden></option>
                        <option value="3">3 days</option>
                        <option value="5">5 days</option>
                        <option value="7">7 days</option>
                        <option value="10">10 days</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-4 p-0 mt-2">
                    <label for="Starting">Starting bid</label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="Starting"
                        name="starting_bid"
                        value={addProductFormData.starting_bid}
                        onChange={handleaddProductChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-4 p-0 mt-2">
                    <label for="Now">Buy It Now(optional)</label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="Now"
                        name="price"
                        value={addProductFormData.price}
                        onChange={handleaddProductChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-4 p-0 mt-2">
                    <label for="Reserve">Reserve price(optional)</label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="Reserve"
                        name="reserve_price"
                        value={addProductFormData.reserve_price}
                        onChange={handleaddProductChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-4 p-0 mt-2">
                    <label for="Quantity">Quantity</label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="Quantity"
                        name="available_quantity"
                        disabled
                        defaultValue={1}
                        value={addProductFormData.price_format == 0 ? 1 : ""}
                        onChange={handleaddProductChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 row mt-2">
                    <div className="col-sm-4 p-0 mt-2">
                      <label for="days">Schedule your listing</label>
                      <div className="">
                        <input
                          type="date"
                          className="form-control"
                          id="daysss"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-4 p-0 mt-2 ms-3">
                      <label for="time">Time</label>
                      <div className="">
                        <input
                          type="time"
                          className="form-control"
                          id="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div className="col-sm-4 p-0 mt-2">
            <div className="section-header mb-2">SHIPPING</div>
            <label for="ship">Shipping in days</label>
            <div className="">
              <select
                className="form-control"
                id="ship"
                name="shipping_in_days"
                value={addProductFormData.shipping_in_days}
                onChange={handleaddProductChange}
              >
                <option value="" hidden></option>
                <option value="1-3">1-3 days</option>
                <option value="3-5">3-5 days</option>
                <option value="5-7">5-7 days</option>
                <option value="10-15">10-15 days</option>
              </select>
            </div>
          </div>
          <div className="col-sm-4 p-0 mt-2">
            <label for="charges">Shipping charges</label>
            <div className="">
              <input
                type="number"
                className="form-control"
                id="charges"
                name="shipping_charge"
                value={addProductFormData.shipping_charge}
                onChange={handleaddProductChange}
              />
            </div>
          </div>
          <div className="col-sm-4 p-0 mt-4">
            <div className="section-header mb-2">Refund</div>
            <label for="ship">Refund</label>
            <div className="">
              <select
                className="form-control"
                id="return"
                name="return_days"
                value={refundType}
                onChange={(e) => setRefundType(e.target.value)}
              >
                <option value="" hidden></option>
                <option value="2">no</option>
                <option value="1">yes</option>
              </select>
            </div>
          </div>
          {refundType == 1 && (
            <div className="col-sm-4 p-0 mt-4">
              <div className="section-header mb-2">Return</div>
              <label for="ship">Return in days</label>
              <div className="">
                <select
                  className="form-control"
                  id="return"
                  name="return_days"
                  value={addProductFormData.return_days}
                  onChange={handleaddProductChange}
                >
                  <option value="" hidden></option>
                  <option value="1">1 day</option>
                  <option value="2">2 days</option>
                  <option value="3">3 days</option>
                  <option value="4">4 days</option>
                  <option value="5">5 days</option>
                  <option value="6">6 days</option>
                  <option value="7">7 days</option>
                  <option value="8">8 days</option>
                  <option value="9">9 days</option>
                  <option value="10">10 days</option>
                  <option value="11">11 days</option>
                  <option value="12">12 days</option>
                  <option value="13">13 days</option>
                  <option value="14">14 days</option>
                  <option value="15">15 days</option>
                </select>
              </div>
            </div>
          )}
          <div className="listing-section mt-4 border-top">
            <div className="container-custom">
              <h3>List it for free.</h3>
              <p>
                A <a href="#">final value fee</a> applies when your item sells.
              </p>
              {isUpdateMode && draf ? (
                <button
                  className="btn btn-customs"
                  onClick={(e) => handleUpdateProduct(e, 1)}
                >
                  List it
                </button>
              ) : isUpdateMode ? (
                <button
                  className="btn btn-customs"
                  onClick={(e) => handleUpdateProduct(e, 1)}
                >
                  Update it
                </button>
              ) : (
                <button
                  className="btn btn-customs"
                  onClick={(e) => handleAddProduct(e, 1)}
                >
                  List it
                </button>
              )}
              <button
                className="btn btn-customss"
                onClick={(e) => {
                  draf ? handleUpdateProduct(e, 2) : handleAddProduct(e, 2);
                }}
              >
                Save for later
              </button>
              <button onClick={handleOpenPreview} className="btn btn-customss">
                Preview
              </button>
              <PreviewModal
                open={openPreview}
                onClose={handleClosePreview}
                formData={addProductFormData}
                images={images}
                imagess={updateImage}
              />
            </div>
          </div>
        </section>
        <Modal
          open={openPackage}
          onClose={handleClosePackage}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={{ ...stylele }}>
            <IconButton
              aria-label="close"
              onClick={handleClosePackage}
              sx={{
                position: "absolute",
                right: 8,
                top: 5,
              }}
            >
              <CloseIcon />
            </IconButton>
            <>
              <Typography
                id="modal-description"
                variant="h6"
                component="h4"
                sx={{
                  mt: 2,
                  color: "#333",
                  fontWeight: "bold",
                  letterSpacing: "0.5px",
                  lineHeight: 1.5,
                }}
              >
                You have uploaded more than 4 images. To add more images, please
                add a product first, and then go to the product list to upload
                additional images.
              </Typography>
            </>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

const stylele = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  overflowY: "auto",
  maxHeight: "90vh",
};

const dropzoneStyle = {
  border: "1px dashed #cccccc",
  borderRadius: "5px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

const boxStyle = {
  flex: "1",
  margin: "10px",
  padding: "20px",
  border: "1px dashed #cccccc",
  borderRadius: "15px",
  textAlign: "center",
};

const mediaPreviewStyle = {
  maxWidth: "200px",
  maxHeight: "170px",
  margin: "10px",
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
export default AddProduct;
