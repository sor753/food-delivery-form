import { useForm, type FieldErrors } from 'react-hook-form';

type FoodDeliveryFormType = {
  customerName: string;
  mobile: string;
};

const FoodDeliveryForm = () => {
  const { register, handleSubmit } = useForm<FoodDeliveryFormType>();

  const onSubmit = (formData: FoodDeliveryFormType) => {
    console.log('Form data:', formData);
  };

  const onError = (errors: FieldErrors<FoodDeliveryFormType>) => {
    console.log('Form errors:', errors);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
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
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Mobile"
          {...register('mobile', { required: 'Mobile is required' })}
        />
        <label htmlFor="">Mobile</label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FoodDeliveryForm;
