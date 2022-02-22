<template>
  <div class="manage">
    <!-- <h3>User组件</h3> -->
    <el-dialog
    :title="operateType === 'add' ? '新增用户' : '更新用户'"
    :visible.sync="isShow">
    <!-- 在这个弹窗中引入CommonForm组件 -->
    <Common-form
    :formLabel="opertateFormLabel"
    :form="operateForm"
    :inline="true"
    ref="form">
    <!-- 通过ref拿到当前组件的实例 -->
    </Common-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isShow = false">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </el-dialog>
  <div class="manage-header">
    <el-button type="primary" @click="addUser">+ 新增</el-button>
    <Common-form
    :formLabel="formLabel"
    :form="searchForm"
    :inline="true"
    ref="form">
    <!-- 通过ref拿到当前组件的实例 -->
      <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
    </Common-form>
  </div>
  <!-- 引入子组件 -->
  <Common-table
  :tableData="tableData"
  :tableLabel="tableLabel"
  :config="config"
  @changePage="getList()"
  @edit="editUser"
  @del="delUser"
  ></Common-table>
  </div>
</template>

<script>
    import CommonForm from '@/components/CommonForm.vue'
    import CommonTable from '@/components/CommonTable.vue'
    // 引入接口
    import {
        getUser
    } from '@/api/data.js'
    export default {
        name: 'User',
        data() {
            return {
                operateType: 'add',
                // 控制弹窗的打开与关闭
                isShow: false,
                opertateFormLabel: [{
                    model: 'name',
                    label: '姓名',
                    type: 'input'
                }, {
                    model: 'age',
                    label: '年龄',
                    type: 'input'
                }, {
                    model: 'sex',
                    label: '性别',
                    type: 'select',
                    opts: [{
                        label: '男',
                        value: 1
                    }, {
                        label: '女',
                        value: 0
                    }]
                }, {
                    model: 'birth',
                    label: '出生日期',
                    type: 'date'
                }, {
                    model: 'addr',
                    label: '地址',
                    type: 'input'
                }],
                operateForm: {
                    name: '',
                    addr: '',
                    age: '',
                    birth: '',
                    sex: ''
                },
                formLabel: [
                    // 只有一个inputs
                    // 搜索的input
                    {
                        model: "keyword",
                        label: '',
                        type: 'input'
                    }
                ],
                // 搜索
                searchForm: {
                    keyword: ''
                },
                // tableDate表格的数据
                tableData: [],
                tableLabel: [{
                    prop: "name",
                    label: '姓名'
                }, {
                    prop: "age",
                    label: '年龄'
                }, {
                    prop: "sexLabel",
                    label: '性别'
                }, {
                    prop: "birth",
                    label: '出生日期',
                    width: 200
                }, {
                    prop: "addr",
                    label: '地址',
                    width: 320
                }],
                config: {
                    page: 1,
                    total: 30
                }
            }
        },
        components: {
            CommonForm,
            CommonTable
        },
        methods: {
            confirm() {
                if (this.operateType === 'edit') {
                    this.$http.post('/user/edit', this.operateForm).then(res => {
                        this.isShow = false
                            // 编辑，新增数据之后调用getList() 将列表重置
                        this.getList()
                    })
                } else {
                    this.$http.post('/user/add', this.operateForm).then(res => {
                        this.isShow = false
                            // 编辑，新增数据之后调用getList() 将列表重置
                        this.getList()
                    })
                }
            },

            addUser() {
                this.isShow = true
                this.operateType = 'add'
                this.operateForm = {
                    name: '',
                    addr: '',
                    age: '',
                    birth: '',
                    sex: ''
                }

            },
            getList(name = '') {
                // 获取数据前给一个loading
                this.config.loading = true

                // 判断传入的name是否存在
                name ? (this.config.page = 1) : ''
                getUser({
                    page: this.config.page,
                    name
                }).then(({
                    data: res
                }) => {
                    // res为接口的响应值
                    // 把接收的数据存储到tableDate中
                    this.tableData = res.list.map(item => {
                            item.sexLabel = item.sex === 0 ? "女" : "男"
                            return item
                        })
                        // 处理分页数据
                    this.config.total = res.count
                    this.config.loading = false
                })
            },
            editUser(row) {
                // 手动将operateType设置为edit字段
                this.operateType = 'edit'
                this.isShow = true
                this.operateForm = row
            },
            delUser(row) {
                // this.$confirm("通知内容","标题",相关配置)
                this.$confirm("此操作将永久删除该组件,是否继续", "提示", {
                    // 确认按钮
                    confirmButtonText: "确认",
                    // 取消按钮
                    cancelButtonText: "取消",
                    // 弹窗类型
                    type: "warning"

                    // 点击删除时会触发一个回调，用.then()
                }).then(() => {
                    // 获取当前的id
                    const id = row.id
                        // 调用接口（Api）,删除数据
                        // 在mock.js中定义一个/user/del的拦截器
                    this.$http.post("/user/del", {
                        params: {
                            id
                        }
                    }).then(() => {
                        // 给一个message的提示
                        this.$message({
                                type: 'success',
                                message: '删除成功'
                            })
                            // 更新列表
                        this.getList()
                    })
                })
            }
        },
        created() {
            //调用getList()
            this.getList()
        }
    }
</script>

<style lang="less">
    .manage {
        height: 100%;
    }
    
    .manage-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>