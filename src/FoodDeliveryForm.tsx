import { FormProvider, useForm, type FieldErrors } from 'react-hook-form';
import TextField from './controls/TextField';
import getRenderCount from './utils/getRenderCount';
import CheckoutForm from './CheckoutForm';
import type { FoodDeliveryFormType } from './types';

const RenderCount = getRenderCount();

const FoodDeliveryForm = () => {
  const method = useForm<FoodDeliveryFormType>({
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
      address: {
        streetAddress: '',
        landmark: '',
        city: '',
        state: '',
      },
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = method;

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
      <FormProvider {...method}>
        <CheckoutForm />
      </FormProvider>
      <div className="text-start fw-bold mt-4 mb-2">Delivery Address</div>
      <div className="row mb-3">
        <div className="col">
          <TextField
            label="Street Address"
            {...register('address.streetAddress', {
              required: 'Street Address is required',
            })}
            error={errors.address?.streetAddress}
          />
        </div>
        <div className="col">
          <TextField
            label="City"
            {...register('address.city', {
              required: 'City is required',
            })}
            error={errors.address?.city}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <TextField
            label="Landmark"
            {...register('address.landmark')}
            error={errors.address?.landmark}
          />
        </div>
        <div className="col">
          <TextField
            label="State"
            {...register('address.state', {
              required: 'State is required',
            })}
            error={errors.address?.state}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FoodDeliveryForm;
