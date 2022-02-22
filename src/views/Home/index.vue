<template>
  <!-- <div class="home-container">
    <div style="width: 50px;height:30px;background-color:#5ab1ef;margin: 10px 0; ">
      <h3 style="line-height: 30px;text-align: center;color: #fff;">首页</h3>
    </div> -->
    <el-row class="home" :gutter="20" style="margin-top: 20px;">
      <!-- 左侧 -->
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div class="user">
            <img :src="userImg" >
            <div class="userInfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登陆时间<span>2022-1-12</span></p>
            <p>上次登陆地点<span>郑州</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px;height: 460px;">
          <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            v-for="(val,key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val">
          </el-table-column>
        </el-table>
        </el-card>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="16">
        <!-- 上面 -->
        <div class="num">
          <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
            <i class="icon" :class="item.icon" :style="{background:item.color}"></i>
            <div class="detail">
              <p class="num">￥{{ item.value }}</p>
              <p class="txt">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <!-- 中间 -->
        <el-card style="height: 280px
        ;">
          <!-- ref 用于获取当前的dom节点-->
          <div style="height:280px" ref="echarts"></div>
        </el-card>
        <!-- 下边 -->
        <div class="graph">
          <el-card style="height:260px">
            <div style="height: 240px;" ref="userEcharts"></div>
          </el-card>
          <el-card style="height:260px">
            <div style="height: 240px;" ref="videoEcharts"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import {
        getData
    } from '@/api/data.js'
    // 引入echarts
    import * as echarts from 'echarts'

    export default {
        name: 'Home',
        data() {
            return {
                userImg: require('@/assets/images/user.png'),
                tableData: [],
                tableLabel: {
                    name: '课程',
                    todayBuy: '今日购买',
                    monthBuy: '本月购买',
                    totalBuy: '总购买'
                },
                countData: [{
                    name: "今日支付订单",
                    value: 1234,
                    icon: "el-icon-success",
                    color: "#2ec7c9",
                }, {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "el-icon-star-on",
                    color: "#ffb980",
                }, {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "el-icon-s-goods",
                    color: "#5ab1ef",
                }, {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "el-icon-success",
                    color: "#2ec7c9",
                }, {
                    name: "本月收藏订单",
                    value: 210,
                    icon: "el-icon-star-on",
                    color: "#ffb980",
                }, {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "el-icon-s-goods",
                    color: "#5ab1ef",
                }]
            }
        },
        mounted() {
            getData().then(res => {
                const {
                    code,
                    data
                } = res.data
                if (code === 20000) {
                    this.tableData = data.tableData
                    const order = data.orderData
                    const xData = order.date

                    // Object.keys(obj) 传入的是对象，返回所传对象的key值
                    const keyArray = Object.keys(order.data[0])
                    const series = []
                    keyArray.forEach(key => {
                        series.push({
                            name: key,
                            data: order.data.map(item => item[key]),
                            type: 'line'
                        })

                    })

                    // 折线图
                    const option = {
                        xAxis: {
                            data: xData
                        },
                        yAxis: {},
                        legend: {
                            data: keyArray
                        },
                        series
                    }

                    const E = echarts.init(this.$refs.echarts)
                    E.setOption(option)

                    // 用户图
                    const userOption = {
                        legend: {
                            // 图例文字颜色
                            textStyle: {
                                color: "#333",
                            },
                        },
                        grid: {
                            left: "20%",
                        },
                        // 提示框
                        tooltip: {
                            trigger: "axis",
                        },
                        xAxis: {
                            type: "category", // 类目轴
                            data: data.userData.map(item => item.date),
                            axisLine: {
                                lineStyle: {
                                    color: "#17b3a3",
                                },
                            },
                            axisLabel: {
                                interval: 0,
                                color: "#333",
                            },
                        },
                        yAxis: [{
                            type: "value",
                            axisLine: {
                                lineStyle: {
                                    color: "#17b3a3",
                                },
                            },
                        }, ],
                        color: ["#2ec7c9", "#b6a2de"],
                        series: [{
                            name: '新增用户',
                            data: data.userData.map(item => item.new),
                            type: 'bar'
                        }, {
                            name: '活跃用户',
                            data: data.userData.map(item => item.active),
                            type: 'bar'
                        }],
                    }

                    const U = echarts.init(this.$refs.userEcharts)
                    U.setOption(userOption)

                    // 饼图
                    const videoOption = {
                        tooltip: {
                            trigger: "item",
                        },
                        color: [
                            "#0f78f4",
                            "#dd536b",
                            "#9462e5",
                            "#a6a6a6",
                            "#e1bb22",
                            "#39c362",
                            "#3ed1cf",
                        ],
                        series: [{
                            data: data.videoData,
                            type: 'pie'
                        }],
                    }
                    const V = echarts.init(this.$refs.videoEcharts)
                    V.setOption(videoOption)

                }
                console.log(res)
            })
        },

    }
</script>

<style lang="less">

</style>