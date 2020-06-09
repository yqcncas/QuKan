import Vue from 'vue'
import App from './App'

import fetch from './libs/request.js'
import api from './api'
Vue.prototype.$fetch = fetch
Vue.prototype.$api = api
// 引入dayjs
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // 引入相对时间
import 'dayjs/locale/zh-cn' // 引入中文
dayjs.locale('zh-cn') // 引入中文
dayjs.extend(relativeTime)
Vue.prototype.$dayjs = dayjs // 放入原型中

// 顶部占位
import Status from '@/components/Status/status.vue'
Vue.component('Status', Status)

// 导入加载
import uniLoadMore from './components/uni-load-more/uni-load-more.vue'
Vue.component('uniLoadMore',uniLoadMore);
// uview组件
import uView from "@/uview";
Vue.use(uView);

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
