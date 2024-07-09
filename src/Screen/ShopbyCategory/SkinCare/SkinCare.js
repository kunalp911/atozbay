import React, { useEffect, useState } from "react";
import Header from "../../../Component/Header/Header";
import Footer from "../../../Component/Footer/Footer";
import Topheader from "../../../ShopCategoryComponent/Topheader";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { Link, useLocation } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "../shopcategory.css";

const cardData = [
  {
    title: "Mobile",
    image: "https://i.ebayimg.com/images/g/QxgAAOSwB-plsB5T/s-l960.webp",
    date: "8 July",
    price: "$1400",
  },
  {
    title: "Mobile",
    image: "https://i.ebayimg.com/images/g/GrQAAOSwdoVlsB5a/s-l960.webp",
    date: "8 July",
    price: "$1000",
  },
  {
    title: "Lizard",
    image:
      "https://images.unsplash.com/photo-1466074395296-41cba23ce4f8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    date: "8 July",
    price: "$1500",
  },
  {
    title: "Lizard",
    image: "https://i.ebayimg.com/images/g/GrQAAOSwdoVlsB5a/s-l960.webp",
    date: "8 July",
    price: "$10001",
  },
  {
    title: "Lizard",
    image: "https://i.ebayimg.com/images/g/QxgAAOSwB-plsB5T/s-l960.webp",
    date: "8 July",
    price: "$1030",
  },
  {
    title: "Lizard",
    image: "https://i.ebayimg.com/images/g/t3gAAOSwoVhmQZ-a/s-l1600.webp",
    date: "8 July",
    price: "$1000",
  },
  {
    title: "Lizard",
    image:
      "https://images.unsplash.com/photo-1466074395296-41cba23ce4f8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    date: "8 July",
    price: "$1500",
  },
  {
    title: "Lizard",
    image: "https://i.ebayimg.com/images/g/GrQAAOSwdoVlsB5a/s-l960.webp",
    date: "8 July",
    price: "$10001",
  },
  {
    title: "Lizard",
    image: "https://i.ebayimg.com/images/g/QxgAAOSwB-plsB5T/s-l960.webp",
    date: "8 July",
    price: "$1030",
  },
  {
    title: "Lizard",
    image: "https://i.ebayimg.com/images/g/t3gAAOSwoVhmQZ-a/s-l1600.webp",
    date: "8 July",
    price: "$1000",
  },
  {
    title: "Lizard",
    image:
      "https://images.unsplash.com/photo-1466074395296-41cba23ce4f8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    date: "8 July",
    price: "$1500",
  },
  {
    title: "Lizard",
    image: "https://i.ebayimg.com/images/g/GrQAAOSwdoVlsB5a/s-l960.webp",
    date: "8 July",
    price: "$10001",
  },
  {
    title: "Lizard",
    image: "https://i.ebayimg.com/images/g/QxgAAOSwB-plsB5T/s-l960.webp",
    date: "8 July",
    price: "$1030",
  },
  {
    title: "Lizard",
    image: "https://i.ebayimg.com/images/g/t3gAAOSwoVhmQZ-a/s-l1600.webp",
    date: "8 July",
    price: "$1000",
  },
  {
    title: "Lizard",
    image: "https://picsum.photos/309/200?image=1039",
    date: "8 July",
    price: "$3000",
  },
  {
    title: "Lizard",
    image: "https://i.ebayimg.com/images/g/sQUAAOSwTkZlny35/s-l1600.webp",
    date: "8 July",
    price: "$3400",
  },
];


const SkinCare = () => {
  const location = useLocation();
  const subId = location?.state?.id;
  const [subCategoriesList, setSubCategoriesList] = React.useState([]);
  const [showAll, setShowAll] = useState(false);
  const displayedCards = showAll ? cardData : cardData.slice(0, 8);
  useEffect(() => {
    getSubCategories();
  }, []);

  const getSubCategories = () => {
    try {
      apiCallNew("get", {}, ApiEndPoints.SubCategoriesList + subId).then(
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

  return (
    <div>
      <Header />
      <div className="" style={{ padding: "0px 40px" }}>
        <Topheader
          mainTitle="Skin Care"
          description="Shop designer watches, Jewelry and bags on atozbay."
        />
        <div className="row my-4">
          <div className="col-md-2">
            <h5>Shop by Brand</h5>
            <ul className="list-group">
              {subCategoriesList?.map((item, index) => {
                return (
                  <li className="list-group-item" key={index}>
                    {item.category_name}
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
              <h3>Daily Deals</h3>
            </div>
            <div className="mt-3">
              <div className="row mx-0 mt-0">
                {displayedCards.map((card, index) => (
                  <div className="col-md-3 mb-4" key={index}>
                    <Card sx={{ maxWidth: 345 }}>
                      <Link to={"/product"} className="text-decoration-none text-dark">
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            sx={{ height: 200 }}
                            image={card.image}
                            alt="green iguana"
                          />
                          <CardContent>
                            <p className="font-weight-bold mt-2">
                              {card.title}
                            </p>

                            <Typography variant="body1" color="dark">
                              {card.price}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Link>
                    </Card>
                  </div>
                ))}
              </div>
              {!showAll && (
                <h6
                  onClick={() => setShowAll(true)}
                  style={{ cursor: "pointer", float: "right" }}
                >
                  See More...
                </h6>
              )}
              {showAll && (
                <h6
                  onClick={() => setShowAll(false)}
                  style={{ cursor: "pointer", float: "right" }}
                >
                  Less...
                </h6>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SkinCare;
