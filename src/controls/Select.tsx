import { forwardRef, type ForwardedRef } from 'react';
import type { FieldError } from 'react-hook-form';
import type { SelectOptionType } from '../types';

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOptionType[];
  label?: string;
  error?: FieldError;
};

const Select = forwardRef(
  (
    { className = '', label, options, error, ...props }: SelectFieldProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <div className={label ? 'form-floating' : ''}>
        <select className={`form-select ${className}`} ref={ref} {...props}>
          {options.map((option, i) => (
            <option
              key={i}
              value={typeof option == 'string' ? option : option.value}
            >
              {typeof option == 'string' ? option : option.text}
            </option>
          ))}
        </select>
        {label && <label htmlFor="">{label}</label>}
        {error && <div className="error-feedback">{error.message}</div>}
      </div>
    );
  }
);

export default Select;
