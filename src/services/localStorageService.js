const STORAGE_KEY = "inventory_products";

// Get Products
export const getProducts = () => {
  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
};

// Save Products
export const saveProducts = (products) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(products)
  );
};