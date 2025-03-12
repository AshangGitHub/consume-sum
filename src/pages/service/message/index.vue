<template>
  <h1 class="mb-4 text-lg font-black">短信配置</h1>
  <div
    class="bg-white dark:bg-slate-800 rounded-lg p-6 ring-slate-900/5 shadow-sm overflow-x-scroll"
  >
    <div style="width: 800px">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="140px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="服务提供商" prop="disabled">
          <el-radio-group v-model="ruleForm.disabled" disabled>
            <el-radio :label="false">阿里云</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="AccessKey" prop="AccessKey">
          <el-input v-model="ruleForm.appId" />
        </el-form-item>
        <el-form-item label="AccessSecret" prop="AccessSecret">
          <el-input v-model="ruleForm.mchId" />
        </el-form-item>
        <el-form-item label="短信签名" prop="Sign">
          <el-input v-model="ruleForm.merchantSerialNumber" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm"> 确定 </el-button>
          <el-button @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useRoute } from 'vue-router';
import router from '@/router';

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  disabled: false,
  id: 1,
  appId: '',
  mchId: '',
  certUrl: '',
  merchantSerialNumber: '',
  privateKeyPath: '',
  transferSceneId: '',
  remarks: '',
});

const route = useRoute();
const paymentId = +route.params.id;

const rules = reactive<FormRules>({
  mchId: [{ required: true, message: '请输入商户号', trigger: 'blur' }],
  secretKey: [{ required: true, message: '请输入API秘钥', trigger: 'blur' }],
  secretKeyV3: [
    { required: true, message: '请输入APIV3秘钥', trigger: 'blur' },
  ],
  privateSecretKey: [
    { required: true, message: '请输入私钥', trigger: 'blur' },
  ],
  notifyUrl: [{ required: true, message: '请输入回调URL', trigger: 'blur' }],
  privateKeyUrl: [
    { required: true, message: '请上传私钥文件', trigger: 'blur' },
  ],
  certUrl: [{ required: true, message: '请上传支付证书文件', trigger: 'blur' }],
  remarks: [{ required: true, message: '请填写备注', trigger: 'blur' }],
});

const validForm = () => {
  return new Promise((resolve, reject) => {
    if (!ruleFormRef.value) return reject('未获取到表单');
    ruleFormRef.value.validate((valid, fields) => {
      if (valid) {
        return resolve('校验通过');
      } else {
        return reject('未通过校验');
      }
    });
  });
};

const submitForm = async () => {
  await validForm();
  ElMessage.success('操作成功');
  router.back();
};

const resetForm = () => {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.resetFields();
};
</script>

<style lang="scss" scoped></style>
