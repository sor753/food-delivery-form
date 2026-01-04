export type CheckoutFormType = { paymentMethod: string; deliveryIn: number };

export type FoodDeliveryFormType = {
  orderNo: string;
  customerName: string;
  mobile: string;
  email: string;
  address: {
    streetAddress: string;
    landmark: string;
    city: string;
    state: string;
  };
} & CheckoutFormType;

export type SelectOptionType =
  | string
  | { value: string; text: string }
  | { value: number; text: string };
