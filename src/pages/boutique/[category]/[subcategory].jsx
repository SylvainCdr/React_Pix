import { getProductsByCatSubCat } from "@/api/products";
import Products from "@/templates/Shop/Products/Products";

export async function getServerSideProps({ params }) {
  const category = params.category;
  const subcategory = params.subcategory;
  const products = await getProductsByCatSubCat({ category, subcategory });

  return {
    props: {
      products,
      category,
      subcategory,
    },
  };
}

export default function Page({ products, category, subcategory }) {
  return (
    <Products
      products={products}
      category={category}
      subcategory={subcategory}
    />
  );
}
