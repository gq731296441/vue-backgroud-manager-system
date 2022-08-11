<template>

  <el-row class="home">
    <!-- 第一行 就一行 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <!-- 第一列  -->
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="user">
            <img :src="userImg">
            <div class="userInfo">
              <p class="name">Admin</p>
              <p class="acess">超级管理员</p>
            </div>    
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2017-8-8</span></p>
            <p>上次登录地点：<span>北京</span></p>
          </div>
        </el-card>

        <el-card style="margin-top: 20px; height: 400px;">
            <el-table :data="tableData">
            <!-- 注意这里的v-for循环，循环的源数据是一个对象对象的每个属性都是一个键值对，val就表示值，key表示键 -->
              <el-table-column 
                v-for="(item, key) in tableLabel" 
                :key="key"
                :label="item"
                :prop="key"
              >
              </el-table-column>
            </el-table>
        </el-card>

      </el-col>

      <!-- 第二列 -->
      <el-col :span="16">
        <!-- 订单数量显示 -->
        <div class="num">
          <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
            <i class="icon" :class="'el-icon-' + item.icon" :style="{ background: item.color }"></i>
            <div class="detail">
              <p class="num">{{ item.value }}</p>
              <p class="txt">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <!-- 折线图 -->
        <div>
          <el-card style="height: 250px">
            <!-- <div style="height: 250px" ref="myLineCharts"></div> -->
            <ECharts :chartData="chartData.order" style="height: 250px"></ECharts>
          </el-card>
        </div>
        <!-- 柱状图和饼状图 -->
        <div class="graph">
          <el-card style="height: 300px">
            <!-- <div style="height: 300px" ref="userCharts"></div> -->
            <ECharts :chartData="chartData.user" style="height: 300px"></ECharts>
          </el-card>
          <el-card style="height: 300px">
            <!-- <div style="width: 100%; height: 260px; margin: 0; padding: 0; " ref="videoCharts"></div> -->
            <ECharts :chartData="chartData.video" :isAxisChart="false" style="height: 300px"></ECharts>
          </el-card>
        </div>
      </el-col>

    </el-row>
  </el-row>
    
</template>

<script>
// import { getMenu } from '@/api/data.js'
import { getData } from '@/api/data.js'
// import * as echarts from 'echarts'
import ECharts from '@/components/ECharts'




export default {
  data() {
    return {
      userImg: require('@/assets/images/user.png'),
      tableData: [
          {
            name: 'oppo',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          },
          {
            name: 'vivo',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          },
          {
            name: '苹果',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          },
          {
            name: '小米',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          },
          {
            name: '三星',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          },
          {
            name: '魅族',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          }
        ],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      chartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    }
  },
  methods: {
    // async getAllData () {
    //   const { data: res } = await getData()
    //   console.log(res);
    // }
  },
  components: {
    ECharts,

},
  created () {
    // getMenu().then(res => {
    //   console.log(res);
    // })
      // 获取数据
      getData().then(res => {
        // 获取表格中的数据
        const { code, data } = res.data
        if (code === 20000) {
          this.tableData = data.tableData
        }
        
        // 折线图的实现
        const order = data.orderData
        // const xData = order.date
        const keyArray = Object.keys(order.data[0])

        // console.log(order.data);
        const series = []

        keyArray.forEach(key => {
          series.push(
            {
              name: key,
              type: 'line',
              data: order.data.map(item => item[key])
            }
          )
        })

        // const options = {
        //   xAxis: {
        //     data: xData
        //   },
        //   yAxis: {},
        //   legend: {
        //     data: keyArray
        //   },
        //   series
        // }
        // const myLineCharts = echarts.init(this.$refs.myLineCharts)
        // myLineCharts.setOption(options)
        this.chartData.order.xData = order.date
        this.chartData.order.series = series


        // 柱状图的实现
        // const userOptions = {
        //   legend: {
        //     // 图例文字颜色
        //     textStyle: {
        //       color: "#333",
        //     },
        //     data: ['新增用户', '活跃用户']
        //   },
        //   grid: {
        //     left: "20%",
        //   },
        //   // 提示框
        //   tooltip: {
        //     trigger: "axis",
        //   },
        //   xAxis: {
        //     type: "category", // 类目轴
        //     // 获取x轴的数据
        //     data: data.userData.map(item => item.date),
        //     axisLine: {
        //       lineStyle: {
        //         color: "#17b3a3",
        //       },
        //     },
        //     axisLabel: {
        //       interval: 0,
        //       color: "#333",
        //     },
        //   },
        //   yAxis: [
        //     {
        //       type: "value",
        //       axisLine: {
        //         lineStyle: {
        //           color: "#17b3a3",
        //         },
        //       },
        //     },
        //   ],
        //   color: ["#2ec7c9", "#b6a2de"],
        //   series: [
        //     {
        //       name: '新增用户',
        //       type: 'bar',
        //       data: data.userData.map(item => item.new)
        //     },
        //     {
        //       name: '活跃用户',
        //       type: 'bar',
        //       data: data.userData.map(item => item.active)

        //     }
        //   ],
        // }

        // const userChart = echarts.init(this.$refs.userCharts)
        // userChart.setOption(userOptions)

        this.chartData.user.xData = data.userData.map(item => item.date)
        this.chartData.user.series = [
            {
              name: '新增用户',
              type: 'bar',
              data: data.userData.map(item => item.new)
            },
            {
              name: '活跃用户',
              type: 'bar',
              data: data.userData.map(item => item.active)
            }
        ]

        // 饼状图的实现
        // const videoOptions = {
        //   tooltip: {
        //     trigger: "item",
        //   },
        //   color: [
        //     "#0f78f4",
        //     "#dd536b",
        //     "#9462e5",
        //     "#a6a6a6",
        //     "#e1bb22",
        //     "#39c362",
        //     "#3ed1cf",
        //   ],
        //   series: [
        //     {
        //       type: 'pie',
        //       data: data.videoData
        //     }
        //   ],
        // }

        // const videoCharts = echarts.init(this.$refs.videoCharts)
        // videoCharts.setOption(videoOptions)

        this.chartData.video.series = [
            {
              type: 'pie',
              data: data.videoData
            }
        ]

      })


      // this.getAllData()
  }
}
</script>

<style lang="less" scoped>

</style>