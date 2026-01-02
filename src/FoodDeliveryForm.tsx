import { useForm, type FieldErrors } from 'react-hook-form';

type FoodDeliveryFormType = {
  orderNo: string;
  customerName: string;
  mobile: string;
  email: string;
};

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
      <div className="row mb-2">
        <div className="col">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="#Order No"
              {...register('orderNo', {
                required: 'Order No is required',
              })}
            />
            <label htmlFor="">#Order No</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Mobile"
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
            />
            <label htmlFor="">Mobile</label>
            {errors.mobile && (
              <div className="error-feedback">{errors.mobile?.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Customer Name"
              {...register('customerName', {
                required: 'Customer Name is required',
              })}
            />
            <label htmlFor="">Customer Name</label>
            {errors.customerName && (
              <div className="error-feedback">
                {errors.customerName?.message}
              </div>
            )}
          </div>
        </div>
        <div className="col">
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
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
            />
            <label htmlFor="">Email</label>
            {errors.email && (
              <div className="error-feedback">{errors.email?.message}</div>
            )}
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FoodDeliveryForm;
