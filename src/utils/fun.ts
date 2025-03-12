import { FormInstance } from 'element-plus';

export const transferToInteger = (
  fval: string | number | undefined
): number | string => {
  const val = fval as string;
  const number =
    val.length === 1 ? val.replace(/[^1-9]/g, '') : val.replace(/\D/g, '');
  if (number) {
    return Number(number);
  } else {
    return '';
  }
};

export const validForm = async (
  formEl: FormInstance | undefined
): Promise<boolean> => {
  // 验证表单
  return new Promise((resolve) => {
    if (!formEl) {
      resolve(false);
      return false;
    } else {
      formEl.validate((valid) => {
        resolve(valid);
      });
    }
  });
};

