// 正常登录
import { FormRules } from 'element-plus';
export const formRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
  ],
};

// 找回密码
export const forgetRules: FormRules = {
  account: [
    {
      required: true,
      validator: (rule: unknown, value: string, callback: any) => {
        if (!value) {
          callback(new Error('请输入用户名'));
        }
        //  else if (
        //   !/^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/.test(
        //     value
        //   )
        // ) {
        //   callback(new Error('请输入正确的用户名'));
        // }
        else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
  code: [
    {
      required: true,
      message: '请输入邮箱验证码',
      trigger: 'blur',
    },
  ],
  newPassword: [
    {
      required: true,
      validator: (rule: unknown, value: string, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else if (value.length < 6) {
          callback(new Error('请输入长度大于6位的新密码'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
};
