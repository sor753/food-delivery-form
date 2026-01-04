import { useFormContext } from 'react-hook-form';
import TextField from '../../../controls/TextField';
import type { DeliveryAddressFormType } from '../../../types';

const DeliveryAddressForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ address: DeliveryAddressFormType }>();

  return (
    <>
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
    </>
  );
};

export default DeliveryAddressForm;
