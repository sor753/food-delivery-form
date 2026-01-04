import { useForm, type FieldErrors } from 'react-hook-form';
import TextField from './controls/TextField';
import getRenderCount from './utils/getRenderCount';
import Select from './controls/Select';
import type { SelectOptionType } from './types';

type FoodDeliveryFormType = {
  orderNo: string;
  customerName: string;
  mobile: string;
  email: string;
  paymentMethod: string;
  deliveryIn: number;
};
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

const RenderCount = getRenderCount();

const FoodDeliveryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodDeliveryFormType>({
    mode: 'all',
    delayError: 300,
    // reValidateMode: 'onChange',
    defaultValues: {
      orderNo: new Date().valueOf().toString(),
      customerName: '',
      mobile: '',
      email: '',
      paymentMethod: '',
      deliveryIn: 0,
    },
  });

  const onSubmit = (formData: FoodDeliveryFormType) => {
    console.log('Form data:', formData);
  };

  const onError = (errors: FieldErrors<FoodDeliveryFormType>) => {
    console.log('Form errors:', errors);
  };

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <RenderCount />
      <div className="row mb-2">
        <div className="col">
          <TextField
            label="#Order No"
            disabled
            {...register('orderNo')}
            error={errors.orderNo}
          />
        </div>
        <div className="col">
          <TextField
            label="Mobile"
            {...register('mobile', {
              minLength: {
                value: 10,
                message: 'Mobile number must be at least 10 digits',
              },
              maxLength: {
                value: 10,
                message: 'Mobile number must be at most 10 digits',
              },
              required: 'Mobile number is required',
            })}
            error={errors.mobile}
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <TextField
            label="Customer Name"
            {...register('customerName', {
              required: 'Customer Name is required',
            })}
            error={errors.customerName}
          />
        </div>
        <div className="col">
          <TextField
            label="Email"
            type="email"
            {...register('email', {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
              validate: {
                notFake: (value) => {
                  return (
                    value != 'email@gmail.com' ||
                    'Pasrticualr email is not allowed'
                  );
                },
                notFromBlackListedDomain: (value) => {
                  return (
                    (!value.endsWith('xyz.com') &&
                      !value.endsWith('example.com')) ||
                    'This domain is not allowed'
                  );
                },
              },
            })}
            error={errors.email}
          />
        </div>
      </div>
      <div>list of ordered food item</div>
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
      <div>check out details</div>
      <div>delivery address</div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FoodDeliveryForm;
