import { useFormContext } from 'react-hook-form';
import Select from '../../../controls/Select';
import type { CheckoutFormType, SelectOptionType } from '../../../types';

// const paymentOptions: SelectOptionType[] = ['slect', 'online', 'COD'];
const paymentOptions: SelectOptionType[] = [
  { value: '', text: 'Select' },
  { value: 'online', text: 'Paid Online' },
  { value: 'COD', text: 'Cash on Delivery' },
];
const deliveryOptions: SelectOptionType[] = [
  { value: 0, text: 'Select' },
  { value: 30, text: 'Half an Hour' },
  { value: 60, text: '1 Hour' },
  { value: 120, text: '2 Hours' },
  { value: 180, text: '3 Hours' },
];

const CheckoutForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormType>();

  return (
    <>
      <div className="text-start fw-bold mt-4 mb-2">Checkout Details</div>
      <div className="row mb-2">
        <div className="col">
          <Select
            label="Payment Method"
            options={paymentOptions}
            {...register('paymentMethod', {
              required: 'Payment Method is required',
            })}
            error={errors.paymentMethod}
          />
        </div>
        <div className="col">
          <Select
            label="Delivery Within"
            options={deliveryOptions}
            {...register('deliveryIn', {
              required: 'Delivery time is required',
            })}
            error={errors.deliveryIn}
          />
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
