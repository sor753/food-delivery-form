import { FormProvider, useForm, type FieldErrors } from 'react-hook-form';
import getRenderCount from '../../utils/getRenderCount';
import CheckoutForm from './components/CheckoutForm';
import type { FoodDeliveryFormType } from '../../types';
import DeliveryAddressForm from './components/DeliveryAddressForm';
import FoodDeliveryMaster from './components/FoodDeliveryMaster';
import SubmitButton from '../../controls/SubmitButton';

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
    handleSubmit,
    control,
    // getFieldState,
    // formState: { touchedFields },
  } = method;

  const onSubmit = async (formData: FoodDeliveryFormType) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
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

      <FormProvider {...method}>
        <FoodDeliveryMaster />
        <div>list of ordered food item</div>
        <CheckoutForm />
        <DeliveryAddressForm />
      </FormProvider>
      <SubmitButton control={control} value="Submit" className="btn-primary" />
    </form>
  );
};

export default FoodDeliveryForm;
