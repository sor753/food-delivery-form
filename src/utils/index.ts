export const roundTo2DecimalPoint = (value: number): number =>
  // Number.EPSILON は静的データプロパティで、 1 と 1 より大きな最小の浮動小数点数の差を表す
  // Number.EPSILON は JavaScriptの浮動小数点誤差を補正するための非常に小さい数
  // JavaScriptは 浮動小数点計算が正確でない場合があるため、Number.EPSILON を足すことで、この問題を回避する
  Math.round((value + Number.EPSILON) * 100) / 100;
