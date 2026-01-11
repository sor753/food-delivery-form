import z from 'zod';

export const foodDeliveryFoomSchema = z.object({
  orderId: z.number(),
  orderNo: z.string(),
  customerName: z.string().trim().min(1, 'Customer Name is required'),
  mobile: z
    .string()
    .trim()
    .min(1, 'Mobile number is required')
    .length(10, 'Mobile number must be 10 digits'),
  email: z.email('Invalid email address'),
  gTotal: z.number(),
  placedOn: z.date(),
  paymentMethod: z.enum(['online', 'COD'], 'Payment Method is required'),
  // deliveryIn: z.union(
  //   [z.literal(30), z.literal(60), z.literal(120), z.literal(180)],
  //   'Delivery In is required'
  // ),
  deliveryIn: z.enum(['30', '60', '120', '180'], 'Delivery In is required'),
  // foodItems: [{ foodId: 0, price: 0, quantity: 0, totalPrice: 0 }],
  foodItems: z.array(
    z.object({
      foodId: z.coerce.number().gt(0, 'Please select a food item'),
      price: z.number(),
      quantity: z.coerce.number().gt(0, '< 1.'),
      totalPrice: z.number(),
    })
  ),
  address: z.object({
    streetAddress: z.string().trim().min(1, 'Street Address is required'),
    landmark: z.string().trim().min(1, 'Landmark is required'),
    city: z.string().trim().min(1, 'City is required'),
    state: z.string().trim().min(1, 'State is required'),
  }),
});
