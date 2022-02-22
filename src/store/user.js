// token 依赖第三方库 cookie  npm i js-cookie 
import Cookie from 'js-cookie'
export default {
    state: {
        token: ''
    },
    mutations: {
        // 设置token
        setToken(state, val) {
            state.token = val
                // 将token进行缓存,缓存到cookie中
            Cookie.set('token', val)
        },
        // 清除token
        clearToken(state) {
            // 将state中的token置为空
            state.token = ''
                // 清空cookie缓存中的token
            Cookie.remove('token')
        },
        // 获取token
        getToken(state) {
            // 判断token是否存在，如果存在则获取到token
            // (如果state中存在就在state中获取token，如果state中不存在，就到Cookie中找)
            state.token = state.token || Cookie.get('token')
        }
    }
}