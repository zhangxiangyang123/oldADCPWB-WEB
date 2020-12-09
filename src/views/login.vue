<template>

    <div class="login">
        <div class="loginBox">
            <div class="log_img">
                <img src="../assets/images/logon/logo.png" alt />
            </div>
            <div class="log_cont">
                <div class="logo_fimg"><img src="../assets/images/logon/logi_fimg.png" alt /></div>
                <div class="login_form">
                    <h4>欢迎登陆</h4>
                    <div class="login-wrap">
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="30px" class="demo-ruleForm">
                            <el-form-item label="" prop="username">
                                <img src="../assets/images/logon/icon_user.png" alt="">
                                <!-- <hr> -->
                                <el-input title="用户名/手机号" type="username" v-model="ruleForm.username" οnmοuseοver="this.title=this.value" placeholder="请输入用户名"></el-input>
                            </el-form-item>
                            <el-form-item label="" prop="password">
                                <img src="../assets/images/logon/icon_passwd.png" alt="">
                                <!-- <hr> -->
                                <el-input type="password" v-model="ruleForm.password" onkeyup="value=value.replace(/[\W]/g,'') " autocomplete="off" placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item label="" prop="verifyCode" class="code">
                                <!-- <hr>
                                <img src="../assets/images/logon/icon_code.png" alt="">
                                <el-input v-model="ruleForm.code" autocomplete="off" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                                <img class="code_img" alt style="margin-right:1px;margin-left:0;margin-top:1px" /> -->
                                <img src="../assets/images/logon/icon_code.png" alt="">
                                <!-- <hr> -->
                                <el-col :span="14">
                                    <el-input placeholder="请输入验证码" v-model="ruleForm.verifyCode" @keyup.enter.native="submitForm('ruleForm')" style="width:145px;">
                                    </el-input>
                                </el-col>
                                <el-col :span="8">
                                    <div class="login-code" @click="refreshCode">
                                        <v-sidentify :identifyCode="identifyCode"></v-sidentify>
                                    </div>
                                </el-col>
                            </el-form-item>
                            <!-- <div class="logo_ac"><input type="checkbox" v-model="ruleForm.checked" /> 我接受《中国汽车技术研究中心》的规定</div> -->
                            <el-form-item prop="checked">
                                <el-checkbox-group v-model="ruleForm.checked" class="checkStyle">
                                    <el-checkbox name="checked">我接受《中国汽车技术研究中心》的规定</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item class="btn_login">
                                <el-button type="primary" @click="submitForm('ruleForm')" @keyup.enter.native="submitForm('ruleForm')">登录</el-button>
                                <div class="link">
                                    <!-- <router-link to="/registe">点击我注册</router-link> -->
                                    <!-- <router-link to="/modify">忘记密码</router-link> -->
                                    <router-link to="/retrievePassword">忘记密码</router-link>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Notification } from "element-ui";
import Sidentify from '@/components/Sidentify'
import { login, verifyCode } from "@/api/login"
//base64解密
import { Base64 } from "js-base64";
export default {
    name: "login",
    data() {
        //校验验证码
        const verifyCode = (rule, value, callback) => {
            let newVal = value.toLowerCase()
            let identifyStr = this.identifyCode.toLowerCase()
            if (newVal === '') {
                callback(new Error('请输入验证码'))
            } else if (newVal !== identifyStr) {
                console.log('validateVerifycode:', value)
                callback(new Error('验证码不正确'))
            } else {
                callback()
            }
        };
        return {
            ruleForm: {
                username: "",
                password: "",
                verifyCode: "",
                checked: [],
                identifyCode: ""
            },
            identifyCodes: '1234567890abcdefjhijklmnopqrstuvwxyz',
            identifyCode: "",
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
                    { min: 1, max: 20, message: '长度在 1 到 20 位字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
                    // { min: 8, max: 10, message: '长度在 8 到 10 位字符', trigger: 'blur' }
                ],
                verifyCode: [{ validator: verifyCode, trigger: ['blur', 'change'] }],
                checked: [
                    { required: true, message: '请勾选我接受《中国汽车技术研究中心》的规定', trigger: ['blur', 'change'] }
                ],
            }
        };
    },
    created() {

    },
    components: {
        'v-sidentify': Sidentify
    },
    computed: {
    },
    mounted() {
        // 初始化验证码
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
        // this.verifyCode()
    },
    watch: {},
    methods: {
        //获取验证码
        // verifyCode() {
        //     verifyCode().then((res) => {
        //         console.log('验证码', res);
        //     })
        // },
        // 重置验证码
        refreshCode() {
            this.identifyCode = ''
            this.makeCode(this.identifyCodes, 4)
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
            }
            console.log(this.identifyCode);
        },
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        },
        submitForm() {
            const param = {
                username: Base64.encode(this.ruleForm.username),
                password: Base64.encode(this.ruleForm.password),
                verifyCode: '',
                loginType: 0,
            }
            this.$refs.ruleForm.validate(valid => {
                if (!valid) return;
                login(param).then((res) => {
                    console.log('res', res);
                    if (res.data.ok == false) return this.$message.error('您输入的帐号或密码有误')
                    this.$message.success('登陆成功')
                    // window.sessionStorage.setItem('token', res.data.token);
                    this.$router.push({ name: 'home' })
                })
            })
        },
        resetForm: function (formName) {
            this.$refs[formName].resetFields();
        },
        open4: function (message) {
            this.$notify.error({
                title: "错误",
                message: message
            });
        }
    }
};
</script>
<style scoped lang="less">
.checkStyle {
    height: 30px;
}
.login {
    box-sizing: border-box;
    min-width: 100%;
    height: 100%;
    background: url(../assets/images/logon/logo_bg.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
}
.log_img {
    margin: 0 auto;
    // padding-top: 58px;
    img {
        display: block;
        margin: 0 auto;
    }
}
.log_cont {
    width: 920px;
    margin: 33px auto;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    justify-items: center;
    .logo_fimg {
        width: 510px;
        height: 400px;
        background: rgba(255, 255, 255, 1);
        border: 10px solid rgba(255, 255, 255, 0.95);
        box-shadow: 0px 17px 16px 0px rgba(24, 94, 131, 0.34);
        border-radius: 6px 0px 0px 6px;
        img {
            width: 501px;
            height: 400px;
            background-size: 100% 100%;
        }
    }
    .login_form {
        width: 378px;
        height: 400px;
        background: rgba(255, 255, 255, 1);
        border: 10px solid rgba(255, 255, 255, 0.95);
        box-shadow: 0px 17px 16px 0px rgba(24, 94, 131, 0.34);
        border-radius: 0px 6px 6px 0px;
        h4 {
            text-align: center;
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(68, 67, 67, 1);
        }
    }
}

/deep/.login-wrap {
    width: 378px;
    border-radius: 0px 6px 6px 0px;
    .el-form-item {
        position: relative;
        margin-bottom: 16px;
        .el-input {
            width: 274px;
            padding-left: 47px !important;
            border-radius: 0px;
            border: 1px solid rgba(210, 210, 210, 1);
            .el-input__inner {
                border: none;
                box-shadow: 0 0 0px 1000px white inset !important;
            }
        }
        img {
            position: absolute;
            margin-top: 4px;
            margin-left: 6px;
        }
        // hr {
        //     position: absolute;
        //     width: 0px;
        //     height: 35px;
        //     border: none;
        //     background-color: rgba(206, 206, 206, 1);
        //     margin-left: 47px;
        //     margin-top: 4px;
        // }
    }
}
.wechat-login {
    text-align: right;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.2);
    span {
        color: rgba(254, 78, 15, 1);
    }
}
/deep/.el-button--primary {
    margin: 0 auto;
    margin-top: 20px;
    color: #fff;
    width: 322px;
    height: 44px;
    background: rgba(34, 159, 255, 1);
    box-shadow: 0px 8px 16px 0px rgba(0, 142, 232, 0.31);
}
// .logo_ac {
//     width: 262px;
//     margin-left: 28px;
//     font-size: 12px;
//     font-family: PingFang SC;
//     font-weight: 500;
//     color: rgba(167, 167, 167, 1);
//     input {
//         vertical-align: middle;
//     }
// }
.link {
    // margin: 10px auto;
    width: 312px;
    overflow: hidden;
    // display: flex;
    text-align: right;
    justify-content: space-between;
    justify-items: center;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(167, 167, 167, 1);
}
.link a {
    text-decoration: none;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(167, 167, 167, 1);
}
</style>
