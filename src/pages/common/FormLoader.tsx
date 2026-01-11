import { useFormState, type Control, type FieldValues } from 'react-hook-form';

type FormLoaderProps<T extends FieldValues, U extends FieldValues> = {
  control: Control<T, unknown, U>;
};

const FormLoader = <T extends FieldValues, U extends FieldValues>({
  control,
}: FormLoaderProps<T, U>) => {
  const { isLoading } = useFormState({ control });

  return isLoading ? <div className="loader"></div> : null;
};

export default FormLoader;
