/**
 * @description 校驗表單只能是數字
 * @param rule 
 * @param value 
 * @param callback 
 */
export const validateRequiredNumber = (
  rule: any,
  value: any,
  callback: any
) => {
  const reg =
    /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/;
  if (!reg.test(value)) {
    callback(new Error('這裡只能輸入數字'));
  } else {
    callback();
  }
};
