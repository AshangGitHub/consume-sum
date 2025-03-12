const namespace = '/auth/oauth2';

/**
 * @description: Login interface parameters
 */
const auth = {
  login: `${namespace}/login`, //login
  logout: `${namespace}/logout`, // 退出
  authorize: `${namespace}/authorize`, // 获取授权
  userInfo: `${namespace}/current-user`, // 获取用户、权限信息
  forgetPassword: `${namespace}/forget-password`, // 忘记密码-修改密码
  sendEmailCode: `${namespace}/send-email-code`, // 忘记密码-发送邮箱验证码
};

export { auth };
