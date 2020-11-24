<template>
    <div class="permission">
        <a-form-model ref="ruleForm" :model="model" :rules="rules" :label-col="{span: 3}" :wrapper-col="{span: 21}" labelAlign="right">
            <a-form-model-item has-feedback label="角色名称" prop="roleName">
                <a-input placeholder="请输入角色名称" v-model="model.roleName" allowClear />
            </a-form-model-item>
            <a-form-model-item has-feedback label="角色描述" prop="description">
                <a-input placeholder="请输入角色描述" v-model="model.description" allowClear />
            </a-form-model-item>
            <a-form-model-item has-feedback label="角色权限" prop="roles">
                <a-spin :spinning="loading">
                    <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="handleCheckAll" >全部选择</a-checkbox>
                    <template v-for="(item, index) in roleData">
                        <my-check :key="index" :data="item" @change="changeSelect" />
                    </template>
                </a-spin>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{span: 14, offset: 3}">
                <a-button type="primary" @click="save">保存设置</a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>
<script>
import myCheck from './myCheck'
import roleList from './roleData'
export default {
    name: 'permission',
    data () {
        return {
            roleData: [],
            loading: false,
            model: {
                roleName: '',
                description: '',
                roles: []
            },
            rules: {
                roleName: [
                    {required: true, message: '请输入角色名称', trigger: 'blur'}
                ]
            },
            indeterminate: false,
            checkAll: false
        }
    },
    components: {
        myCheck
    },
    methods: {
        init () {
            this.loadData()
        },
        loadData () {
            this.loading = true
            setTimeout(() => {
                this.roleData = roleList
                this.loading = false
            }, 1000)
        },
        changeSelect () {
            let { roleData } = this
            let arr = roleData.filter(i => i.checked.length)
            this.indeterminate = arr.length !== 0
            let brr = roleData.filter(i => i.checkAll)
            this.checkAll = brr.length === roleData.length
            if (brr.length === roleData.length) {
                this.indeterminate = false
            }
        },
        handleCheckAll (e) {
            let { roleData } = this
            let { checked } = e.target
            if (checked) {
                roleData.forEach(i => {
                    i.checkAll = true
                    i.checked = i.children.map(i => i.value)
                })
            } else {
                roleData.forEach(i => {
                    i.checkAll = false
                    i.checked = []
                    i.indeterminate = false
                })
            }
            this.indeterminate = false
            this.checkAll = checked
        },
        save () {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.$root.$emit('closePage', this.$route.path)
                }
            })
        }
    },
    created () {
        this.init()
    }
}
</script>
<style lang="less">
.permission {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px;
}
</style>
