import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../../Component/Header/Header";
import Topheader from "../../../ShopCategoryComponent/Topheader";
import Footer from "../../../Component/Footer/Footer";
import ApiEndPoints from "../../../Network_Call/ApiEndPoint";
import { apiCallNew } from "../../../Network_Call/apiservices";

const Category = () => {
  const {id} = useParams();
  const location = useLocation();
  const categoryName = location?.state?.category?.category_name;
  const [subCategoriesList, setSubCategoriesList] = React.useState([]); 

  useEffect(() => {
    if (id) {
      getSubCategories(id);
    }
  }, [id]);

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
  return (
    <div>
      <Header />
      <div className="" style={{ padding: "0px 40px" }}>
        <Topheader
          mainTitle={categoryName} 
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Category;
