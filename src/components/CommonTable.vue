<template>
  <div class="common-table">
    <el-table
        :data="tableData"
        height="90%" 
        stripe>
        <el-table-column
          show-overflow-tooltip
          v-for="item in tableLabel"
          :key="item.prop"
          :label="item.label"
          width="item.width ? item.width : 125">
          <!-- :label 当前列的名称 -->
          <template slot-scope="scope">
            <span style="margin-left:10px">{{ scope.row[item.prop] }}</span>
          </template>
</el-table-column>
<el-table-column label="操作" min-width="180">
    <!-- 当点击编辑按钮时，通过scope.row 把当前行的数据传递到diglog中 -->
    <template slot-scope="scope">
    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
    </template>

</el-table-column>
</el-table>
<el-pagination class="pager" layout="prev, pager, next" :total="config.total" :current-page.sync="config.page" @current-change="changePage" :page-size="20"></el-pagination>

</div>
</template>

<script>
    export default {
        name: 'CommonTable',
        data() {
            return {

            }
        },
        props: {
            // 名字：类型
            tableData: Array,
            tableLabel: Array,
            config: Object
        },
        methods: {
            handleEdit(row) {
                // 子向父传递数据
                this.$emit('edit', row)
            },
            handleDelete(row) {
                // 子向父传递数据
                this.$emit('del', row)
            },
            changePage(page) {
                // 子向父传递数据
                this.$emit('changePage', page)

            }
        },
    }
</script>

<style lang="less" scoped>
    /* .el-table__body-wrapper .is-scrolling-none {
        height: calc(100%-62px);
    } */
    
    .common-table {
        height: calc(~"100% - 62px");
        background-color: #fff;
        position: relative;
        .pager {
            position: absolute;
            bottom: 0;
            right: 20px
        }
    }
</style>