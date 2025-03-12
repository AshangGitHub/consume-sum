<template>
  <el-menu
    router
    :default-active="defaultActive"
    class="border-0 el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <template v-for="item in menus" :key="item.index">
      <template v-if="item.children">
        <el-sub-menu v-permission="item.permission" :index="item.index">
          <template #title>
            <component :is="item.icon" width="18"></component>
            <span class="ml-1">{{ item.name }}</span>
          </template>
          <template v-if="item.children.length">
            <el-menu-item
              v-permission="child.permission"
              v-for="child in item.children"
              :key="child.index"
              :index="child.index"
              >{{ child.name }}</el-menu-item
            >
          </template>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item v-permission="item.permission" :index="item.index">
          <component :is="item.icon" width="18"></component>
          <template #title>
            <span class="ml-1">{{ item.name }}</span>
          </template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { menu } from '@/model/menu';
import { defineProps } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
});

const defaultActive = ref('');
const menus = reactive(menu);
const init = ()=>{
  defaultActive.value = route.meta.activePath ? route.meta.activePath as string : route.path;
}

init();
console.log(menus, 'menus');

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style></style>
