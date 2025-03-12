<template>
  <el-upload
    v-model:file-list="fileList"
    ref="upload"
    :class="{
      'limit-full': limitFull,
    }"
    list-type="picture-card"
    :accept="accept"
    :on-remove="handleRemove"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :http-request="onUpload"
    :style="{
      zoom: zoom,
    }"
    :limit="limit"
  >
    <el-icon><Plus /></el-icon>
    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><ZoomIn /></el-icon>
          </span>
          <span
            class="el-upload-list__item-delete"
            @click="handleEditUpload(file)"
          >
            <el-icon><Edit /></el-icon>
          </span>
          <span  v-if="del" class="el-upload-list__item-delete" @click="handleRemove(file,[])">
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>

      <!-- <img class="el-upload-list__item-thumbnail" :src="file.url" /> -->
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible" append-to-body>
    <div class="flex items-center justify-center">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import {
  UploadRequestOptions,
  UploadProps,
  UploadUserFile,
  UploadFile,
  UploadInstance,
} from 'element-plus';
import { Plus, ZoomIn, Edit, Delete } from '@element-plus/icons-vue';
import { uploadImage } from '@/http/common';

interface Props {
  inputType?: 'array' | 'string';
  list: string[] | string;
  accept?: string;
  zoom?: number;
  maxSize?: number;
  outputType?: 'array' | 'string';
  limit?: number;
  del?:boolean;
}

const props = withDefaults(defineProps<Props>(), {
  inputType: 'string',
  list: '',
  accept: 'image/*',
  zoom: 1,
  maxSize: 1024 * 1024 * 50,
  outputType: 'string',
  limit: 3,
  del: true,
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

const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url as string;
  dialogVisible.value = true;
};

const handleEditUpload= (currentFile:UploadFile) => {
  const input = document.createElement('input');
    input.type = 'file';
    input.setAttribute('directory', 'true');
    input.setAttribute(
      'style',
      'visibility: hidden;position: absolute;left: -999999rem;'
    );
    input.multiple = false;
    document.querySelector('body')?.appendChild(input);
    input.click();
    input.onchange = async ($event: Event) => {
      if ($event !== null) {
        // @ts-ignore
        const files = $event.target?.files;
        if(!files.length) return;
        const formData = new FormData();
        formData.append('file', files[0]);
        const res = await uploadImage(formData);
        replaceUrl(currentFile, res);
        updateList();
        document.querySelector('body')?.removeChild(input);
      }
    };

};
const handleRemove: UploadProps['onRemove'] = (uploadFile) => {
  const finder = fileList.value.find((item) => item.uid === uploadFile.uid);
  finder && fileList.value.splice(fileList.value.indexOf(finder), 1);
  console.log(fileList.value, 'fileListfileList');
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
  formData.append('file', file);
  const res = await uploadImage(formData);
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
