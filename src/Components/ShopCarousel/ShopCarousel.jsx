import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";

const ShopCarousel = ({ products }) => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Retrieve user data from local storage
  const userDataString = localStorage.getItem("user");

  // Parse the user data string to a JSON object
  const userData = JSON.parse(userDataString) ? JSON.parse(userDataString) : "";
  const userId = userData ? userData._id : null;
  console.log("ID de l'utilisateur:", userId);

  // Retrieve discount from user data
  const discount = userData ? userData.discount : 0;
  console.log("Discount:", discount);

  const calculateDiscount = (price, discount) => {
    return price - (price * discount) / 100;
  };

  return (
    <div className="shopCarousel-container">
      <Slider {...settings}>
        {products.map((product, index) => {
          const discountedPrice = calculateDiscount(product.price, discount);
          return (
            <div key={index} className="product-item">
              <img src={product.image} alt={product.name} />
              <Link to={`./produit/${product._id}`}>
                <h3>{product.name}</h3>
              </Link>
              <div className="price">
                {userId ? (
                  <p className="prices">
                    <span className="original-price">
                      {product.price.toFixed(2)} €
                    </span>
                    <span className="discounted-price">
                      {discountedPrice.toFixed(2)} € <span> HT</span>
                    </span>
                  </p>
                ) : (
                  <p className="price">
                    {product.price.toFixed(2)} € <span>HT</span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ShopCarousel;
