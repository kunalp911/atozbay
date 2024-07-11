import React, { useEffect, useState } from "react";
import logos from "../../Assets/image/bay.png";
import { Link, useNavigate } from "react-router-dom";
import "./addproduct.css";
import { useDropzone } from "react-dropzone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";

const AddProduct = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [colorList, setColorList] = React.useState([]);
  const [isPhoto, setIsPhoto] = useState(true);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,video/*",
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        file.preview = URL.createObjectURL(file);
      });
      if (isPhoto) {
        setImages((prevImages) => [
          ...prevImages,
          ...acceptedFiles.filter((file) => file.type.startsWith("image/")),
        ]);
      } else {
        setVideos((prevVideos) => [
          ...prevVideos,
          ...acceptedFiles.filter((file) => file.type.startsWith("video/")),
        ]);
      }
    },
  });

  useEffect(() => {
    // Revoke data uris to avoid memory leaks
    return () => {
      images.forEach((file) => URL.revokeObjectURL(file.preview));
      videos.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [images, videos]);

  // const dropzoneStyle = {
  //   border: "2px dashed #cccccc",
  //   padding: "20px",
  //   cursor: "pointer",
  // };

  // const boxStyle = {
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   cursor: "pointer",
  //   padding: "10px",
  // };

  const mediaPreviewStyle = {
    maxWidth: "100px",
    maxHeight: "100px",
    margin: "10px",
  };
  useEffect(() => {
    getColorList();
  }, []);

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

  // const thumbs = files.map((file, index) => (
  //   <div key={file.name} style={{ display: "inline-block", margin: "10px" }}>
  //     {file.type.startsWith("image/") && (
  //       <>
  //         <img
  //           src={file.preview}
  //           alt={file.name}
  //           style={{ width: "200px", height: "auto" }}
  //         />
  //         <i
  //           className="fa fa-times"
  //           style={{
  //             position: "absolute",
  //             backgroundColor: "#000",
  //             color: "white",
  //             borderRadius: "50%",
  //             fontSize: "16px",
  //             padding: "4px",
  //             marginLeft: "-20px",
  //             marginTop: "-10px",
  //             cursor: "pointer",
  //           }}
  //           onClick={() => setFiles(files.filter((_, i) => i !== index))}
  //         ></i>
  //       </>
  //     )}
  //     {file.type.startsWith("video/") && (
  //       <>
  //         <video width="200" controls>
  //           <source src={file.preview} type={file.type} />
  //           Your browser does not support the video tag.
  //         </video>
  //         <i
  //           className="fa fa-times"
  //           style={{
  //             position: "absolute",
  //             backgroundColor: "#000",
  //             color: "white",
  //             borderRadius: "50%",
  //             fontSize: "16px",
  //             padding: "4px",
  //             marginLeft: "-20px",
  //             marginTop: "-10px",
  //             cursor: "pointer",
  //           }}
  //           onClick={() => setFiles(files.filter((_, i) => i !== index))}
  //         ></i>
  //       </>
  //     )}
  //   </div>
  // ));
  return (
    <div>
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
            <h6>Uploaded Images</h6>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {images.map((file, index) => (
                <img
                  key={index}
                  src={file.preview}
                  alt={`img-${index}`}
                  style={mediaPreviewStyle}
                />
              ))}
            </div>
            <h6>Uploaded Videos</h6>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {videos.map((file, index) => (
                <video
                  key={index}
                  src={file.preview}
                  controls 
                  width="200"
                  style={{margin: "10px"}}
                />
              ))}
            </div>
          </div>
        </section>
        {/* <section className="photos-video mt-2">
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
            <h6>Uploaded Images</h6>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {images.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`img-${index}`}
                  style={mediaPreviewStyle}
                />
              ))}
            </div>
            <h6>Uploaded Videos</h6>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {videos.map((file, index) => (
                // <video
                //   key={index}
                //   src={URL.createObjectURL(file)}
                //   controls
                //   style={mediaPreviewStyle}
                // />
                <video width="200" controls>
                  <source src={URL.createObjectURL(file)} />
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>
          </div>
        </section> */}
        {/* <section className="photos-video mt-2">
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
            <h6>Uploaded Images</h6>
            <ul>
              {images.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
            <h6>Uploaded Videos</h6>
            <ul>
              {videos.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        </section> */}
        {/* <section class="photos-video mt-2">
          <h6 style={{ fontWeight: "bold" }}>PHOTOS OR VIDEO</h6>
          <div
            {...getRootProps({ className: "dropzone" })}
            style={dropzoneStyle}
          >
            <input {...getInputProps()} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={boxStyle}>
                <AddPhotoAlternateIcon />
                <p>Add photos</p>
              </div>
              <div style={boxStyle}>
                <VideoLibraryIcon />
                <p>Upload videos</p>
              </div>
            </div>
          </div>
        </section> */}
        {/* <aside style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
          {thumbs}
        </aside> */}
        <section class="details mt-4">
          <div class="listing-section">
            <div class="section-header">TITLE</div>
            <div class="form-group">
              <label for="item-title">Item Title</label>
              <input type="text" class="form-control" id="item-title" />
            </div>
          </div>
          <div class="listing-section">
            <div class="section-header">ITEM CATEGORY</div>
            <div class="form-group">
              <label for="item-category">Category</label>
              <select class="form-control" id="item-category">
                <option>Select Category</option>
                <option>Category</option>
              </select>
            </div>
          </div>
          <div class="listing-section">
            <div class="section-header">ITEM SPECIFICS</div>
            <div className="mt-2 mb-2">
              <h6>Required</h6>
              <p className="text-muted">
                Buyers need these details to find your item.
              </p>
            </div>
            <div class="form-group row">
              <label for="brand" class="col-sm-2 col-form-label">
                Brand
              </label>
              <div class="col-sm-10">
                <select class="form-control" id="brand">
                  <option>nike</option>
                  <option>adidas</option>
                  <option>puma</option>
                  <option>reebok</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="card-name" class="col-sm-2 col-form-label">
                Card Name
              </label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="card-name" />
              </div>
            </div>
            <div class="form-group row">
              <label for="UPC" class="col-sm-2 col-form-label">
                UPC
              </label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="UPC" />
              </div>
            </div>
            <div className="mt-2 mb-2">
              <h6>Additional (optional)</h6>
              <p className="text-muted">
                Buyers also search for these details.
              </p>
            </div>
            <div class="form-group row">
              <label for="age-level" class="col-sm-2 col-form-label">
                Age Level
              </label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="age-level" />
              </div>
            </div>
            <div class="form-group row">
              <label for="features" class="col-sm-2 col-form-label">
                Features
              </label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="features" />
              </div>
            </div>
            <div class="form-group row">
              <label for="brand" class="col-sm-2 col-form-label">
                Color
              </label>
              <div class="col-sm-10">
                <select class="form-control" id="brand">
                  <option value="" hidden></option>
                  {colorList?.map((item, index) => (
                    <option key={index}>{item?.color_name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div class="listing-section">
            <div class="section-header">CONDITION</div>
            <div class="form-group">
              <div class="col-sm-4 p-0">
                <label for="brand">Brand</label>
                <div class="">
                  <select class="form-control" id="brand">
                    <option>nike</option>
                    <option>adidas</option>
                    <option>puma</option>
                    <option>reebok</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-4 p-0">
                <label for="brand">Brand</label>
                <div class="">
                  <select class="form-control" id="brand">
                    <option>nike</option>
                    <option>adidas</option>
                    <option>puma</option>
                    <option>reebok</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-4 p-0">
                <label for="brand">Brand</label>
                <div class="">
                  <select class="form-control" id="brand">
                    <option>nike</option>
                    <option>adidas</option>
                    <option>puma</option>
                    <option>reebok</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="listing-section">
            <div class="section-header">DESCRIPTION</div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                class="form-control"
                id="description"
                rows="5"
              ></textarea>
            </div>
          </div>
          <div class="listing-section">
            <div class="section-header">PRICING</div>
            <div class="form-group">
              <div class="col-sm-4 p-0">
                <label for="brand">Format</label>
                <div class="">
                  <select class="form-control" id="brand">
                    <option>cash</option>
                    <option>online</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-4 p-0">
                <label for="brand">Price</label>
                <div class="">
                  <select class="form-control" id="brand">
                    <option>23123</option>
                    <option>123</option>
                    <option>12313</option>
                    <option>123</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-4 p-0">
                <label for="brand">Quantity</label>
                <div class="">
                  <select class="form-control" id="brand">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="listing-section">
            <div class="section-header">SHIPPING</div>
            <div class="form-group col-sm-6 p-0">
              <label for="shipping-service">Shipping method</label>
              <select class="form-control" id="shipping-service">
                <option>Select Shipping Service</option>
                <option>Shipping Service</option>
              </select>
            </div>
            <div class="form-group">
              <div className="col-sm-12 p-0">
                <label for="shipping-fee">Shipping fee</label>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control col-sm-4"
                    id="shipping-fee"
                  />
                  <input
                    type="text"
                    class="form-control ms-2 col-sm-3"
                    id="shipping-fee"
                  />
                  <input
                    type="text"
                    class="form-control ms-2 col-sm-3"
                    id="shipping-fee"
                  />
                  <input
                    type="text"
                    class="form-control ms-2 col-sm-3"
                    id="shipping-fee"
                  />
                  <input
                    type="text"
                    class="form-control ms-2 col-sm-3"
                    id="shipping-fee"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="listing-section">
            <div class="section-header">Preferences</div>
            <div class="form-group border p-3">
              <div className="d-flex justify-content-between">
                <p>Your settings</p>
                <p>Edit</p>
              </div>
            </div>
          </div>
          <div class="listing-section ">
            <div class="container-custom">
              <h3>List it for free.</h3>
              <p>
                A <a href="#">final value fee</a> applies when your item sells.
              </p>

              <button class="btn btn-customs">List it</button>
              <button class="btn btn-customss">Save for later</button>
              <button class="btn btn-customss">Preview</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const dropzoneStyle = {
  border: "2px dashed #cccccc",
  borderRadius: "5px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

const boxStyle = {
  flex: "1",
  margin: "10px",
  padding: "20px",
  border: "2px dashed #cccccc",
  borderRadius: "5px",
  textAlign: "center",
};

export default AddProduct;
