import React, { useEffect } from "react";
import logos from "../../Assets/image/bay.png";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoint";
import "./selling.css";

const ListItem = () => {
  const navigate = useNavigate();
  const [productLists, setProductLists] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");

  console.log("first", keyword);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (keyword) {
        getProductList();
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);
  const getProductList = () => {
    const payload = {
      page: 0,
      keyword: keyword,
    };
    try {
      apiCallNew("post", payload, ApiEndPoints.ProductList).then((response) => {
        if (response.success) {
          setProductLists(response.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (name) => {
    navigate("/selling/select-condition", { state: { fitName: name } });
  };
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
          <h4>Start Your Listing</h4>
          <Link to={"/selling/select-condition"}>
            <button className="btn listanbutton">Continue without match</button>
          </Link>
        </div>
        <div className="my-4 d-flex justify-content-center">
          <input
            type="text"
            className="form-control search-items"
            placeholder="Tell us what you're selling"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="btn search-item-button" onClick={getProductList}>
            <SearchIcon />
          </button>
        </div> 
        <div className="search-resultss w-100">
          {keyword &&
            (productLists?.length > 0 ? (
              <ul className="list-groups">
                 {productLists.map((product, index) => (
                  <li key={index} className="list-group-items" onClick={() => handleFilter(product?.name)}>
                    {product.name}{" "}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-products-found">No products found</p>
            ))}
        </div>
        <div className="row mt-5">
          <div className="col-lg-4 col-md-6 mb-4">
            <div
              className="card card-customss card-red"
              onClick={() => navigate("/selling/find-product")}
            >
              <p>
                Type keywords like brand, model, or other details (ISBN, MPN,
                VIN) in the search box above
              </p>
              <img
                className="listimg"
                src="https://i.ebayimg.com/00/s/MTIwWDIwNg==/z/cYwAAOSw5llkQud-/$_57.PNG"
                alt="Example Image 1"
                style={{ marginTop: "39px" }}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card card-customss card-blue">
              <p>Choose from possible matches to help jumpstart your listing</p>
              <img
                className="listimg"
                src="https://i.ebayimg.com/00/s/MTgzWDE3Ng==/z/EIUAAOSwNE9kQud-/$_57.PNG"
                alt="Example Image 2"
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card card-customss card-yellow">
              <p>Preview, make changes, and then list your item</p>
              <img
                className="listimg"
                src="https://i.ebayimg.com/00/s/MjQ2WDI0Ng==/z/SXoAAOSwkGdkQX2Z/$_57.PNG"
                alt="Example Image 3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
