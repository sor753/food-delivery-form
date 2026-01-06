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
import { createOrder, fetchLastOrder } from '../../db';
import FormLoader from '../common/FormLoader';

const RenderCount = getRenderCount();

const id: number = 1;

const defaultValues: FoodDeliveryFormType = {
  orderId: 0,
  orderNo: new Date().valueOf().toString(),
  customerName: '',
  mobile: '',
  email: '',
  gTotal: 0,
  placedOn: new Date(),
  paymentMethod: '',
  deliveryIn: 0,
  foodItems: [{ foodId: 0, price: 0, quantity: 0, totalPrice: 0 }],
  address: {
    streetAddress: '',
    landmark: '',
    city: '',
    state: '',
  },
};

const FoodDeliveryForm = () => {
  const method = useForm<FoodDeliveryFormType>({
    mode: 'all',
    delayError: 300,
    // reValidateMode: 'onChange',
    // フォーム全体にデフォルト値を設定する。同期と非同期の両方のデフォルト値の割り当てをサポート
    // defaultValueまたはdefaultCheckedを使用して入力のデフォルト値を設定可能（詳細はReactの公式ドキュメントに記載）
    // ただし、フォーム全体に defaultValues を使用することをお勧めします
    defaultValues: async (): Promise<FoodDeliveryFormType> => {
      if (id == 0) return new Promise((resolve) => resolve(defaultValues));
      else {
        const tmpOrder = await fetchLastOrder();
        return new Promise((resolve) => resolve(tmpOrder ?? defaultValues));
      }
    },
    // 変更に反応し、フォームの値を更新する。
    // 外部の状態やサーバーデータによってフォームを更新する必要がある場合に便利
    // useFormにresetOptionsのkeepDefaultValues:trueが設定されていない限り、defaultValuesプロパティを上書きする
    // values: {},
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
    // プログラム的に入力にフォーカスする。入力のrefがフックフォームに登録されていること
    setFocus,
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
    formData.orderId = 1;
    formData.placedOn = new Date();
    createOrder(formData);
    console.log('submitted form data:', formData);
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
    // console.log(getValues('foodItems.0.foodId'));
    // console.log(typeof getValues('foodItems.0.foodId'));
    setFocus('customerName', { shouldSelect: true });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <RenderCount />
      <FormLoader control={control} />
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
