import {
  useFieldArray,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import type { OrderedFoodItemType } from '../../../types';
import TextField from '../../../controls/TextField';
import getRenderCount from '../../../utils/getRenderCount';

const RenderCount = getRenderCount();

const OrderedFoodItems = () => {
  // const { register, setValue } = useFormContext<{
  const { register } = useFormContext<{
    foodItems: OrderedFoodItemType[];
  }>();

  const { errors } = useFormState<{ foodItems: OrderedFoodItemType[] }>({
    name: 'foodItems',
  });

  // ユーザーエクスペリエンスとパフォーマンスの向上を目的とした、フィールド配列（動的フォーム）を操作するためのカスタムフック
  const {
    fields,
    // 新しい入力フィールドを追加 ↓↓↓↓↓
    // フィールドの末尾に入力項目を追加してフォーカスを当てる。入力値はこのアクション中に登録さる
    append,
    // フィールドの先頭に入力項目を追加してフォーカスを当てる。入力値はこのアクション中に登録される
    // prepend,
    // 特定の位置に入力を挿入してフォーカスする
    // insert,
    // 新しい入力フィールドを追加 ↑↑↑↑↑
    // 入力の位置を入れ替える
    // swap,
    // 入力を別の位置に移動する
    move,
    // 特定の位置で入力を更新すると、更新されたフィールドはアンマウントされ、再マウントされる
    // この動作を望ましくない場合は、代わりにsetValue APIを使用する
    // update,
    // フィールド配列の値全体を置き換える
    replace,
    // 特定の位置にある入力を削除。インデックスが指定されていない場合はすべてを削除
    remove,
  } = useFieldArray<{ foodItems: OrderedFoodItemType[] }>({
    // フィールド配列の名前。動的な名前はサポートされていない
    name: 'foodItems',
    // validation rules
    rules: {
      required: {
        value: true,
        message: 'no food in the order',
      },
      minLength: {
        value: 2,
        message: 'At least two food items are required',
      },
      validate: {
        noDuplicate: (value, values) => {
          console.log(values);

          const names = value.map((item) => item.name);
          const hasDuplicate = names.some(
            (name, index) => name && names.indexOf(name) !== index
          );
          return hasDuplicate ? 'Duplicate food items are not allowed' : true;
        },
      },
    },
  });

  const onRowAdd = () => {
    // append(
    //   { name: 'Food', quantity: 1 },
    //   {
    //     shouldFocus: true,
    //     focusIndex: 0,
    //     focusName: `foodItems.${fields.length}.quantity`,
    //   }
    // );
    append({ name: '', quantity: 0 });
    // prepend({ name: '', quantity: 0 });
    // insert(2, { name: '', quantity: 0 });
  };

  const onSwapAndMove = () => {
    // swap(0, 2);
    move(0, 2);
  };

  const onUpdateAndReplace = () => {
    // update(0, { name: 'Updated Food', quantity: 5 });
    // setValue('foodItems.0.quantity', 100);
    replace([
      { name: 'Replaced Food 1', quantity: 1 },
      { name: 'Replaced Food 2', quantity: 2 },
    ]);
  };

  const onRowDelete = (index: number) => {
    remove(index);
  };

  const foodItems = useWatch({
    name: ['foodItems'],
  });
  console.log(foodItems);

  return (
    <>
      <RenderCount />
      <table className="table table-borderless table-hover">
        <thead>
          <tr>
            <th>Food</th>
            <th>Quantity</th>
            <th>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={onRowAdd}
              >
                + Add
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, i) => (
            <tr key={field.id}>
              <td>
                <TextField
                  {...register(`foodItems.${i}.name` as const, {
                    required: 'This field is required',
                  })}
                  error={errors.foodItems?.[i]?.name}
                />
              </td>
              <td>
                <TextField
                  type="number"
                  min={0}
                  {...register(`foodItems.${i}.quantity` as const)}
                />
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onRowDelete(i)}
                >
                  DEL
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        {errors.foodItems?.root && (
          <tfoot>
            <tr>
              <td colSpan={3}>
                <span className="error-feedback">
                  {errors.foodItems.root.message}
                </span>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
      {fields.length >= 4 && (
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={onSwapAndMove}
        >
          Swap and Move
        </button>
      )}
      <button
        type="button"
        className="btn btn-sm btn-secondary"
        onClick={onUpdateAndReplace}
      >
        Update and Replace
      </button>
    </>
  );
};

export default OrderedFoodItems;
