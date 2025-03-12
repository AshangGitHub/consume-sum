<template>
  <el-icon
    :class="{
      'hidden dark:inline': currentTheme === 'light',
    }"
    @click="toggleTheme"
    ><Moon
  /></el-icon>
  <el-icon
    :class="{
      'dark:hidden': currentTheme === 'dark',
    }"
    @click="toggleTheme"
    ><Sunny
  /></el-icon>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Moon, Sunny } from '@element-plus/icons-vue';

const currentTheme = ref('light');

type ThemeType = 'dark' | 'light';

// window
//   .matchMedia('(prefers-color-scheme: dark)')
//   .addEventListener('change', () => {
//     setTheme(
//       window.matchMedia('(prefers-color-scheme: dark)').matches
//         ? 'dark'
//         : 'light'
//     );
//   });

onMounted(() => {
  // const initUserTheme = getTheme() || getMediaPreference();
  // setTheme(initUserTheme as ThemeType);
  setTheme('light');
});

const toggleTheme = () => {
  const activeTheme = localStorage.getItem('theme');
  if (activeTheme === 'light') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
};

const getTheme = () => {
  return localStorage.getItem('theme');
};

const setTheme = (theme: ThemeType) => {
  localStorage.setItem('theme', theme);
  currentTheme.value = theme;
  document.documentElement.className = theme;
};

const getMediaPreference = () => {
  const hasDarkPreference = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  if (hasDarkPreference) {
    return 'dark';
  } else {
    return 'light';
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.switch-checkbox {
  display: none;
}

.switch-label {
  align-items: center;
  background: var(--text-primary-color);
  border: calc(var(--element-size) * 0.025) solid var(--accent-color);
  border-radius: var(--element-size);
  cursor: pointer;
  display: flex;
  font-size: calc(var(--element-size) * 0.3);
  height: calc(var(--element-size) * 0.35);
  position: relative;
  padding: calc(var(--element-size) * 0.1);
  transition: background 0.5s ease;
  justify-content: space-between;
  width: var(--element-size);
  z-index: 1;
}

.switch-toggle {
  position: absolute;
  background-color: var(--background-color-primary);
  border-radius: 50%;
  top: calc(var(--element-size) * 0.07);
  left: calc(var(--element-size) * 0.07);
  height: calc(var(--element-size) * 0.4);
  width: calc(var(--element-size) * 0.4);
  transform: translateX(0);
  transition: transform 0.3s ease, background-color 0.5s ease;
}

.switch-toggle-checked {
  transform: translateX(calc(var(--element-size) * 0.6)) !important;
}
</style>
