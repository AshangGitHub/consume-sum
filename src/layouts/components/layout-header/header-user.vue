<template>
  <el-dropdown
    @command="handleCommand"
  >
    <div class="flex items-center justify-center" style="color: #333;">
      <svg class="icon text-2xl cursor-pointer" aria-hidden="true">
        <use xlink:href="#icon-profile"></use>
      </svg>
      <span class="ml-1">{{ userName }}</span>
      <el-icon
        class="ml-1"
        color="#333"
        ><ArrowDown
      /></el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="logout">
          <div>退出</div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue';
// import { logout } from './http';
import { WEB_URL } from '@/config/index.config';

withDefaults(
  defineProps<{
    userName: string;
  }>(),
  {
    userName: 'admin',
  }
);

const emits = defineEmits<{
  (_event: 'logout'): void;
}>();

function deleteAllCookies() {
  //cookie 是一个由分号分隔的字符串，将它分割成数组
  let cookies = document.cookie.split(';');

  //一个早于现在的时间
  let expires = 'Thu, 01 Jan 1970 00:00:00 GMT';

  //当前路径
  var pathBits = location.pathname.split('/');

  //遍历所有可访问 cookies
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf('=');
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    let path = '';
    //遍历当前路径
    for (var j = 0; j < pathBits.length; j++) {
      path += (path.substr(-1) != '/' ? '/' : '') + pathBits[j];
      //执行清除
      document.cookie = `${name}=; expires=${expires}; path=${path}`;
    }
  }
}

const handleCommand = async (command: 'logout') => {
  if (command === 'logout') {
    const storage = window.localStorage;
    storage.clear();
    deleteAllCookies();
    // await logout();
    window.location.href = `${WEB_URL}/auth/login`;
    emits('logout');
  }
};
</script>

<style scoped></style>
