<template>
  <header>
    <div class="l-content">
      <el-button @click="handleMenu"  plain icon="el-icon-menu" size="mini"></el-button>
      <!-- <h3 style="color: #fff;">首页</h3> -->
      <el-breadcrumb separator="/" style="margin-top: 5px;">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <!-- <img class="user" :src="userImg"> -->
          <el-avatar :src="userImg" size="small"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
    // import store from '@/store/index.js'
    // 引入保存在store中tap.js中的数据tabsList
    import {
        mapState
    } from 'vuex'
    export default {
        name: 'ComponHeader',
        data() {
            return {
                userImg: require('@/assets/images/user.png')
            }
        },
        methods: {
            handleMenu() {
                // 拿到修改state值的 mutations中的collapseMenu
                this.$store.commit('collapseMenu')
                    // console.log('111')
            },
            logOut() {
                this.$store.commit('clearToken') // 清除token
                this.$store.commit('clearMenu') //清除Menu
                this.$router.push('/login') //跳转到登录页面
            }
        },
        computed: {
            // 把store中的数据注入到computed中
            ...mapState({
                tags: state => state.tab.tabsList
            })
            // ...mapState(tabsList)
        },
    }
</script>

<style lang="less" scoped>
    header {
        display: flex;
        height: 100%;
        justify-content: space-between;
        align-items: center;
        .l-content {
            display: flex;
            align-item: center;
            .el-button {
                margin-right: 20px;
            }
        }
    }
</style>