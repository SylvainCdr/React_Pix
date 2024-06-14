import { getProducts } from "@/api/products";
import Cart from "@/templates/Shop/Cart/Cart";

export async function getServerSideProps() {
  const products = await getProducts();
  const carouselProducts = products
    .sort(() => 0.5 - Math.random())
    .slice(0, 10);

  return {
    props: {
      carouselProducts,
    },
  };
}

export default function Page({ carouselProducts }) {
  return <Cart carouselProducts={carouselProducts} />;
}
