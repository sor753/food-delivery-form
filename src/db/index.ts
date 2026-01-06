import type { FoodType } from '../types';

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
