import React from 'react'
import Header from '../../../Component/Header/Header'
import Footer from '../../../Component/Footer/Footer'
import Topheader from '../../../ShopCategoryComponent/Topheader' 
import '../shopcategory.css'

const BabyChildCare = () => {
    
  return (
    <div> 
      <Header />
      <div className="" style={{ padding: "0px 40px" }}>
        <Topheader mainTitle="Baby & Child Care" description="Shop designer watches, Jewelry and bags on atozbay." />
        <div className="row my-4">
          <div className="col-md-2">
            <h5>Shop by Brand</h5>
            <ul className="list-group">
              <li className="list-group-item">Audemars Piguet</li>
              <li className="list-group-item">Balenciaga</li>
              <li className="list-group-item">Breitling</li>
              <li className="list-group-item">Burberry</li>
              <li className="list-group-item">Bvlgari</li>
              <li className="list-group-item">Cartier</li>
              <li className="list-group-item">Celine</li> 
              <li className="list-group-item">Gucci</li>
              <li className="list-group-item">HERMÈS</li>
            </ul>
          </div>
          <div className="col-md-10">
            <img
              src="https://i.ebayimg.com/00/s/NTgxWDE2MDA=/z/su8AAOSwJFRmWI32/$_57.JPG"
              alt="Luxury summer special"
              className="custom-image"
            />
          </div>
        </div>
        </div> 
      <Footer />
    </div>
  )
}

export default BabyChildCare