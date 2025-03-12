import { App } from 'vue';
export default (app: App<Element>) => {
  //自定义指令
  app.directive('permission', {
    mounted(el, binding) {
      checkPermission(el, binding);
    },
    updated(el, binding) {
      checkPermission(el, binding);
    },
  });
};

const checkPermission = (
  el: HTMLElement,
  binding: {
    value: string | { value: string; arr?: string[]; isAnd?: boolean };
  }
) => {
  const permissions = localStorage.getItem('permissions')
    ? JSON.parse(localStorage.getItem('permissions') || '[]')
    : [];
    
    if(!binding.value){
      return;
    }
  // const permissions =  || [];
  if (permissions && permissions.length) {
    let isShow = false;
    if (typeof binding.value == 'string') {
      //单个字符串
      isShow = permissions.filter((o: string) => o === binding.value).length;
    } else {
      const data = binding.value as {
        value: string;
        arr?: string[];
        isAnd?: boolean;
      };
      if (data.arr?.length) {
        //数组中只要含有一个权限，则显示  isAnd=true : 全部含有才显示
        isShow = data.isAnd
          ? permissions.every((o: string) => data.arr?.includes(o))
          : permissions.some((o: string) => data.arr?.includes(o));
      }
    }
    if (!isShow) {
      el.style.display = 'none';
    }
  } else {
    el.style.display = 'none';
  }
};
