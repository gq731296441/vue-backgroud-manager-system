<template>
    <!-- 通用的侧边组件栏 -->
    <div class="myMenu">
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> -->

        <el-menu 
            default-active="1-4-1" 
            class="el-menu-vertical-demo" 
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            @open="handleOpen" 
            @close="handleClose" 
            :collapse="isCollapse"
        >
        <!-- 系统命名 -->
        <h3>{{ isCollapse ? '后台' : '电商后台管理系统' }}</h3>

        <!-- 没有children的菜单 -->
            <el-menu-item v-for="item in noChildren" :key="item.path" :index="item.path" @click="clickMenu(item)">
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>

        <!-- 有子菜单的选项 -->
            <el-submenu v-for="item in hasChildren" :key="item.path" :index="item.path + ''">

                <template slot="title">
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{ item.label }}</span>
                </template>

                <el-menu-item-group v-for="subItem in item.children" :key="subItem.path" >
                    <el-menu-item :index="subItem.path" @click="clickMenu(subItem)">{{ subItem.label }}</el-menu-item>
                </el-menu-item-group>

            </el-submenu>


        </el-menu>
    </div>
</template>

<script>
// import bus from '@/eventBus.js'


export default {
    data() {
      return {
        // isCollapse: false,
        menu: [
         
        ]
      };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickMenu (item) {
            this.$router.push({name: item.name}).catch(err => {err})
            // 面包屑： 将点击的当前菜单的属性送入vuex的模块中
            this.$store.commit('selectMenu', item)
        }
    },
    computed: {
        // 获取后端返回的，存在state中的menu
        asyncMenu () {
            return this.$store.state.tab.menu
        },
        noChildren() {
            return this.asyncMenu.filter(item => !item.children)
        },
        hasChildren () {
            return this.asyncMenu.filter(item => item.children)
        },
        isCollapse () {
            return this.$store.state.tab.isCollapse
        }, 
    },
    created () {
    }
}
</script>

<style lang="less" scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    .myMenu {
        height: 100vh;

        .el-menu {
        height: 100vh;
        border: none;

        h3 {
            color: #fff;
            text-align: center;
            line-height: 48px;
        }

    }
    }

   

</style>