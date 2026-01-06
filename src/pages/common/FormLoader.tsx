import { useFormState, type Control, type FieldValues } from 'react-hook-form';

type FormLoaderProps<T extends FieldValues> = {
  control: Control<T, unknown, T>;
};

const FormLoader = <T extends FieldValues>({ control }: FormLoaderProps<T>) => {
  const { isLoading } = useFormState({ control });

  return isLoading ? <div className="loader"></div> : null;
};

export default FormLoader;
