import { getProductById, getProducts } from "@/api/products";
import Product from "@/templates/Shop/Product/Product";

export async function getServerSideProps({ params }) {
  const id = params.id;
  const product = await getProductById(id);
  const products = await getProducts();
  const suggestions = products
    .filter(
      (item) =>
        item.subcategory === product.subcategory && item.brand === product.brand
    )
    .slice(0, 4);

  return {
    props: {
      product,
      id,
      suggestions,
    },
  };
}

export default function Page({ product, id, suggestions }) {
  return <Product product={product} id={id} suggestions={suggestions} />;
}
