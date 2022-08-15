<template>
    <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        label-width="100px"
        class="login_container"
    >

    <h3 class="login_title">系统登录</h3>
    <!-- 用户账号输入 -->
        <el-form-item
            class="username"
            label="用户名"
            label-width="80px"
            prop="username"
        >
            <el-input
                type="text"
                v-model="form.username"
                autocomplete="off"
                placeholder="请输入账号"
            ></el-input>
        </el-form-item>

        <!-- 用户密码输入 -->
        <el-form-item
            label="密码"
            prop="password"
            label-width="80px"
            class="password"
        >
            <el-input
                type="password"
                v-model="form.password"
                autocomplete="off"
                placeholder="请输入密码"
            ></el-input>
        </el-form-item>


        <!-- 提交按钮 -->
        <el-form-item class="login_submit">
            <el-button type="primary" @click="login" class="login_submit">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
// import Mock from 'mockjs'
import { getMenu } from '@/api/data.js'

export default {
    name: 'login',
    data () {
        return {
            form: {},
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {min: 3, message: "用户名长度不能小于3位", trigger: 'blur'}
                ],
                password: [
                    {required: true, message: "请输入密码", trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        login () {
            // 模拟token
            // const token = Mock.Random.guid()
            // this.$store.commit('setToken', token)
            // this.$router.push({name: 'home'})

            // 将登录的suername和密码通过post发送到后端
            getMenu(this.form).then(({ data: res }) => {
                // console.log(res);
                if (res.code === 20000) {
                    this.$store.commit('clearMenu')
                    this.$store.commit('setMenu', res.data.menu)
                    // 拿到后端返回的token并存储
                    this.$store.commit('setToken', res.data.token)
                    this.$store.commit('addMenu', this.$router)
                    this.$router.push({name: 'home'})
                }else{
                    // 使用elementui的￥message抛出异常
                    this.$message.warning(res.data.message)
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .login_container {
        width: 350px;
        margin: 180px auto;
        border: 1px solid #eaeaea;
        border-radius: 35px;
        padding: 35px 35px;
        background-clip: padding-box;
        box-shadow: 0 0 25px #cac6c6;

        .login_title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458
        }

        .login_submit {
            margin: 10px auto 0 auto;
        }
    }

</style>