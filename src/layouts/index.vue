<template>
  <div class="bg-white dark:bg-slate-60">
    <el-container class="h-screen">
      <el-header class="header-box">
        <layout-header :user-name="userName" />
      </el-header>
      <el-container>
        <layout-sidebar :is-collapse="isCollapse"></layout-sidebar>
        <el-container>
          <layout-main>
            <router-view></router-view>
          </layout-main>
          <el-footer
            class="flex items-center justify-end text-xs font-extralight bg-gray-50 border-t border-t-slate-200 dark:bg-slate-900 dark:border-t-gray-800"
          >
            <span>1989-2022 &copy; All Rights Reserved.</span>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import LayoutSidebar from './components/layout-sidebar.vue';
import layoutHeader from './components/layout-header/index.vue';
import LayoutMain from './components/layout-main.vue';
import { StorageUtil } from '@/utils/oauth/storage.util';

const userName = ref<string>(StorageUtil.getUserName() || '');
const isCollapse = ref(false);
const onToggle = (e: boolean) => {
  isCollapse.value = e;
};
</script>
<style lang="scss" scoped>
.header-box {
  padding: 0!important;
}
</style>