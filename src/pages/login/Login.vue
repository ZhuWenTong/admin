<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <!-- <img alt="logo" class="logo" src="@/assets/img/logo.png" /> -->
        <i class="iconfont icon-fly"></i>
        <span class="title">{{systemName}}</span>
      </div>
      <!-- <div class="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div> -->
    </div>
    <div class="login">
      <a-form @submit="onSubmit" :form="form">
        <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
          <a-tab-pane tab="账户密码登录" key="1">
            <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
            <a-form-item>
              <a-input
                autocomplete="autocomplete"
                size="large"
                placeholder="admin"
                v-decorator="['name', {rules: [{ required: true, message: '请输入账户名', whitespace: true}]}]"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                size="large"
                placeholder="888888"
                autocomplete="autocomplete"
                type="password"
                v-decorator="['password', {rules: [{ required: true, message: '请输入密码', whitespace: true}]}]"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane tab="手机号登录" key="2">
            <a-form-item>
              <a-input size="large" placeholder="mobile number" >
                <a-icon slot="prefix" type="mobile" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-row :gutter="8" style="margin: 0 -4px">
                <a-col :span="16">
                  <a-input size="large" placeholder="captcha">
                    <a-icon slot="prefix" type="mail" />
                  </a-input>
                </a-col>
                <a-col :span="8" style="padding-left: 4px">
                  <a-button style="width: 100%" class="captcha-button" size="large">获取验证码</a-button>
                </a-col>
              </a-row>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <div>
          <a-checkbox :checked="true" >自动登录</a-checkbox>
          <a style="float: right">忘记密码</a>
        </div>
        <a-form-item>
          <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">登录</a-button>
        </a-form-item>
        <div>
          <!-- 其他登录方式
          <a-icon class="icon" type="alipay-circle" />
          <a-icon class="icon" type="taobao-circle" />
          <a-icon class="icon" type="weibo-circle" /> -->
          <router-link style="float: right" to="/register" >注册账户</router-link>
        </div>
      </a-form>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from '@/layouts/CommonLayout'
// import {login, getRoutesConfig} from '@/services/user'
import {setAuthorization} from '@/utils/request'
import {loadRoutes} from '@/utils/routerUtil'
import {mapMutations} from 'vuex'

export default {
  name: 'Login',
  components: {CommonLayout},
  data () {
    return {
      logging: false,
      error: '',
      form: this.$form.createForm(this)
    }
  },
  computed: {
    systemName () {
      return this.$store.state.setting.systemName
    }
  },
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          this.logging = true
          // const name = this.form.getFieldValue('name')
          // const password = this.form.getFieldValue('password')
          // login(name, password).then(this.afterLogin)
          let data = {
            user: {
              name: '文通'
            },
            token: 'Authorization:' + 1234567890,
            expireAt: new Date(new Date().getTime() + 30 * 60 * 1000),
            permissions: [{id: 'queryForm', operation: ['add', 'edit']}],
            roles: [{id: 'admin', operation: ['add', 'edit', 'delete']}]
          }
          let result = {
            data: {
              code: 0,
              message: '欢迎回来',
              data
            }
          }
          this.afterLogin(result)
        }
      })
    },
    afterLogin(res) {
      this.logging = false
      const loginRes = res.data
      if (loginRes.code >= 0) {
        const {user, permissions, roles} = loginRes.data
        this.setUser(user)
        this.setPermissions(permissions)
        this.setRoles(roles)
        setAuthorization({token: loginRes.data.token, expireAt: new Date(loginRes.data.expireAt)})
        // 获取路由配置
        // getRoutesConfig().then(result => {
        //   console.log(result)
        //   // const routesConfig = result.data.data
          
        // })
        const routesConfig = [{
            router: 'root',
            children: [{
              router: 'home'
            }, {
              router: 'orderManage',
              children: ['orderList', 'comments', 'complaints', 'orderDetail']
            }, {
              router: 'workerManage',
              children: ['list', 'group', 'perfectly', 'teamOrders', 'deposit', 'disciplinary', 'borrow', 'references']
            }, {
              router: 'basicData',
              children: ['hospital', 'serve', 'employee', 'sickbed', 'basicinfo', 'customer', 'customerDetails']
            }, {
              router: 'statistics',
              children: ['waterTable', 'income', 'dispatch', 'department', 'departmentDetails', 'settlement', 'advance', 'attendance', 'dailyReport', 'fieldWork']
            }, {
              router: 'collect',
              children: ['interimSettle', 'incomeDetails', 'incomeConfirm', 'salary', 'salaryDetails', 'salaryAudit', 'payroll', 'payback']
            }, {
              router: 'roleManage',
              children: ['role', 'permission']
            }, {
              router: 'demo',
              children: []
            }]
          }]
          loadRoutes(routesConfig)
          this.$router.push('/home')
          this.$message.success(loginRes.message, 3)
      } else {
        this.error = loginRes.message
      }
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
      .desc {
        font-size: 14px;
        color: @text-color-second;
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }
    .login{
      width: 368px;
      margin: 0 auto;
      @media screen and (max-width: 576px) {
        width: 95%;
      }
      @media screen and (max-width: 320px) {
        .captcha-button{
          font-size: 14px;
        }
      }
      .icon {
        font-size: 24px;
        color: @text-color-second;
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: @primary-color;
        }
      }
    }
  }
</style>
