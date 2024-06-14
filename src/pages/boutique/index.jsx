import { getProducts } from "@/api/products";
import Catalogue from "@/templates/Shop/Main/Main";


export async function getServerSideProps(){
  const products =  await getProducts();

  return {
    props: {
      products
    }
  }
}

export default function Page({ products }) {
  return <Catalogue products={products} />
}