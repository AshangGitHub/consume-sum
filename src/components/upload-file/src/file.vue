<template>
  <el-upload
    v-model:file-list="fileList"
    ref="upload"
    :class="{
      'limit-full': limitFull,
    }"
    :accept="accept"
    :on-remove="handleRemove"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :http-request="onUpload"
    :limit="limit"
    :show-file-list="false"
  >
    <el-button type="primary">点击上传</el-button>
  </el-upload>
  <div v-if="fileList.length" class="uploaded-file-list">
    <div v-for="file in fileList">
      <span class="text-xs text-zinc-500">
        {{ file.name }}
      </span>
      <el-button
        class="ml-2"
        text
        type="primary"
        @click="handleRemove(file)"
        :icon="Close"
      ></el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import {
  UploadRequestOptions,
  UploadProps,
  UploadUserFile,
  UploadInstance,
} from 'element-plus';
import { uploadFile } from '@/http/common';
import { Close } from '@element-plus/icons-vue';

interface Props {
  inputType?: 'array' | 'string';
  list: string[] | string;
  accept?: string;
  zoom?: number;
  maxSize?: number;
  outputType?: 'array' | 'string';
  limit?: number;
}

const props = withDefaults(defineProps<Props>(), {
  inputType: 'string',
  list: '',
  accept: '*/*',
  zoom: 1,
  maxSize: 1024 * 1024 * 50,
  outputType: 'string',
  limit: 1,
});
const upload = ref<UploadInstance>();
const emits = defineEmits(['update:list']);

const init = () => {
  if (props.inputType === 'string') {
    const list = (props.list as string).split(',');
    let arr: UploadUserFile[] = [];
    list.map((item) => {
      if (item) {
        arr.push({ url: item, name: item });
      }
      return;
    });
    fileList.value = arr;
  } else {
    if (props.list instanceof Array) {
      fileList.value = props.list.map((item) => ({
        url: item,
        name: item,
      }));
    }
  }
};
onMounted(() => {
  if (!props.list) return;
  init();
});

const limitFull = computed(() => fileList.value.length >= props.limit);

const fileList = ref<UploadUserFile[]>([]);

const handleRemove = (file: UploadUserFile) => {
  const finder = fileList.value.find((item) => item.uid === file.uid);
  finder && fileList.value.splice(fileList.value.indexOf(finder), 1);
  updateList();
};

const handleAvatarSuccess: UploadProps['onSuccess'] = () => {
  updateList();
};

/** 上傳之前校驗 */
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size > props.maxSize) {
    ElMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
};

const onUpload = async (options: UploadRequestOptions) => {
  const file = options.file;
  const formData = new FormData();
  console.log('file', fileList.value[0].raw);
  formData.append('file', file);
  const res = await uploadFile(formData);
  replaceUrl(file, res);
};

const replaceUrl = (file: UploadUserFile, url: string) => {
  const finder = fileList.value.find((item) => item.uid === file.uid);
  finder && (finder.url = url);
};

// 更新圖片列表
const updateList = () => {
  if (props.outputType === 'array') {
    emits(
      'update:list',
      fileList.value.map((item) => item.url)
    );
  } else {
    emits('update:list', fileList.value.map((item) => item.url).join(','));
  }
};

watch(
  () => props.list,
  () => {
    init();
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.avatar-uploader .avatar {
  display: block;
}
</style>

<style lang="scss">
.limit-full {
  .el-upload {
    display: none;
  }
}
</style>
