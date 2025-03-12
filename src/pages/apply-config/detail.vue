<template>
  <h1 class="mb-4 text-lg font-black">应用详情</h1>
  <div
    class="bg-white dark:bg-slate-800 rounded-lg p-6 ring-slate-900/5 shadow-sm overflow-x-scroll flex justify-between"
  >
    <el-form
      ref="detailRef"
      :model="detail"
      class="w-full"
      label-width="130px"
    >
      <el-form-item label="应用名称" prop="clientName" class="w-3/5">
        {{ detail.clientName }}
      </el-form-item>
      <el-form-item label="应用图标" class="w-3/5">
        <img :src="detail.clientLogo" alt="">
      </el-form-item>
      <el-form-item label="允许回调地址" prop="allowUrl" class="w-3/5">
        <div class="w-full">
          <div
            class="flex justify-start items-center w-full mb-2"
            v-for="(item, index) in allowUrlList"
            :key="index"
          >
            {{ allowUrlList[index] }}
          </div>
        </div>
      </el-form-item>
      <el-form-item label="应用编码" class="w-3/5" v-if="applyId">
        <div>{{ detail.clientId }}</div>
      </el-form-item>
      <el-form-item label="应用链接" prop="clientUrl" class="w-3/5">
        {{ detail.clientUrl }}
      </el-form-item>
      <el-form-item label="应用描述" class="w-3/5">
        <div> {{ detail.clientDesc }} </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="toBack">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IGeApplyDatailResponse } from '@/interface/apply-config';
import { getApplyConfigDetail } from '@/http/apply-config';

const route = useRoute();
const router = useRouter();
const id = computed({
  get() {
    return route.params.id as string;
  },
  set() {},
});

let detail = ref<IGeApplyDatailResponse>({
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
  detail.value.allowUrl = res.allowUrl;
  detail.value.clientDesc = res.clientDesc;
  detail.value.clientId = res.clientId;
  detail.value.clientLogo = res.clientLogo;
  detail.value.clientName = res.clientName;
  detail.value.clientUrl = res.clientUrl;
  imageList = [res.clientLogo];
  allowUrlList.value =
    res.allowUrl && res.allowUrl.length ? res.allowUrl.split(',') : [''];
};
init();

const toBack = () => {
  router.go(-1);
};
</script>
<style></style>
