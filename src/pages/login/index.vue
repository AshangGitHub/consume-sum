<template>
  <el-container class="login-page">
    <!-- 头部 -->
    <el-header height="60px" class="pl-20 flex items-center w-screen bg-white">
      <img
        style="width: 134px; height: 38px"
        :src="common.logo"
        alt=""
      />
    </el-header>
    <!-- 内容区-背景图 -->
    <div class="wrap w-screen relative z-50" :style="{ backgroundImage: `url(${common.loginBg})`}">
      <div class="flex justify-center">
        <!-- login -->
        <div class="login bg-white flex">
          <!-- login 主图 -->
          <div class="login-main-drawing">
            <img style="width: 620px; height: 580px" :src="common.loginApplication" />
          </div>
          <!-- login 主要功能 -->
          <div
            class="login-item flex-1"
            :style="{ paddingTop: step === 0 ? '100px' : '60px' }"
          >
            <div class="text-center font-medium text-3xl">{{ loginTitle }}</div>
            <div class="login-form">
              <!-- 正常登录 -->
              <div v-show="step === 0" @keydown.enter="onValidFrom">
                <el-form ref="formRef" :model="form" :rules="formRules">
                  <el-form-item prop="username">
                    <el-input
                      v-model="form.username"
                      placeholder="用户名"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      v-model="form.password"
                      type="password"
                      placeholder="密码"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <div class="login-btn flex justify-center">
                      <el-button type="primary" @click="onValidFrom"
                        ><div class="font-medium text-lg">登录</div></el-button
                      >
                    </div>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 页面底部版权文案 -->
      <div
        class="w-full text-center pb-9 font-normal text-xs absolute bottom-0 left-0 text-black"
      >
        {{ copyrightText }}
      </div>
    </div>
  </el-container>
  <v-code-captcha
    :show="captchaVisible"
    @close="onClose"
    @success="onSuccess"
    :imgs="[
      common.verificationCode307,
      common.verificationCode308,
      common.verificationCode309,
      common.verificationCode310,
      common.verificationCode311,
    ]"
  ></v-code-captcha>
</template>

<script lang="ts" setup>
/**
 * @description login 登录布局
 * @property { string } loginMainDrawing login 主图
 * @property { string } loginTitle login 项目名称
 * @property { string } form login 登录表单
 * @property { string } copyrightText 底部版权文案
 * @event { Function } login 登录
 * @event { Function } forget 找回密码
 */
import { common } from '@/model/images/common';
import { reactive, ref, watch } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import { login } from '@/http/login';
import { formRules as _formRules, forgetRules as _forgetRules } from './rules';
import { validForm } from '@/utils/fun';
import { IForgetPwdForm } from '@/http/forgetPassword/type';
import { sendEmailCode } from '@/http/forgetPassword';
import { ArrowLeftBold } from '@element-plus/icons-vue';
import vCodeCaptcha from './components/v-code-captcha.vue';
import { AuthUtil } from '@/utils/auth.util';
import { useRoute, useRouter } from 'vue-router';

const loginTitle = '全域通';
const copyrightText =
  '© Shanghai CyberRoller Communication Co, Ltd. 或其附属公司，保留所有权利。';

interface Props {
  forgetForm: any;
  isLogin: boolean;
}

const porps = withDefaults(defineProps<Props>(), {
  forgetForm: undefined,
  isLogin: true,
});

const step = ref<number>(0);

const captchaVisible = ref(false);

const form = reactive({
  username: '',
  password: '',
});

const onValidFrom = () => {
  if (!form.username || !form.password) {
    ElMessage.error('请填写正确的账号密码');
    return;
  }
  captchaVisible.value = true;
};

const onClose = () => {
  captchaVisible.value = false;
};
const onSuccess = () => {
  onLogin();
};

const route = useRoute();
const router = useRouter();

const onLogin = async () => {
  login(form)
    .then(async (res) => {
      // AuthUtil.logined(res);
      // const query = route.query;
      // const redirect_uri = query.redirect_uri as string || 'http://127.0.0.1:5173/aio-analytics/auth/callback';
      // const client_id = query.client_id as string || '1002';
      // const response_type = query.response_type as string || 'code';
      // AuthUtil.loginChildApplication({
      //   response_type,
      //   client_id,
      //   redirect_uri: encodeURIComponent(redirect_uri),
      // });
      router.replace('/');
    })
    .finally(() => {
      captchaVisible.value = false;
    });
};

watch(
  () => porps.isLogin,
  async (newVal) => {
    if (newVal) {
      step.value = 0;
    }
  }
);

const forgetForm = ref<IForgetPwdForm>({
  account: '',
  code: '',
  newPassword: '',
});
const forgetFormInstance = ref<FormInstance>();
const TIME_COUNT = 60;
const count = ref(0);
const isCodeSend = ref(false);
let timer: number | null = null;
const showCode = ref<boolean>(true);
const formRules = reactive<FormRules>(_formRules);
const forgetRules = reactive<FormRules>(_forgetRules);
const formRef = ref<FormInstance>();
const onStep = (val: number) => {
  step.value = val;
};
const emit = defineEmits(['login']);

(async () => {
  console.log('直接获取用户信息，若存在，直接跳转至home');
  const token = AuthUtil.getToken();
  console.log(typeof token ===  'string', 'tokentokentoken');
  if(token && token !== 'null') {
    router.replace('/');
  }
  console.log(token, 'tokentoken');
})()
</script>

<style lang="scss" scoped>
.wrap {
  height: calc(100vh - 60px);
  min-height: 800px;
  background-size: 100% 100%;
  padding-top: 136px;
  min-width: 1280px;
  box-sizing: border-box;
}
.login {
  width: 1080px;
  border-radius: 20px;
  box-shadow: 2px 10px 40px 6px rgba(19, 48, 85, 0.1);
  height: 580px;
  &-item {
    color: #000000;
    padding: 100px 66px 0 66px;
  }
  &-form {
    margin-top: 48px;
    ::v-deep {
      .el-input__inner {
        height: 46px;
        line-height: 46px;
        border-radius: 4px 4px 4px 4px;
      }
    }
  }
  &-btn {
    margin-top: 68px;
    ::v-deep {
      .el-button--primary {
        width: 330px;
        height: 46px;
        border-radius: 4px 4px 4px 4px;
      }
    }
  }
  &-password {
    font-size: 14px;
    ::v-deep {
      .el-checkbox {
        color: #000000;
        font-size: 14px;
      }
    }
  }
  &-main-drawing {
    border-radius: 20px 0 0 20px;
  }
}
.email {
  ::v-deep {
    .el-input__inner {
      width: 210px;
    }
  }
}
.login-page{
  max-width: 100vw;
  max-height: 100vh;
  overflow-x: hidden;
}
</style>
