export type CheckoutFormType = { paymentMethod: string; deliveryIn: number };

export type DeliveryAddressFormType = {
  streetAddress: string;
  landmark: string;
  city: string;
  state: string;
};

export type FoodDeliveryMasterFormType = {
  orderNo: string;
  customerName: string;
  mobile: string;
  email: string;
};

export type FoodDeliveryFormType = {
  address: DeliveryAddressFormType;
} & FoodDeliveryMasterFormType &
  CheckoutFormType;

export type SelectOptionType =
  | string
  | { value: string; text: string }
  | { value: number; text: string };
