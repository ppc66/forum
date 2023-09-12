import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from "./utils/request";
import mitt from 'mitt';
import getDate from './utils/DateUtil'
//引入element-ui组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/global.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
var app = createApp(App);
app.use(store).use(router).use(ElementPlus).use(VueAxios, axios).use(ElementPlusIconsVue).mount('#app')
// app._props.request = request;

app.config.globalProperties.$bus = mitt();//绑定事件总线
app.use(getDate)