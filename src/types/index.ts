export type CheckoutFormType = { paymentMethod: string; deliveryIn: number };

export type DeliveryAddressFormType = {
  streetAddress: string;
  landmark: string;
  city: string;
  state: string;
};

export type FoodDeliveryMasterType = {
  orderNo: string;
  customerName: string;
  mobile: string;
  email: string;
};

export type FoodDeliveryFormType = {
  address: DeliveryAddressFormType;
} & FoodDeliveryMasterType &
  CheckoutFormType;

export type SelectOptionType =
  | string
  | { value: string; text: string }
  | { value: number; text: string };
