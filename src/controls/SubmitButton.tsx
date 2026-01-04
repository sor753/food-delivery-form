type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isSubmitting?: boolean;
};

const SubmitButton = ({
  isSubmitting = undefined,
  className = 'btn-light',
  value,
  ...props
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={`btn ${className}`}
      disabled={isSubmitting == undefined ? false : isSubmitting}
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
  );
};

export default SubmitButton;
