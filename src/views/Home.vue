<template>
    <el-container>
        <!-- 侧边栏 -->
        <el-aside width="auto">
            <!-- 侧边栏组件 -->
            <common-aside></common-aside>
        </el-aside>
        <el-container>
            <!-- 头部区域 -->
            <el-header>Header</el-header>
            <!-- 主内容区域 -->
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
import commonAside from '@/common/commonAside.vue'



export default {
    dtat() {
        return {

        }
    },
   components: {
    commonAside
   }
}
</script>

<style lang="less" scoped>
    .el-container {
        height: 100%;
    }

    .el-aside {
        height: 100%;
    }

    .el-header {
        background-color: black;
        color: white
    }

    .el-main {
        padding-top: 0;
    }
</style>