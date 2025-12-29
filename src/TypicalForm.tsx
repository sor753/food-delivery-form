import { useState, type ChangeEvent, type SyntheticEvent } from 'react';

type FoodDeliveryFormType = {
  customerName: string;
  mobile: string;
};
type FoodDeliveryFormErrorType = {
  customerName: string;
  mobile: string;
};

const FoodDeliveryForm = () => {
  const [values, setValues] = useState<FoodDeliveryFormType>({
    customerName: '',
    mobile: '',
  });

  const [errors, setErrors] = useState<FoodDeliveryFormErrorType>({
    customerName: '',
    mobile: '',
  });

  const validateFormData = () => {
    const tmpErrors: FoodDeliveryFormErrorType = {
      customerName: '',
      mobile: '',
    };
    if (values.customerName == '') tmpErrors.customerName = 'Customer Name is required';
    if (values.mobile == '') tmpErrors.mobile = 'Mobile is required';
    setErrors(tmpErrors);

    return Object.values(tmpErrors).every((err) => err == '');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFormData()) console.log('Form has errors:', errors);
    else console.log('Form submitted with values:', values);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="form-floating mb-3">
        <input type="text" name="customerName" className="form-control" placeholder="Customer Name" value={values.customerName} onChange={handleInputChange} />
        <label htmlFor="">Customer Name</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" name="mobile" className="form-control" placeholder="Mobile" value={values.mobile} onChange={handleInputChange} />
        <label htmlFor="">Mobile</label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FoodDeliveryForm;
