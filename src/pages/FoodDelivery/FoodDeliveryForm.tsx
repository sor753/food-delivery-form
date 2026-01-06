import {
  FormProvider,
  useForm,
  // useWatch,
  type FieldErrors,
} from 'react-hook-form';
import getRenderCount from '../../utils/getRenderCount';
import CheckoutForm from './components/CheckoutForm';
import type { FoodDeliveryFormType } from '../../types';
import DeliveryAddressForm from './components/DeliveryAddressForm';
import MasterFoodDeliveryForm from './components/MasterFoodDeliveryForm';
import SubmitButton from '../../controls/SubmitButton';
import OrderedFoodItems from './components/OrderedFoodItems';

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
      foodItems: [{ name: '', quantity: 0 }],
      // foodItems: [{ name: 'Chicken Tender' }, { name: 'Sweet Potato Fries' }],
      address: {
        streetAddress: '',
        landmark: '',
        city: '',
        state: '',
      },
    },
  });

  const {
    // フォームの検証が成功した場合にフォーム データを受け取る
    // ((data: Object, e?: Event) => Promise<void>, (errors: Object, e?: Event) => Promise<void>) => Promise<void>
    handleSubmit,
    // React Hook Form にコンポーネントを登録するためのメソッドが含まれたオブジェクト
    // 重要：オブジェクト内のプロパティに直接アクセスしない。これは内部使用のみを目的としてる
    control,
    // 指定された入力を監視し、その値を返す
    // 入力値をレンダリングしたり、条件に応じて何をレンダリングするかを決定するのに使用する
    // 重要：watchはReactに変更があったことを伝えていないため、Reactの冪等性に関するルールに反している
    // 解決策としてuseWatchの使用を検討する
    // watch,
    // 個々のフィールドの状態を返す。ネストされたフィールドの状態を型安全に取得したい場合に便利
    // getFieldState,
    // フォーム全体の状態に関する情報が含まれたオブジェクト
    // これにより、フォームアプリケーションに対するユーザーの操作を追跡することができる
    // formState: { touchedFields, dirtyFields, errors },
    // フォームの値を読み取るための最適化されたヘルパー
    // watchとの違いは、getValuesは再レンダリングをトリガーしたり、入力値の変更をサブスクライブしたりしないこと
    // getValues,
    // 登録済みフィールドの値を動的に設定し、フォームの状態を検証および更新するオプションを利用できる
    // 同時に、不要な再レンダリングを回避する
    // setValue,
  } = method;

  // const watchoutput = watch('paymentMethod');
  // console.log(watchoutput);
  // const watchoutput = useWatch({
  //   control,
  //   name: ['mobile', 'email'],
  //   defaultValue: {
  //     mobile: '966',
  //     email: 'email',
  //   },
  // });
  // console.log(watchoutput);
  // const paymentMethod = useWatch({
  //   control,
  //   name: 'paymentMethod',
  // });
  // console.log(paymentMethod);
  // useEffect(() => {
  //   if (paymentMethod === 'online') alert('please verify the transaction');
  // }, [paymentMethod]);

  const onSubmit = async (formData: FoodDeliveryFormType) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form data:', formData);
  };

  const onError = (errors: FieldErrors<FoodDeliveryFormType>) => {
    console.log('Form errors:', errors);
    // console.log(getValues('mobile'));
  };

  // console.log(getFieldState('email'));

  const onDemo = () => {
    // setValue('email', 'email123', {
    //   shouldValidate: true,
    //   shouldDirty: true,
    //   shouldTouch: true,
    // });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <RenderCount />

      <FormProvider {...method}>
        <MasterFoodDeliveryForm />
        <OrderedFoodItems />
        <CheckoutForm />
        <DeliveryAddressForm />
      </FormProvider>
      <SubmitButton control={control} value="Submit" className="btn-primary" />
      <button className="btn btn-secondary ms-2" onClick={onDemo} type="button">
        Demo
      </button>
    </form>
  );
};

export default FoodDeliveryForm;
