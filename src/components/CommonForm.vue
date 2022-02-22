<template>
  <!-- 通过ref拿到form的实例
      :model="form" 对拿到的form，与element-UI中的form进行双向数据绑定
      :inline="inline" 确定布局，看是单行排列还是上下排列
  -->
  <el-form ref="form" label-width="100px" :model="form" :inline="inline">
    <el-form-item v-for="item in formLabel" :key="item.label" :lable="item.label">
      <el-input 
      v-if="item.type === 'input'"
      :placeholder="'请输入'+item.label"
      v-model="form[item.model]">
      </el-input>
      <el-switch
      v-if="item.type ==='switch'"
      v-model="form[item.model]">
      </el-switch>
      <el-date-picker
      v-if="item.type ==='date'"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期"
      v-model="form[item.model]">
    </el-date-picker>
    <el-select
    v-if="item.type === 'select'"
    placeholder="请选择"
    v-model="form[item.model]">
      <el-option 
      v-for="item in item.opts"
      :key="item.value"
      :label="item.label"
      :value="item.value"></el-option>
    </el-select>

    </el-form-item>
    <!-- 如果当前的不满足，再写一个插槽 -->
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: 'CommonForm',
        // 接收属性
        props: {
            // 接收form的相关配置
            formLabel: Array,
            // 从父组件中传递进来，接收过来之后进行双向绑定
            form: Object,
            // 表单的布局
            inline: Boolean
        }
    }
</script>

<style lang="less" scoped>

</style>