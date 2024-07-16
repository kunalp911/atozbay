import React, { useEffect, useState } from "react";
import logos from "../../Assets/image/bay.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  ListItemText,
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  CircularProgress,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@material-ui/core";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
  },
}));

const AddProduct = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const conditionName = location.state?.condition;
  const fitName = location.state?.fitName;
  const [colorList, setColorList] = React.useState([]);
  const [brandList, setBrandList] = React.useState([]);
  const [isPhoto, setIsPhoto] = useState(true);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);
  const [subCategoriesList, setSubCategoriesList] = React.useState([]);
  const [attributesList, setAttributesList] = useState([]);
  const [attributesValueList, setAttributesValueList] = useState({});
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [open, setOpen] = useState(false);
  const [openss, setOpenss] = useState(false);
  const [opensss, setOpensss] = useState(false);
  const [step, setStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [load, setload] = useState(false);
  const [addProductFormData, setAddProductFormData] = useState({
    name: fitName ? fitName : "",
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
  });

  console.log("videos", video);

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

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,video/*",
    onDrop: (acceptedFiles) => {
      const imageFiles = [];
      const videoFiles = [];

      acceptedFiles.forEach((file) => {
        file.preview = URL.createObjectURL(file);
        if (file.type.startsWith("image/")) {
          imageFiles.push(file);
        } else if (file.type.startsWith("video/")) {
          videoFiles.push(file);
        }
      });

      if (isPhoto) {
        setImages((prevImages) => [...prevImages, ...imageFiles]);
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

  const handleAttributeFocus = (attributeId) => {
    getAttributesValueList(attributeId);
  };

  const getAttributesList = (id) => {
    apiCallNew("get", {}, ApiEndPoints.AttributesByCategory + id)
      .then((response) => {
        if (response.success) {
          setAttributesList(response.result);
          const initialSelectedAttributes = response.result.reduce(
            (acc, item) => {
              acc[item.id] = "";
              return acc;
            },
            {}
          );
          setSelectedAttributes(initialSelectedAttributes);
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

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const attribute_ids = [];
    const attribute_value_ids = [];

    attributesList.forEach((attribute, index) => {
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
      ...addProductFormData,
    };
    console.log("payload", payload);
    setload(true);

    try {
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.ProductAdd
      );
      setload(true);
      if (response.success === true) {
        navigate("/product-list");
        toast.success(response.msg);
        setload(false);
      } else {
        toast.error(response.msg);
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
          <h4>Complete your listing</h4>
        </div>
        <section className="photos-video mt-2">
          <h6 style={{ fontWeight: "bold" }}>PHOTOS OR VIDEO</h6>
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
              <div style={boxStyle} onClick={() => setIsPhoto(false)}>
                <VideoLibraryIcon />
                <p>Upload videos</p>
              </div>
            </div>
          </div>
          <div>
            {/* {images.length > 0 && <h6>Uploaded Images</h6>}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {images.map((file, index) => (
                <>
                  <img
                    key={index}
                    src={file.preview}
                    alt={`img-${index}`}
                    style={mediaPreviewStyle}
                  />
                  <i
                    className="fa fa-times"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setImages(images.filter((_, i) => i !== index))
                    }
                  ></i>
                </>
              ))}
            </div>
            {videos.length > 0 && <h6>Uploaded Videos</h6>}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {videos.slice(0, 1).map((file, index) => (
                <>
                  <video
                    key={index}
                    src={file.preview}
                    controls
                    width="200"
                    style={{ margin: "10px" }}
                  />
                  <i
                    className="fa fa-times"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setVideos(videos.filter((_, i) => i !== index))
                    }
                  ></i>
                </>
              ))} */}
            {images.length > 0 && <h6>Uploaded Images</h6>}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {images.map((file, index) => (
                <>
                  <img
                    key={index}
                    src={file.preview}
                    alt={`img-${index}`}
                    style={mediaPreviewStyle}
                  />
                  <i
                    className="fa fa-times"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      URL.revokeObjectURL(file.preview);
                      setImages(images.filter((_, i) => i !== index));
                    }}
                  ></i>
                </>
              ))}
            </div>

            {video && <h6>Uploaded Video</h6>}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {video && (
                <>
                  <video
                    src={video.preview}
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
              {/* <label for="item-category">Category</label>
              <select className="form-control" id="item-category">
                <option value={""} hidden>
                  select category
                </option>
                {categoriesList?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.category_name}
                  </option>
                ))}
              </select> */}
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
                    onFocus={() => handleAttributeFocus(item.id)}
                  >
                    <option value="" hidden>
                      Select {item.attribute_name}
                    </option>
                    {attributesValueList[item.id]?.map((attrValue, idx) => (
                      <option key={idx} value={attrValue.id}>
                        {attrValue.attr_val_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
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

            {/* <div className="form-group row">
              <label for="card-name" className="col-sm-2 col-form-label">
                Card Name
              </label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="card-name" />
              </div>
            </div>
            <div className="form-group row">
              <label for="UPC" className="col-sm-2 col-form-label">
                UPC
              </label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="UPC" />
              </div>
            </div>
            <div className="form-group row">
              <label for="quantity" className="col-sm-2 col-form-label">
                Available quantity
              </label>
              <div className="col-sm-10">
                <select className="form-control" id="quantity">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
            </div>
            <div className="mt-2 mb-2">
              <h6>Additional (optional)</h6>
              <p className="text-muted">
                Buyers also search for these details.
              </p>
            </div>
            <div className="form-group row">
              <label for="age-level" className="col-sm-2 col-form-label">
                Age Level
              </label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="age-level" />
              </div>
            </div>
            <div className="form-group row">
              <label for="features" className="col-sm-2 col-form-label">
                Features
              </label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="features" />
              </div>
            </div>
            <div className="form-group row">
              <label for="brand" className="col-sm-2 col-form-label">
                Color
              </label>
              <div className="col-sm-10">
                <select className="form-control" id="brand">
                  <option value="" hidden>
                    select color
                  </option>
                  {colorList?.map((item, index) => (
                    <option key={index}>{item?.color_name}</option>
                  ))}
                </select>
              </div>
            </div> */}
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
                  <Button onClick={handleClosesss} color="primary">
                    <i className="fa fa-times"></i>
                  </Button>
                </Grid>
                <DialogContent dividers>
                  <form action="javascript:void(0)">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" className="form-control" />
                      Example: Year
                    </div>
                    <div className="form-group">
                      <label>Value</label>
                      <input type="text" className="form-control" />
                      Example: 2017
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="btn btn-closess">Close</button>
                      <button type="submit" className="btn btn-savss ms-3">
                        Save
                      </button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              {/* <div className="col-sm-4 p-0">
                <label for="brand">Condition type</label>
                <div className="">
                  <select className="form-control" id="brand">
                    <option>Graded: Professionally graded</option>
                    <option>
                      Ungraded: Not in original packaging or professionally
                      graded
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-sm-4 p-0">
                <label for="brand">Brand</label>
                <div className="">
                  <select className="form-control" id="brand">
                    <option>nike</option>
                    <option>adidas</option>
                    <option>puma</option>
                    <option>reebok</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-4 p-0">
                <label for="brand">Brand</label>
                <div className="">
                  <select className="form-control" id="brand">
                    <option>nike</option>
                    <option>adidas</option>
                    <option>puma</option>
                    <option>reebok</option>
                  </select>
                </div>
              </div> */}
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
                placeholder="Enter description here..."
                name="description"
                value={addProductFormData.description}
                onChange={handleaddProductChange}
              ></textarea>
            </div>
          </div>
          <div className="listing-section">
            <div className="section-header">PRICING</div>
            <div className="form-group">
              <div className="col-sm-4 p-0">
                <label for="brand">Format</label>
                <div className="">
                  <select
                    className="form-control"
                    id="brand"
                    name="price_format"
                    value={addProductFormData.price_format}
                    onChange={handleaddProductChange}
                  >
                    <option value="" hidden></option>
                    <option value="1">cash</option>
                    <option value="2">online</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-4 p-0">
                <label for="brand">Price</label>
                <div className="">
                  <input
                    type="text"
                    className="form-control"
                    id="brand"
                    name="price"
                    value={addProductFormData.price}
                    onChange={handleaddProductChange}
                  />
                </div>
              </div>
              <div className="col-sm-4 p-0">
                <label for="brand">Available Quantity</label>
                <div className="">
                  <input
                    type="text"
                    className="form-control"
                    id="brand"
                    name="available_quantity"
                    value={addProductFormData.available_quantity}
                    onChange={handleaddProductChange}
                  />
                </div>
              </div>
              <div className="col-sm-4 p-0">
                <label for="brand">Action duration</label>
                <div className="">
                  <select
                    className="form-control"
                    id="brand"
                    name="auction_duration"
                    value={addProductFormData.auction_duration}
                    onChange={handleaddProductChange}
                  >
                    <option value="3">3 days</option>
                    <option value="5">5 days</option>
                    <option value="7">7 days</option>
                    <option value="10">10 days</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-4 p-0">
                <label for="brand">Starting bid</label>
                <div className="">
                  <input
                    type="text"
                    className="form-control"
                    id="brand"
                    name="starting_bid"
                    value={addProductFormData.starting_bid}
                    onChange={handleaddProductChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="listing-section">
            <div className="section-header">SHIPPING</div>
            <div className="form-group col-sm-6 p-0">
              <label for="shipping-service">Shipping method</label>
              <select className="form-control" id="shipping-service">
                <option>Select Shipping Service</option>
                <option>Shipping Service</option>
              </select>
            </div>
            <div className="form-group">
              <div className="col-sm-12 p-0">
                <label for="shipping-fee">Shipping fee</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control col-sm-4"
                    id="shipping-fee"
                  />
                  <input
                    type="text"
                    className="form-control ms-2 col-sm-3"
                    id="shipping-fee"
                  />
                  <input
                    type="text"
                    className="form-control ms-2 col-sm-3"
                    id="shipping-fee"
                  />
                  <input
                    type="text"
                    className="form-control ms-2 col-sm-3"
                    id="shipping-fee"
                  />
                  <input
                    type="text"
                    className="form-control ms-2 col-sm-3"
                    id="shipping-fee"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="listing-section">
            <div className="section-header">Preferences</div>
            <div className="form-group border p-3">
              <div className="d-flex justify-content-between">
                <p>Your settings</p>
                <p>Edit</p>
              </div>
            </div>
          </div> */}
          <div className="listing-section ">
            <div className="container-custom">
              <h3>List it for free.</h3>
              <p>
                A <a href="#">final value fee</a> applies when your item sells.
              </p>

              <button className="btn btn-customs" onClick={handleAddProduct}>
                List it
              </button>
              <button className="btn btn-customss">Save for later</button>
              <button className="btn btn-customss">Preview</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
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
  maxWidth: "100px",
  maxHeight: "100px",
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
