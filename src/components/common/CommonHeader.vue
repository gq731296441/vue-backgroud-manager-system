<template>
  <header>
      <div class="left-container">
        <!-- 左侧按钮 -->
          <el-button icon="el-icon-menu" size="mini" plain ></el-button>
          <!-- 面包屑 -->
          <h3 style="color: #fff">首页</h3>
      </div>

      <div class="right-container">
        <!-- 右侧头像的下拉菜单 -->
        <el-dropdown trigger="click" size="mini">
          <!-- 触发下拉菜单的对象 -->
          <span>
            <img class="user" :src="userImg">
          </span>
          <!-- 下拉菜单 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

  </header>
</template>

<script>
// import bus from '@/eventBus.js'

export default {
  data () {
    return {
      userImg: require('@/assets/images/user.png'),
      isCollapse: false
    }
  },
  methods: {
    // sendMsg () {
    //   this.isCollapse = !this.isCollapse
    //   bus.$emit('asideInfo', this.isCollapse)
    // }
  }
}
</script>

<style lang="less" scoped>

header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;

  .left-container {
    display: flex;
    align-items: center;

    .el-button {
      margin-right: 20px;
    }
  }

  .right-container {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}

</style>