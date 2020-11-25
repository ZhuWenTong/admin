<template>
    <common-layout>
        <div class="top">
            <div class="header">
                <i class="iconfont icon-fly"></i>
                <span class="title">{{systemName}}</span>
            </div>
        </div>
        <div class="register">
            <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" :label-col="{span: 6}" :wrapper-col="{span: 18}" labelAlign="left">
                <a-form-model-item has-feedback label="用戶名" prop="username">
                    <a-input v-model="ruleForm.username" autocomplete="off" size="large" />
                </a-form-model-item>
                <a-form-model-item has-feedback label="密码" prop="password">
                    <a-input v-model="ruleForm.password" type="password" autocomplete="off" size="large" />
                </a-form-model-item>
                <a-form-model-item has-feedback label="确认密码" prop="checkPassword">
                    <a-input v-model="ruleForm.checkPassword" type="password" autocomplete="off" size="large" />
                </a-form-model-item>
            </a-form-model>
            <a-button :loading="loading" style="width: 100%;margin-top: 24px" size="large" @click="submit" type="primary">注册</a-button>
            <p class="account">
                <span>已经有账号了？</span>
                <span @click="toLogin">登录</span>
            </p>
        </div>
    </common-layout>
</template>
<script>
import CommonLayout from '@/layouts/CommonLayout'
export default {
    data () {
        return {
            ruleForm: {
                username: '',
                password: '',
                checkPassword: ''
            },
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 6, max: 20, message: '密码长度6-20位', trigger: 'blur'}
                ],
                checkPassword: [
                    {required: true, message: '请再次输入密码', trigger: 'blur'},
                    {validator: this.validatePass, trigger: 'blur'}
                ]
            },
            loading: false
        }
    },
    computed: {
        systemName () {
            return this.$store.state.setting.systemName
        }
    },
    components: {
        CommonLayout
    },
    methods: {
        validatePass (rule, value, callback) {
            if (value !== this.ruleForm.password) {
                callback(new Error('两次输入的密码不一致'))
            } else {
                callback()
            }
        },
        submit () {

        },
        toLogin () {
            this.$router.replace('/login')
        }
    }
}
</script>
<style lang="less" scoped>
.common-layout{
    .top {
        text-align: center;
        .header {
            height: 44px;
            line-height: 44px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .icon-fly {
                color: @primary-color;
                font-size: 40px;
                margin-right: 20px;
            }
            .title {
                font-size: 33px;
                color: @primary-color;
                font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
                font-weight: 600;
                position: relative;
                top: 2px;
            }
        }
    }
    .register {
        width: 368px;
        margin: 20px auto 0 auto;
        @media screen and (max-width: 576px) {
            width: 95%;
        }
        @media screen and (max-width: 320px) {
            .captcha-button {
                font-size: 14px;
            }
        }
        .account {
            text-align: center;
            color: @primary-color;
            line-height: 40px;
            span {
                &:first-child {
                    opacity: 0.7;
                }
                &:nth-of-type(2) {
                    cursor: pointer;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
}
</style>
