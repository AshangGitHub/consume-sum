<template>
  <el-main class="bg-gray-100 dark:bg-slate-900 flex flex-col h-full">
    <el-breadcrumb separator="/" class="flex-none mb-4">
      <el-breadcrumb-item
        v-for="item in levelList"
        :key="item.path"
        :to="item.path"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <slot></slot>
  </el-main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouteLocationMatched, useRoute } from 'vue-router';
const route = useRoute();
const levelList = ref<RouteLocationMatched[]>([]);

watch(
  () => route.path,
  () => {
    getBreadcrumb();
  }
);

const getBreadcrumb = () => {
  const matched = route.matched.filter((item) => item.meta.title);
  const first = matched[1];
  if (first && first.meta && first.meta.parent) {
    const bread = {
      meta: {
        title: first.meta.parent,
      },
      path: first.meta.path,
    };

    levelList.value = [
      matched[0],
      bread as unknown as RouteLocationMatched,
      matched[1],
    ];
  } else {
    levelList.value = matched;
  }
};
getBreadcrumb();
</script>

<style scoped></style>
