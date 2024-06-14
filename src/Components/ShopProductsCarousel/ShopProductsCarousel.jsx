import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./style.module.scss";
import ProductCard from "../ProductCard/ProductCard";
import useFavorites from "../useFavorites";
import useCart from "../useCart";
import { useGetUser } from "../useGetUser";

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

  const user =  useGetUser();
  const userId =  user?._id;
  console.log("ID de l'utilisateur:", userId);

  // Retrieve discount from user data
  const discount = user ? user?.discount : 0;
  console.log("Discount:", discount);

  const calculateDiscount = (price, discount) => {
    return price - (price * discount) / 100;
  };

  return (
    <div className={styles["shopCarousel-container"]}>
      {/* integration du composant ProductCard dans le composant ShopProductsCarousel */}

      <Slider {...settings}>
        {carouselProducts?.map((carouselProduct, index) => {
          const discountedPrice = calculateDiscount(
            carouselProduct.price,
            discount,
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
