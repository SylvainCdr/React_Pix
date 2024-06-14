import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./style.module.scss";


const heroImages = [
  {
    url: "https://i-pro.com/products_and_solutions/sites/default/files/2023-11/2880x720_X-series_0.jpg",
  },
  {
    url: "https://www.zyxel.com/sites/zyxel/files/styles/homepage_hero/public/hero-banner/WBE660S-WIFI-WEB%20BANNERS-FR_Web%20banner_1920x1080.jpg?itok=ZoUfZ0gy",
  },
];

const ShopHeroCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: "linear",
  };

  return (
    <div className={styles.shop_hero_carousel_container}>
      <Slider {...settings}>
        {heroImages.map((image, index) => (
          <div key={index}>
            <img src={image.url} alt="hero" />
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default ShopHeroCarousel;
