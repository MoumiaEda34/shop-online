import axios from 'axios';

const baseURL = 'https://dummyjson.com';

export const getCategories = () => {
  return axios.get(`${baseURL}/products/categories`);
};

export const getProductsByCategory = (category) => {
  return axios.get(`${baseURL}/products/category/${category}`);
};
