import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./dashboard.css";
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { Star } from "@mui/icons-material";
const Dashboard = () => {
  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "400px",
    borderRadius: "15px",
    margin: "20px 0px",
  };

  const slideImages = [
    {
      url: "https://i.ebayimg.com/00/s/NTgxWDE2MDA=/z/su8AAOSwJFRmWI32/$_57.JPG",
      caption: "Slide 1",
    },
    {
      url: "https://i.ebayimg.com/thumbs/images/g/cjsAAOSwJRNlqAa5/s-l1200.webp",
      caption: "Slide 2",
    },
    {
      url: "https://i.ebayimg.com/00/s/MTM4OFgzODEw/z/RdYAAOSwzZtmbBpI/$_57.JPG",
      caption: "Slide 2",
    },
    {
      url: "https://i.ebayimg.com/00/s/NDk2WDE0NDA=/z/hcQAAOSwg2dj6n~7/$_57.JPG",
      caption: "Slide 3",
    },
  ];

  const offers = [
    {
      img: "https://ir.ebaystatic.com/cr/v/c01/01_PopularDestination_Luxury.jpg",
      label: "Luxury",
    },
    {
      img: "https://ir.ebaystatic.com/cr/v/c01/02_PopularDestination_Sneakers.jpg",
      label: "Sneakers",
    },
    {
      img: "https://ir.ebaystatic.com/cr/v/c01/03_PopularDestination_Tire.jpg",
      label: "P&A",
    },
    {
      img: "https://ir.ebaystatic.com/cr/v/c01/ECM_PopularDestination_Reburbished.jpg",
      label: "Refurbished",
    },
    {
      img: "https://ir.ebaystatic.com/cr/v/c01/05_PopularDestination_Cards.jpg",
      label: "Trading cards",
    },
    {
      img: "https://ir.ebaystatic.com/cr/v/c01/07_PopularDestination_Toys.jpg",
      label: "Toys",
    },
  ];

  const cardData = [
    {
      image: "https://i.ebayimg.com/images/g/QxgAAOSwB-plsB5T/s-l960.webp",
      title: "Green Iguana",
      price: "$49.99",
      status: "New",
      rating: 4.5,
    },
    {
      image: "https://i.ebayimg.com/images/g/GrQAAOSwdoVlsB5a/s-l960.webp",
      title: "Red Parrot",
      price: "$59.99",
      status: "Sale",
      rating: 4.0,
    },
    {
      image: "https://i.ebayimg.com/images/g/GrQAAOSwdoVlsB5a/s-l960.webp",
      title: "Red Parrot",
      price: "$59.99",
      status: "Sale",
      rating: 4.0,
    },
    {
      image: "https://i.ebayimg.com/images/g/GrQAAOSwdoVlsB5a/s-l960.webp",
      title: "Red Parrot",
      price: "$59.99",
      status: "Sale",
      rating: 4.0,
    },
    {
      image:
        "https://images.unsplash.com/photo-1466074395296-41cba23ce4f8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
      title: "Red Parrot",
      price: "$59.99",
      status: "Sale",
      rating: 4.0,
    },
    {
      image:
        "https://images.unsplash.com/photo-1466074395296-41cba23ce4f8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
      title: "Red Parrot",
      price: "$59.99",
      status: "Sale",
      rating: 4.0,
    },
    {
      image:
        "https://images.unsplash.com/photo-1466074395296-41cba23ce4f8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
      title: "Red Parrot",
      price: "$59.99",
      status: "Sale",
      rating: 4.0,
    },
    {
      title: "Lizard",
      image: "https://i.ebayimg.com/images/g/GrQAAOSwdoVlsB5a/s-l960.webp",
      date: "8 July",
      price: "$10001",
    },
  ];
  return (
    <>
      <Header />
      <div className="mt-2 mb-5" style={{ padding: "0px 40px" }}>
        <div className=" slide-container">
          <Slide>
            {slideImages.map((slideImage, index) => (
              <div key={index} style={{ borderRadius: "50px" }}>
                <div
                  style={{
                    ...divStyle,
                    backgroundImage: `url(${slideImage.url})`,
                  }}
                ></div>
              </div>
            ))}
          </Slide>
        </div>
        <div className=" mt-4">
          <div className="  custom-card d-flex flex-column flex-md-row align-items-center">
            <div className="offer-details">
              <h5 className="font-weight-bold">
                Feel special this summer with 15% off*
              </h5>
              <div className="row d-flex">
                <p className="mb-1">
                  Save on luxury jewelry, watches and handbags for you.
                </p>
                <p className="mb-0">
                  <a href="#" className="text-decoration-none">
                    *Min. spend $300. Max. discount $100
                  </a>
                </p>
              </div>
            </div>
            <div className="code-badge mt-3 mt-md-0">Code: LUXUS15</div>
          </div>
          <div className=" mt-5">
            <h3>Shop Category</h3>
          </div>
          <div className="container mt-3">
            <div className="row">
              {offers.map((offer, index) => (
                <div
                  key={index}
                  className="col-6 col-md-4 col-lg-2 mb-3 text-center"
                >
                  <div className="offer-details">
                    <img
                      src={offer.img}
                      width="160"
                      className="rounded-circle img-fluid"
                      alt={offer.label}
                    />
                    <p className="font-weight-bold mt-2">{offer.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <h3>Daily Deals</h3>
          </div>
          <div className="mt-3">
            <div className="row mx-0 mt-0">
              {cardData.map((card, index) => (
                <div className="col-md-3 mb-4" key={index}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        sx={{ height: 200, objectFit: "contain", p: 2 }}
                        image={card.image}
                        alt={card.title}
                      />
                      <CardContent>
                        <p className="font-weight-bold mt-2">{card.title}</p>
                        <Typography variant="body1" color="text.primary">
                          {card.price}
                        </Typography>
                        <Box display="flex" alignItems="center" mt={2}>
                          <Star color="primary" />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            ml={1}
                          >
                            {card.rating} / 5
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  {/* <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        sx={{ height: 200, objectFit: "contain" }}
                        image={card.image}
                        alt="green iguana"
                      />
                      <CardContent>
                        <p className="font-weight-bold mt-2">{card.title}</p>

                        <Typography variant="body1" color="dark">
                          {card.price}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card> */}
                </div>
              ))}
            </div>
          </div>
          <div className=" mt-5">
            <div className="container-fluid custom-cards">
              <div className="custom-card-text">
                <h2>Growing your collection? We’ve got your back</h2>
                <p>You’re protected by the eBay Money Back Guarantee.</p>
                <button className="custom-card-button">
                  Shop collectibles
                </button>
              </div>
              <div className="custom-card-images">
                <img
                  src="https://ir.ebaystatic.com/cr/v/c01/06_PopularDestination_PreLoved.jpg"
                  alt="Image 1"
                />
                <img
                  src="https://ir.ebaystatic.com/cr/v/c01/03_PopularDestination_Tire.jpg"
                  alt="Image 2"
                />
                <img
                  src="https://ir.ebaystatic.com/cr/v/c01/05_PopularDestination_Cards.jpg"
                  alt="Image 3"
                />
              </div>
            </div>
          </div>
          <div className=" mt-5">
            <h3>Popular Destinations</h3>
          </div>
          <div className="container mt-3">
            <div className="row">
              {offers.map((offer, index) => (
                <div
                  key={index}
                  className="col-6 col-md-4 col-lg-2 mb-3 text-center"
                >
                  <div className="offer-details">
                    <img
                      src={offer.img}
                      width="150"
                      className="rounded-circle img-fluid"
                      alt={offer.label}
                    />
                    <p className="font-weight-bold mt-2">{offer.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <h3>Recommended By Seller</h3>
          </div>
          <div className="mt-3">
            <div className="row mx-0 mt-0">
              {cardData.map((card, index) => (
                <div className="col-md-3 mb-4" key={index}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        sx={{ height: 200, objectFit: "contain", p: 2 }}
                        image={card.image}
                        alt={card.title}
                      />
                      <CardContent>
                        <p className="font-weight-bold mt-2">{card.title}</p>
                        <Typography variant="body1" color="text.primary">
                          {card.price}
                        </Typography>
                        <Box display="flex" alignItems="center" mt={2}>
                          <Star color="primary" />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            ml={1}
                          >
                            {card.rating} / 5
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div className=" mt-5">
            <div className="container-fluid custom-cardss">
              <div className="custom-card-text">
                <h2>Growing your collection? We’ve got your back</h2>
                <p>
                  Save on luxury jewelry, watches and handbags for your summer.
                </p>
                <button className="custom-card-button">Code: LUXUS15</button>
              </div>
              <div className="custom-card-images">
                <img
                  src="https://ir.ebaystatic.com/cr/v/c01/06_PopularDestination_PreLoved.jpg"
                  alt="Image 1"
                />
                <img
                  src="https://ir.ebaystatic.com/cr/v/c01/03_PopularDestination_Tire.jpg"
                  alt="Image 2"
                />
                <img
                  src="https://ir.ebaystatic.com/cr/v/c01/05_PopularDestination_Cards.jpg"
                  alt="Image 3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
