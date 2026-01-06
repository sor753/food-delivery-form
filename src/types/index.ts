export type CheckoutFormType = { paymentMethod: string; deliveryIn: number };

export type DeliveryAddressFormType = {
  streetAddress: string;
  landmark: string;
  city: string;
  state: string;
};

export type MasterFoodDeliveryFormType = {
  orderNo: string;
  customerName: string;
  mobile: string;
  email: string;
};

export type OrderedFoodItemType = { name: string; quantity: number };

export type FoodDeliveryFormType = {
  address: DeliveryAddressFormType;
  foodItems: OrderedFoodItemType[];
} & MasterFoodDeliveryFormType &
  CheckoutFormType;

export type SelectOptionType =
  | string
  | { value: string; text: string }
  | { value: number; text: string };
