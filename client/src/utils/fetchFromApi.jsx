import axios from "axios";

const BASE_URL = "https://dummyjson.com";

const normalizeProduct = (product) => ({
  ...product,
  image: product?.thumbnail || product?.images?.[0] || "",
  rating: {
    rate: product?.rating ?? 0,
    count: product?.stock ?? 0,
  },
});

const isLikelyProduct = (item) =>
  item && typeof item === "object" && "id" in item && "price" in item;

export const fetchFromApi = async (url) => {
  const response = await axios.get(`${BASE_URL}/${url}`);
  const data = response.data;

  if (Array.isArray(data)) {
    if (data.length && isLikelyProduct(data[0])) {
      return data.map(normalizeProduct);
    }
    return data;
  }

  if (data?.products && Array.isArray(data.products)) {
    return {
      ...data,
      products: data.products.map(normalizeProduct),
    };
  }

  if (data?.id) {
    return normalizeProduct(data);
  }

  return data;
};
