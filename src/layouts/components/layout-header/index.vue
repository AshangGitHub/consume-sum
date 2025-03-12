<template>
  <el-header
    height="60px"
    class="header flex items-center justify-between w-screen relative max-w-full bg-white"
    style="padding-left: 0"
  >
    <div class="overflow-hidden">
      <div class="flex items-center w-80 flex-none">
        <div class="flex items-center ml-3">
          <img class="w-24" :src="logo" :alt="name" />
          <span class="ml-2 text-base">{{ name }}</span>
        </div>
      </div>
    </div>
    <div class="flex justify-end items-center">
      <header-user :user-name="userName" />
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import HeaderUser from './header-user.vue';
import { ALIOSS_BASE_URL, WEB_URL } from '@/config/index.config';

withDefaults(
  defineProps<{
    logo?: string;
    name?: string;
    userName: string;
  }>(),
  {
    logo: `${ALIOSS_BASE_URL}/images/common/logo.svg`,
    name: '',
    userName: 'admin',
  }
);

const initScript = ()=>{
  const script = document.createElement('script');
  script.src = '//at.alicdn.com/t/c/font_4545742_mglksfqe4wc.js';   //对应iconfont：member-hub 
  document.body.appendChild(script);
}
(()=>{
  initScript();
})();
</script>

<style lang="scss" scoped>
.header {
  box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.06);
}
</style>
