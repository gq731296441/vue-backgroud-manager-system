<template>
    <el-container>
        <!-- 侧边栏 -->
        <el-aside width="auto">
            <!-- 侧边栏组件 -->
            <common-aside></common-aside>
        </el-aside>
        <el-container>
            <!-- 头部区域 -->
            <el-header>
                <!-- 头部组件 -->
                <common-header></common-header>
            </el-header>
            <!-- 主内容区域 -->
            <el-main>
                <!-- Main路由下的子路由位置 侧边栏点击后的组件显示位置-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import commonAside from '@/components/common/commonAside.vue'
import CommonHeader from '@/components/common/CommonHeader.vue'


export default {
    dtat() {
        return {

        }
    },
   components: {
    commonAside,
    CommonHeader
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