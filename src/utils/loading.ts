import { ElLoading, LoadingParentElement } from 'element-plus';
import 'element-plus/theme-chalk/el-loading.css';
import { Ref } from 'vue';

let loadingCount = 0;
let loading: {
  close: () => void;
  remvoeElLoadingChild?: () => void;
  handleAfterLeave?: () => void;
  $el?: HTMLElement;
  originalPosition?: Ref<string>;
  originalOverflow?: Ref<string>;
  visible?: Ref<boolean>;
  // parent?: Ref<LoadingParentElement>;
  background?: Ref<string>;
  svg?: Ref<string>;
  svgViewBox?: Ref<string>;
  spinner?: Ref<string | boolean>;
  text?: Ref<string>;
  fullscreen?: Ref<boolean>;
  lock?: Ref<boolean>;
  customClass?: Ref<string>;
  target?: Ref<HTMLElement>;
  beforeClose?: Ref<(() => boolean) | undefined> | undefined;
  closed?: Ref<(() => void) | undefined> | undefined;
};

const startLoading = () => {
  loading = ElLoading.service({
    lock: true,
    text: 'Loading...',
    background: 'rgba(0, 0, 0, 0.6)',
    customClass: 'text-white',
  });
};

const endLoading = () => {
  loading && loading.close();
};

export const showLoading = () => {
  if (loadingCount === 0) {
    startLoading();
  }
  loadingCount += 1;
};

export const hideLoading = () => {
  if (loadingCount <= 0) {
    return;
  }
  loadingCount -= 1;
  if (loadingCount === 0) {
    endLoading();
  }
};
