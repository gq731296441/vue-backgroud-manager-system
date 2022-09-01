<template>

    <div class="login_container">

        <h3 class="login_title">系统登录</h3>

        <div class="changeButton">
            <button class="loginChange" @click="UserloginChange" v-if="userLogin_btn">用户名登录</button>
            <button class="loginChange" @click="PhoneLoginChange" v-if="!userLogin_btn">手机登录</button>
        </div>
        
        <!-- 用户名登录 -->
        <el-form
            :model="form"
            status-icon
            :rules="rules"
            ref="form"
            label-width="100px"
            v-show="userLogin"
        >
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


        <!-- 手机验证码登录 -->
        <el-form
            :model="form_phone"
            status-icon
            :rules="rules_phone"
            ref="form"
            label-width="100px"
            v-show="!userLogin"
        >

        <!-- 用户手机输入 -->
            <el-form-item
                class="phoneNmuber"
                label="手机号"
                label-width="80px"
                prop="phoneNumber"
            >
                <el-input
                    type="text"
                    v-model.number="form_phone.phoneNumber"
                    autocomplete="off"
                    placeholder="请输入手机"
                ></el-input>
            </el-form-item>

            <!-- 用户验证码输入 -->
            <el-form-item
                label="验证码"
                prop="checkCode"
                label-width="80px"
                class="checkCode"
            >   
                <el-col :span="11">
                    <el-input
                        v-model.number="form_phone.checkCode"
                        autocomplete="off"
                        placeholder="验证码"
                    ></el-input>
                </el-col>

                <el-col :span="10">
                    <el-button type="primary" size="mini" class="sendCode" @click="sendCode" v-if="show">发送验证码</el-button>
                    <el-button type="primary" size="mini" class="count" disabled v-if="!show">{{ count }}秒后发送</el-button>
                </el-col>
            </el-form-item>
            <!-- 提交按钮 -->
            <el-form-item class="login_submit">
                <el-button type="primary" @click="login_throttle" class="login_submit">登录</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
// import Mock from 'mockjs'
import { getMenu, getCode } from '@/api/data.js'
import { getMenuByphone } from '@/api/data.js'
import { throttle } from 'echarts'

export default {
    name: 'login',
    data () {
        // 手机号码校验
        var validatorPhone = function (rule, value, callback) {
            if (value === '') {
                callback(new Error('手机号不能为空'))
            } else if (!/^1\d{10}$/.test(value)) {
                callback(new Error('手机号格式错误'))
            } else {
                callback()
            }
        }
        return {
            userLogin: true,
            show: true,
            userLogin_btn: false,
            count: 60,
            timer: '',
            previous: 0,
            form: {},
            form_phone: {},
            code: '',
            rules: {
                username: [
                    // 失去焦点触发校验准则
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {min: 3, message: "用户名长度不能小于3位", trigger: 'blur'}
                ],
                password: [
                    {required: true, message: "请输入密码", trigger: 'blur'}
                ]
            },
            rules_phone: {
                phoneNumber: [
                    {required: true, validator: validatorPhone, trigger: 'blur'},
                ],
                checkCode: [
                    {required: true, message: '验证码不能为空', trigger: 'blur'},
                ]
            }
        
        }
    },
    methods: {
        UserloginChange () {
            console.log(1);
           this.userLogin = true
           this.userLogin_btn = false
        },
        PhoneLoginChange () {
            this.userLogin = false
            this.userLogin_btn = true
        },
        login () {
            // 模拟token
            // const token = Mock.Random.guid()
            // this.$store.commit('setToken', token)
            // this.$router.push({name: 'home'})

            // 将登录的uername和密码通过post发送到后端
            getMenu(this.form).then(({ data: res }) => {
                // 如果请求成功
                if (res.code === 20000) {
                    // 首先清除存储的已有的菜单
                    this.$store.commit('clearMenu')
                    // 重新设置接口返回的菜单
                    this.$store.commit('setMenu', res.data.menu)
                    // 拿到后端返回的token并存储
                    this.$store.commit('setToken', res.data.token)
                    // 根据菜单重新设置路由规则
                    this.$store.commit('addMenu', this.$router)
                    // 跳转到home页面
                    this.$router.push({name: 'home'})
                }else{
                    // 使用elementui的￥message抛出异常
                    this.$message.warning(res.data.message)
                }
            })
        },

        // 节流
        throttle(func, wait) {
            let now = +new Date()
            if (now - this.previous > wait) {
                func.call()
                this.previous = now
            }
        },
        

        // 手机登录按钮
        login_phone() {
            console.log('1');
            if (this.form_phone.phoneNumber === undefined || this.form_phone.phoneNumber === '' ) {
                return this.$message.warning('手机号不能为空')
            }
            if (this.form_phone.checkCode === undefined || this.form_phone.checkCode === '') {
                return this.$message.warning('验证码不能为空')
            }

            console.log(this.form_phone);

            // 发送手机登录请求
            getMenuByphone(this.form_phone).then(({ data: res }) => {
                if (res.code === 20000) {
                    this.$store.commit('clearMenu')
                    this.$store.commit('setMenu', res.data.menu)
                    this.$store.commit('setToken', res.data.token)
                    this.$store.commit('addMenu', this.$router)
                    this.$router.push({name: 'home'})
                }else {
                    this.$message.warning(res.data.message)
                }
            })
        },

        // 手机登录节流
        login_throttle() {
            this.throttle(() => {
                return this.login_phone()
            }, 1500)
        },

        sendCode() {

            if (this.form_phone.phoneNumber === undefined || this.form_phone.phoneNumber === '' ) {
                return this.$message.warning('手机号不能为空')
            }
            // 发送按钮倒计时
            this.show = false
            let MAX_TIME = 59
            this.count = MAX_TIME
            this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= MAX_TIME) {
                    this.count--
                }else {
                    this.show = true
                    clearInterval(this.timer)
                    this.timer = null
                }
            }, 1000);
 

            getCode({
                phoneNumber: this.form_phone.phoneNumber
            }).then(({data: res}) => {
                if (res.code === 20000) {
                    this.code = res.data.checkCode
                    this.form_phone.checkCode = this.code
                }else{
                    this.$message.warning(res.data.message)
                }

            })
         }
    }
}
</script>

<style lang="less" scoped>
    .login_container {
        position: relative;
        width: 350px;
        margin: 180px auto;
        border: 1px solid #eaeaea;
        border-radius: 35px;
        padding: 35px 35px;
        background-clip: padding-box;
        box-shadow: 0 0 25px #cac6c6;


        .changeButton {
           position: absolute;
           right: 0;
           top: 0;
           width: 115px;
           height: 35px;
           text-align: center;
           border-radius: 0 35px 0 35px;
            background-color: #409EFF;
         
           
           .loginChange {
            
                height: 35px;
                border: 0 solid #000;
                border-radius: 35px;
                background-color: transparent;
                color: #fff;
                
           }
        }

        .login_title {
            margin: 0px auto 30px auto;
            text-align: center;
            color: #505458
        }

        .login_submit {
            margin: 10px auto 0 auto;
        }

        .sendCode {
            margin-left: 20px;
        }
        .count {
            margin-left: 20px;
        }
    }

</style>