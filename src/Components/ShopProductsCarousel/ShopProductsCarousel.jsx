import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./style.module.scss";
import ProductCard from "../ProductCard/ProductCard";
import useFavorites from "../useFavorites";
import useCart from "../useCart";

const ShopProductsCarousel = ({ carouselProducts }) => {
  const settings = {
    dots: true,
    infinite: true,
    // speed: 600,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
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

  const { addToFavorites, removeFromFavorites, checkFavorite } = useFavorites();
  const { addToCart } = useCart();

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
    <div className={styles["shopCarousel-container"]}>
      {/* integration du composant ProductCard dans le composant ShopProductsCarousel */}

      <Slider {...settings}>
        {carouselProducts.map((carouselProduct, index) => {
          const discountedPrice = calculateDiscount(
            carouselProduct.price,
            discount
          );
          return (
            <div className={styles["product-item"]} key={index}>
              <ProductCard
                product={carouselProduct}
                discountedPrice={discountedPrice}
                userId={userId}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                checkFavorite={checkFavorite}
                addToCart={addToCart}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ShopProductsCarousel;