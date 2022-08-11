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
          <el-card style="height: 280px">
            123
          </el-card>
        </div>
        <!-- 柱状图和饼状图 -->
        <div class="graph">
          <el-card style="height: 260px">
            123
          </el-card>
          <el-card style="height: 260px">
            123
          </el-card>
        </div>
      </el-col>

    </el-row>
  </el-row>
    
</template>

<script>
import { getMenu } from '@/axios/data.js'

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
    }
  },
  created () {
    getMenu().then(res => {
      console.log(res);
    })
  }
}
</script>

<style lang="less" scoped>

</style>