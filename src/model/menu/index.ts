import { Setting, Goods, Coin } from '@element-plus/icons-vue';
import { DefineComponent, markRaw } from 'vue';
interface IMenu {
  index: string;
  icon?: DefineComponent,
  name: string;
  permission?: string;
  path?: string;
  children?:IMenu[]
}

const menu:IMenu[] = [
  {
    index: 'apply-config',
    icon: markRaw(Coin),
    name: '应用配置',
    // permission: 'product',
    children:[
      {
        index: '/apply-config',
        name: '应用列表',
        path: '/apply-config',
        // permission: 'system:user',
      },
    ]
  },
  {
    index: 'service',
    icon: markRaw(Goods),
    name: '服务配置',
    children:[
      {
        index: '/service/object-storage',
        name: '对象存储',
        path: '/service/object-storage',
      },
      {
        index: '/service/message',
        name: '短信配置',
        path: '/service/message',
      },
      {
        index: '/service/mail',
        name: '邮件配置',
        path: '/service/mail',
      },
    ]
  },
];

export { menu };
