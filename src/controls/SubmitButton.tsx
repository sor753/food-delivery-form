import { useFormState, type Control, type FieldValues } from 'react-hook-form';
// import getRenderCount from '../utils/getRenderCount';

type SubmitButtonProps<T extends FieldValues> =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    control?: Control<T, unknown, T>;
  };

// const RenderCount = getRenderCount();

const SubmitButton = <T extends FieldValues>({
  className = 'btn-light',
  value,
  control = undefined,
  ...props
}: SubmitButtonProps<T>) => {
  const { isSubmitting } = useFormState({ control });

  return (
    <>
      {/* <RenderCount /> */}
      <button
        type="submit"
        className={`btn ${className}`}
        disabled={isSubmitting}
        {...props}
      >
        {isSubmitting === undefined || isSubmitting === false ? (
          value
        ) : (
          <>
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
            <span role="status" className="ms-1">
              Submit
            </span>
          </>
        )}
      </button>
    </>
  );
};

export default SubmitButton;
