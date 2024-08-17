import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../../Component/Header/Header";
import Topheader from "../../../ShopCategoryComponent/Topheader";
import Footer from "../../../Component/Footer/Footer";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { apiCallNew } from "../../../Network_Call/apiservices";
import logos from "../../../Assets/image/bay.png";
import catimg from "../../../Assets/image/flow.jpg";
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
import { doller } from "../../../Component/ReuseFormat/Doller";

const Category = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const categoryName = location?.state?.category?.category_name;
  const subfiltcategory = location?.state?.category;

  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const [shopProductLists, setShopProductLists] = useState([]);
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [cateId, setCateId] = useState(id);

  const itemsPerPage = 20;

  useEffect(() => {
    getSubCategories();
  }, [id]);

  useEffect(() => {
    getShopProductList(page);
  }, [page, cateId]);

  useEffect(() => {
    if (subfiltcategory) {
      setTitle(subfiltcategory.category_name || "");
      setCateId(subfiltcategory.id);
      setPage(1);
    }
  }, [subfiltcategory]);

  const getSubCategories = async () => {
    try {
      const response = await apiCallNew(
        "get",
        {},
        `${ApiEndPoints.SubCategoriesList}${id}`
      );
      if (response.success) {
        setSubCategoriesList(response.result);
        getShopProductList(page, response?.result[0]?.id);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const getShopProductList = async (page, ids) => {
    let categoryId;
    if (cateId && ids) {
      categoryId = ids;
    } else if (cateId) {
      categoryId = cateId;
    } else if (ids) {
      categoryId = ids;
    }
    const payload = {
      page: page - 1,
      category_id: categoryId,
    };
    try {
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.ShopProductList
      );
      if (response.success) {
        setShopProductLists(response.result);
        setCount(response.product_count);
      }
    } catch (error) {
      console.error("Error fetching shop products:", error);
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const currentItems = shopProductLists;

  return (
    <div>
      <Header />
      <div style={{ padding: "0px 40px" }}>
        <Topheader mainTitle={categoryName} />
        <div className="row my-4">
          <div className="col-md-2">
            <h5 style={{ fontSize: "16px" }}>Shop by Brand</h5>
            <ul className="list-group">
              {subCategoriesList?.map((item, index) => (
                <li
                  className={
                    item.id == cateId
                      ? "list-group-item bg-dark text-white"
                      : "list-group-item"
                  }
                  key={index}
                  onClick={() => {
                    setTitle(item.category_name || "");
                    setCateId(item.id);
                    setPage(1);
                  }}
                >
                  {formatCapitalize(item.category_name)}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-10">
            <img
              src={catimg}
              alt="Luxury summer special"
              className="custom-image"
            />
            <div className="mt-5">
              <h3 style={{ fontSize: "24px" }}>{title}</h3>
            </div>
            <div className="mt-3">
              <div className="row mx-0 mt-0">
                {currentItems?.length > 0 ? (
                  currentItems?.map((card, index) => (
                    <div className="col-md-3 mb-4" key={index}>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea
                          onClick={() => navigate(`/product/${card.slug}`)}
                        >
                          <CardMedia
                            component="img"
                            sx={{ height: 200, objectFit: "contain", p: 2 }}
                            image={
                              card.product_images[0]?.product_image
                                ? card.product_images[0].product_image
                                : logos
                            }
                            alt={card?.title}
                          />
                          <CardContent>
                            <p className="titledescrip font-weight-bold mt-2">
                              {formatCapitalize(card.name)}
                            </p>
                            <p className="descriptionsa">{card?.description}</p>
                            <Typography
                              variant="body1"
                              style={{ marginTop: "-10px" }}
                            >
                              {doller.Aud} {card?.product_prices?.price}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </div>
                  ))
                ) : (
                  <div className="text-center mt-5 text-muted">
                    {/* No products available. */}
                  </div>
                )}
              </div>
              {count > itemsPerPage && (
                <Box display="flex" justifyContent="center" mt={4}>
                  <Pagination
                    count={Math.ceil(count / itemsPerPage)}
                    page={page}
                    onChange={handleChange}
                    showFirstButton
                    showLastButton
                  />
                </Box>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Category;
