// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

// 引入echart
// import echarts from 'echarts' //引入echarts
// Vue.prototype.$echarts = echarts //引入组件


// 引入粒子背景
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

// normalize.css 格式化css
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import "./assets/css/index.css"

//引入element组件化框架
import ElementUI from "element-ui"
//引入样式文件
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/icon/iconfont.css"
import "@/permission"
Vue.config.productionTip = false


Vue.use(ElementUI);
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
