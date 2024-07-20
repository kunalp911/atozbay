import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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
import { formatCapitalize } from "../../../Component/ReuseFormat/ReuseFormat";

const Category = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const categoryName = location?.state?.category?.category_name;
  const subfiltcategory = location?.state?.category;

  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const [shopProductLists, setShopProductLists] = useState([]);
  const [filteredProductLists, setFilteredProductLists] = useState([]);
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const itemsPerPage = 20;

  useEffect(() => {
    if (id) {
      getSubCategories(id);
      getShopProductList();
    }
  }, [id, page]);

  useEffect(() => {
    if (subfiltcategory) {
      getSubCategoriesId(subfiltcategory);
    }
  }, [subfiltcategory, shopProductLists]);

  const getSubCategoriesId = (item) => {
    if (item?.id) {
      filterProductListBySubCategory(item.id);
      setTitle(item.category_name || "");
    }
  };

  const getSubCategories = async () => {
    try {
      const response = await apiCallNew(
        "get",
        {},
        `${ApiEndPoints.SubCategoriesList}${id}`
      );
      if (response.success) {
        setSubCategoriesList(response.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const getShopProductList = async () => {
    const payload = { page: page - 1 };
    try {
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.ShopProductList
      );
      if (response.success) {
        setShopProductLists(response?.result);
        setCount(response?.product_count);
        if (subfiltcategory) {
          filterProductListBySubCategory(subfiltcategory?.id); // Ensure filtering is done here after setting product lists
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filterProductListBySubCategory = (subcategoryId) => {
    if (subcategoryId) {
      const filteredProducts = shopProductLists?.filter(
        (product) => product?.category_id === subcategoryId
      );
      setFilteredProductLists(filteredProducts);
    }
  };

  const currentItems = filteredProductLists?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // const { id } = useParams();
  // const navigate = useNavigate();
  // const location = useLocation();
  // const categoryName = location?.state?.category?.category_name;
  // const subfiltcategory = location?.state?.category;
  // const [subCategoriesList, setSubCategoriesList] = React.useState([]);
  // const [shopProductLists, setShopProductLists] = React.useState([]);
  // const [filteredProductLists, setFilteredProductLists] = useState([]);
  // const [title, setTitle] = useState("");
  // const [page, setPage] = useState(1);
  // const [count, setCount] = useState(0);
  // const pages = page - 1;
  // const itemsPerPage = 20;

  // console.log("idid", subfiltcategory);
  // useEffect(() => {
  //   if (id) {
  //     getSubCategories(id);
  //     getShopProductList();
  //   }
  // }, [id, page]);

  // useEffect(() => {
  //   if (subfiltcategory) {
  //     getSubCategoriesId(subfiltcategory?.id);
  //     filterProductListBySubCategory(subfiltcategory?.id);
  //   }
  // }, [subfiltcategory]);

  // const getSubCategoriesId = (item) => {
  //   filterProductListBySubCategory(item?.id);
  //   setTitle(item?.category_name);
  // };
  // const getSubCategories = () => {
  //   try {
  //     apiCallNew("get", {}, ApiEndPoints.SubCategoriesList + id).then(
  //       (response) => {
  //         if (response.success) {
  //           setSubCategoriesList(response.result);
  //         }
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleChange = (event, value) => {
  //   setPage(value);
  //   getShopProductList();
  // };
  // const currentItems = filteredProductLists?.slice(page - 1);

  // const getShopProductList = () => {
  //   const payload = {
  //     page: pages,
  //   };
  //   try {
  //     apiCallNew("post", payload, ApiEndPoints.ShopProductList).then(
  //       (response) => {
  //         if (response.success) {
  //           setShopProductLists(response.result);
  //           // setFilteredProductLists(response.result);
  //           setCount(response.product_count);
  //         }
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const filterProductListBySubCategory = (subcategoryId) => {
  //   const filteredProducts = shopProductLists?.filter(
  //     (product) => product.category_id === subcategoryId
  //   );
  //   setFilteredProductLists(filteredProducts);
  // };

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
                    {formatCapitalize(item?.category_name)}
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
                {currentItems?.map((card, index) => (
                  <div className="col-md-3 mb-4" key={index}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea
                        onClick={() => navigate(`/product/${card?.id}`)}
                      >
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
                          <p className="font-weight-bold mt-2">
                            {" "}
                            {formatCapitalize(card?.name)}
                          </p>
                          <p className="descriptionsa">
                            {card?.condition_description}
                          </p>
                          <Typography
                            variant="body1"
                            style={{ marginTop: "-10px" }}
                          >
                            ${card?.product_prices?.price}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                ))}
              </div>
              <Box display="flex" justifyContent="center" mt={4}>
                {currentItems?.length > 10 && (
                  <Pagination
                    count={Math.ceil(count / itemsPerPage)}
                    page={page}
                    onChange={handleChange}
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
