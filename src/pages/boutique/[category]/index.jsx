import { getProductsByCatSubCat } from "@/api/products";
import Products from "@/templates/Shop/Products/Products";


export async function getServerSideProps({params}){
  const category = params.category;
  const products = await getProductsByCatSubCat({category});

  return {
    props: {
      products,
      category,

    }
  }
}

export default function Page({products, category}){
  return <Products products={products}category={category} />
}