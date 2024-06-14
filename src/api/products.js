import { BASE_URL } from "@/url";

export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  const data = await response.json();
  return data;
}

export async function getProductsByCatSubCat({ category, subcategory }) {
  const apiUrl = subcategory
    ? `${BASE_URL}/products?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}`
    : `${BASE_URL}/products?category=${encodeURIComponent(category)}`;

  const response = await fetch(`${apiUrl}`);
  const data = await response.json();
  return data;
}

export async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  const data = await response.json();
  return data;
}
