import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Header from "../../../Component/Header/Header";
import Topheader from "../../../ShopCategoryComponent/Topheader";
import Footer from "../../../Component/Footer/Footer";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { apiCallNew } from "../../../Network_Call/apiservices";
import logos from "../../../Assets/image/bay.png";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Pagination,
  Typography,
} from "@mui/material";

const Category = () => {
  const { id } = useParams();
  const location = useLocation();
  const categoryName = location?.state?.category?.category_name;
  const [subCategoriesList, setSubCategoriesList] = React.useState([]);
  const [shopProductLists, setShopProductLists] = React.useState([]);
  const [filteredProductLists, setFilteredProductLists] = useState([]);
  const [title, setTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (id) {
      getSubCategories(id);
      getShopProductList();
    }
  }, [id, currentPage]);

  const getSubCategoriesId = (item) => {
    filterProductListBySubCategory(item?.id);
    setTitle(item?.category_name);
  };
  const getSubCategories = () => {
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
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const getShopProductList = () => {
    const payload = {
      page: currentPage,
    };
    try {
      apiCallNew("post", payload, ApiEndPoints.ShopProductList).then(
        (response) => {
          if (response.success) {
            setShopProductLists(response.result);
            setFilteredProductLists(response.result);
            setTotalPages(Math.ceil(response.result.length / itemsPerPage));
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const filterProductListBySubCategory = (subcategoryId) => {
    const filteredProducts = shopProductLists.filter(
      (product) => product.category_id === subcategoryId
    );
    setFilteredProductLists(filteredProducts);
  };

  return (
    <div>
      <Header />
      <div className="" style={{ padding: "0px 40px" }}>
        <Topheader mainTitle={categoryName} />
        <div className="row my-4">
          <div className="col-md-2">
            <h5>Shop by Brand</h5>
            <ul className="list-group">
              {subCategoriesList?.map((item, index) => {
                return (
                  <li
                    className="list-group-item"
                    key={index}
                    onClick={() => getSubCategoriesId(item)}
                  >
                    {item?.category_name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-md-10">
            <img
              src="https://i.ebayimg.com/00/s/NTgxWDE2MDA=/z/su8AAOSwJFRmWI32/$_57.JPG"
              alt="Luxury summer special"
              className="custom-image"
            />
            <div className="mt-5">
              <h3>{title}</h3>
            </div>
            <div className="mt-3">
              <div className="row mx-0 mt-0">
                {filteredProductLists?.map((card, index) => (
                  <div className="col-md-3 mb-4" key={index}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          sx={{ height: 200, objectFit: "contain", p: 2 }}
                          image={
                            card?.product_images[0]?.product_image
                              ? card?.product_images[0]?.product_image
                              : logos
                          }
                          alt={card.title}
                        />
                        <CardContent>
                          <p className="font-weight-bold mt-2"> {card?.name}</p>
                          <Typography variant="body1" color="text.primary">
                            {card?.condition_description}
                          </Typography>
                          <Typography variant="body1" color="text.primary">
                            ${card?.product_prices?.price}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                ))}
              </div>
              <Box display="flex" justifyContent="center" mt={4}>
                {filteredProductLists?.length > 0 && (
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                  />
                )}
              </Box>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Category;
