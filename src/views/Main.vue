<template>
  <div class="home">
    <!-- <h1>Home组件</h1> -->
    <el-container style="height: 100%;">
      <!-- 侧边栏 -->
      <el-aside width="auto">
        <Compon-aside></Compon-aside>
      </el-aside>
      <!-- 侧边栏 -->

      <el-container>
        <!-- 头部 -->
        <el-header>
          <Compon-header></Compon-header>
        </el-header>
        <!-- 头部 -->

        <!--  使用CommonTag -->
        <Common-tag></Common-tag>
        <!--  使用CommonTag -->

        <!-- main中的内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- main中的内容 -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
    // @ is an alias to /src
    // import HelloWorld from '@/components/HelloWorld.vue'
    // 导入aside组件
    import ComponAside from '@/components/ComponAside.vue'
    import ComponHeader from '@/components/ComponHeader.vue'
    import CommonTag from '@/components/CommonTag.vue'
    export default {
        name: 'Main',
        components: {
            ComponAside,
            ComponHeader,
            CommonTag
        }
    }
</script>
<style lang="less" scoped>
    .el-header {
        background-color: #333;
    }
    
    .el-main {
        padding-top: 0;
    }
</style>