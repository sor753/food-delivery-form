import type { FoodDeliveryFormType, FoodType } from '../types';

export const getFoodItems = async (): Promise<FoodType[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { foodId: 1, name: 'Chicken Tender', price: 8.99 },
    { foodId: 2, name: 'Sweet Potato Fries', price: 4.99 },
    { foodId: 3, name: 'Caesar Salad', price: 6.49 },
    { foodId: 4, name: 'Lemonade', price: 2.99 },
    { foodId: 5, name: 'Chocolate Cake', price: 5.49 },
  ];
};

const ORDER_KEY = 'order';
export const createOrder = (order: FoodDeliveryFormType) => {
  localStorage.setItem(ORDER_KEY, JSON.stringify(order));
};

export const fetchLastOrder = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const order = localStorage.getItem(ORDER_KEY);
  if (order) {
    return JSON.parse(order) as FoodDeliveryFormType;
  }
  return null;
};
