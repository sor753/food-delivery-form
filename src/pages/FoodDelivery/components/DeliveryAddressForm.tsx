import { useFormContext, useFormState } from 'react-hook-form';
import TextField from '../../../controls/TextField';
import type { DeliveryAddressFormType } from '../../../types';
// import getRenderCount from '../../../utils/getRenderCount';

// const RenderCount = getRenderCount();

const DeliveryAddressForm = () => {
  // const { register, getFieldState } = useFormContext<{
  const { register } = useFormContext<{
    address: DeliveryAddressFormType;
  }>();

  const { errors } = useFormState<{ address: DeliveryAddressFormType }>({
    name: 'address',
  });

  return (
    <>
      {/* <RenderCount /> */}

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
            {...register('address.landmark', {
              required: 'Landmark is required',
            })}
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
      {/* <div>
        {getFieldState('address').isTouched && 'address node is touched'}
      </div> */}
    </>
  );
};

export default DeliveryAddressForm;
