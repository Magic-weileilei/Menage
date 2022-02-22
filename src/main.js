import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/less/index.less'
import http from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入mock
import '@/api/mock.js'

// 引入Echarts
// import echarts from 'echarts'
Vue.use(ElementUI);
Vue.prototype.$http = http
Vue.config.productionTip = false

//  导航守卫
router.beforeEach((to, from, next) => {
    store.commit('getToken') //防止页面刷新丢失页面信息

    //获取token
    const token = store.state.user.token
    if (!token && to.name != 'login') {
        next({ name: 'login' })
    } else if (token && to.name === 'login') {
        next({ name: 'home' })
    } else {
        next()
    }
})

new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        store.commit('addMenu', this.$router)
    }
}).$mount('#app')