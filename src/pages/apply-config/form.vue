<template>
  <h1 class="mb-4 text-lg font-black">应用{{ applyId ? '编辑': '创建' }}</h1>
  <div
    class="bg-white dark:bg-slate-800 rounded-lg p-6 ring-slate-900/5 shadow-sm overflow-x-scroll flex justify-between"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="w-full"
      label-width="130px"
    >
      <el-form-item label="应用名称" prop="clientName" class="w-3/5">
        <el-input v-model="ruleForm.clientName"></el-input>
      </el-form-item>
      <el-form-item label="应用图标" class="w-3/5">
        <batch-uploader v-model="imageList" :limit="1"></batch-uploader>
      </el-form-item>
      <el-form-item label="允许回调地址" prop="allowUrl" class="w-3/5">
        <div class="w-full">
          <div
            class="flex justify-start items-center w-full mb-2"
            v-for="(item, index) in allowUrlList"
            :key="index"
          >
            <div class="w-4/5">
              <el-input v-model="allowUrlList[index]"></el-input>
            </div>
            <div class="flex ml-2">
              <el-button
                v-if="allowUrlList.length !== 1"
                class="ml-2"
                size="small"
                :icon="Delete"
                circle
                @click="onDeleteUrl(index)"
              />
              <el-button
                v-if="allowUrlList.length < 7 && index === allowUrlList.length - 1"
                class="ml-2"
                size="small"
                type="primary"
                :icon="Plus"
                circle
                @click="onPlusUrl"
              />
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="应用编码" class="w-3/5" v-if="applyId">
        <div>{{ ruleForm.clientId }}</div>
      </el-form-item>
      <el-form-item label="应用链接" prop="clientUrl" class="w-3/5">
        <el-input v-model="ruleForm.clientUrl"></el-input>
      </el-form-item>
      <el-form-item label="应用描述" class="w-3/5">
        <el-input
          v-model="ruleForm.clientDesc"
          resize="none"
          :rows="3"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          确定
        </el-button>
        <el-button @click="toBack">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { Delete, Plus } from '@element-plus/icons-vue';
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IGeApplyFormParams } from '@/interface/apply-config';
import { FormInstance, FormRules } from 'element-plus';
import { getApplyConfigDetail } from '@/http/apply-config';
import BatchUploader from '@/components/upload-file/src/image.vue';
import { editApplyConfig, saveApplyConfig } from '@/http/apply-config';

const route = useRoute();
const router = useRouter();
const id = computed({
  get() {
    return route.params.id as string;
  },
  set() {},
});

let ruleForm = ref<IGeApplyFormParams>({
  allowUrl: '*',
  clientDesc: '',
  clientId: '',
  clientLogo: '',
  clientName: '',
  clientUrl: '',
});

const applyId = ref<string>('');
const init = () => {
  applyId.value = id.value || '';
  if (applyId.value) getDetail();
};

let imageList = reactive<string[]>([]);
const allowUrlList = ref<string[]>(['']);
const getDetail = async () => {
  const res = await getApplyConfigDetail(applyId.value);
  ruleForm.value.allowUrl = res.allowUrl;
  ruleForm.value.clientDesc = res.clientDesc;
  ruleForm.value.clientId = res.clientId;
  ruleForm.value.clientLogo = res.clientLogo;
  ruleForm.value.clientName = res.clientName;
  ruleForm.value.clientUrl = res.clientUrl;
  imageList = [res.clientLogo];
  allowUrlList.value =
    res.allowUrl && res.allowUrl.length ? res.allowUrl.split(',') : [''];
};

init();

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  clientLogo: [{ required: true, message: '请输入应用图标', trigger: 'blur' }],
  clientName: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
  clientUrl: [{ required: true, message: '请输入应用链接', trigger: 'blur' }],
  allowUrl: [{ required: true }]
});
//验证表单
const validForm = async (
  formEl: FormInstance | undefined
): Promise<boolean> => {
  // 验证表单
  return new Promise((resolve) => {
    if (!formEl) {
      resolve(false);
    } else {
      formEl.validate((valid) => {
        resolve(valid);
      });
    }
  });
};

const onDeleteUrl = (index: number) => {
  allowUrlList.value.splice(index, 1);
};
const onPlusUrl = () => {
  allowUrlList.value.push('');
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  const isValid = await validForm(formEl);
  if (!isValid) return;

  let isEmpty: boolean = false;
  for (let index = 0; index < allowUrlList.value.length; index++) {
    const element = allowUrlList.value[index];
    if(!element) isEmpty = true; 
  }
  if (isEmpty) return ElMessage.warning('请查看是否有空的允许回调地址');
  ruleForm.value.allowUrl = allowUrlList.value.join(',');
  if (applyId.value) await editApplyConfig(ruleForm.value);
  else await saveApplyConfig(ruleForm.value);
  ElMessage.success('操作成功');
  toBack();
};

const toBack = () => {
  router.go(-1);
};
</script>
<style></style>
