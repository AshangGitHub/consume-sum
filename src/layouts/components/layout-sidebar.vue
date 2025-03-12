<template>
  <el-aside
    class="dark:bg-slate-800 overflow-hidden"
    :width="isCollapse ? '64px' : '240px'"
  >
    <el-scrollbar class="h-full">
      <layout-menu :collapse="isCollapse" />
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
import layoutMenu from './layout-menu.vue';
import { defineProps } from 'vue';

defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
