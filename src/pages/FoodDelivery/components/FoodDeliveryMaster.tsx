import { useFormContext, useFormState } from 'react-hook-form';
import TextField from '../../../controls/TextField';
import type { FoodDeliveryMasterFormType } from '../../../types';
import getRenderCount from '../../../utils/getRenderCount';

const RenderCount = getRenderCount();

const FoodDeliveryMaster = () => {
  const { register } = useFormContext<FoodDeliveryMasterFormType>();

  const { errors } = useFormState<FoodDeliveryMasterFormType>({
    name: ['orderNo', 'customerName', 'mobile', 'email'],
  });

  return (
    <>
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
    </>
  );
};

export default FoodDeliveryMaster;
