import { forwardRef, type ForwardedRef } from 'react';
import type { FieldError } from 'react-hook-form';

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: FieldError;
};

const TextField = forwardRef(
  (
    { type = 'text', className = '', label, error, ...props }: TextFieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="form-floating mb-3">
        <input
          type={type}
          className={`form-control ${className}`}
          placeholder={label}
          ref={ref}
          {...props}
        />
        <label htmlFor="">{label}</label>
        {error && <div className="error-feedback">{error.message}</div>}
      </div>
    );
  }
);

export default TextField;
