import api from "../lib/axios";

export const createOrder = (orderData) => {
  return api.post("/orders/create", orderData);
}
export const getOrders = () => {
  return api.get("/orders/history");
};
