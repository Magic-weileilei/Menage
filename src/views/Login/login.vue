<template>
  <div class="container-login">
    <!-- ref="form"  通过ref获取form实例，方便我们调用form下面的属性或方法 -->
    <el-form :model="form" 
    status-icon 
    :rules="rules" 
    ref="form"
    label-width="100px" 
    class="login-container">
      <!-- 标题 -->
      <h3 class="login-title">系统登录</h3>
      <el-form-item label="用户名" prop="username" label-width="80px" class="username">
        <el-input 
        type="input" 
        v-model="form.username" 
        autocomplete="off" 
        placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="80px" class="password">
        <el-input 
        type="password" 
        v-model="form.password" 
        autocomplete="off"
        placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item class="login_submit">
        <el-button type="primary" @click="login" class="login_submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    // 引入mock  模拟token
    import Mock from '@/api/mock.js'
    import {
        getMenu
    } from '@/api/data.js'

    export default {
        name: 'login',
        data() {
            return {
                form: {

                },
                // 校验规则
                rules: {
                    // 校验用户名
                    username: [{
                        required: true, // 要进行校验
                        // 若校验不通过，通过message提示用户 '请输入用户名'
                        message: '请输入用户名',
                        // 触发方式：blur
                        trigger: 'blur'
                    }, {
                        // 用户名长度限制
                        min: 3,
                        message: '用户名长度不能小于3位',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            login() {
                getMenu(this.form).then(({
                    data: res
                }) => {
                    if (res.code === 20000) {
                        // 1、清除Menu
                        this.$store.commit('clearMenu')
                            // 设置Menu
                        this.$store.commit('setMenu', res.data.menu)
                            // 设置token
                        this.$store.commit('setToken', res.data.token)
                            // 动态添加路由
                        this.$store.commit('addMenu', this.$router)
                            // 进行页面跳转
                        this.$router.push({
                            name: 'home'
                        })
                    } else {
                        this.$message.console.warning(res.data.message);
                    }
                })

                // const token = Mock.random.guid()
                // this.$store.commit('setToken', token)
                // this.$router.push({
                //     name: 'home'
                // })
            }
        }
    }
</script>

<style lang="less" scoped>
    .login-container {
        border-radius: 15px;
        /* 背景裁剪内边距 */
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background-color: #fff;
        border: 1px solid #eaeaea;
        box-shadow:0 0 25px #cac6c6 .login-title {
            margin: 0 auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .login_submit {
            margin: 10px auto 0 auto;
        }
    }
</style>