<template>
    <a-modal v-model="visible" :title="title" ok-text="确定" cancel-text="取消" @cancel="cancel" @ok="ok" width="800px" wrapClassName="employee-panel">
        <a-form-model ref="ruleForm" :model="model" :rules="rules"  labelAlign="right">
            <a-row :gutter="[40, 10]">
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="用户名" prop="userName">
                        <a-input placeholder="请输入用户名" v-model="model.userName" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="密码" prop="password">
                        <a-input placeholder="请输入密码" type="password" v-model="model.password" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="姓名" prop="employeeName">
                        <a-input placeholder="请输入姓名" v-model="model.employeeName" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="性别" prop="sexId">
                        <a-select placeholder="请选择性别" allowClear @change="selectSex" v-model="model.sexId">
                            <a-select-option v-for="item in sexOptions" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="手机号" prop="phone">
                        <a-input placeholder="请输入手机号" v-model="model.phone" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="出生日期" prop="birthday">
                        <my-date placeholder="请选择出生日期" v-model="model.birthday" style="width: 100%;" />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="邮箱" prop="email">
                        <a-input placeholder="请输入邮箱" v-model="model.email" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="所属医院" prop="hospitalId">
                        <a-select placeholder="请选择医院" allowClear @change="selectHospital" v-model="model.hospitalId">
                            <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="所属角色" prop="roleId">
                        <a-select placeholder="请选择角色" allowClear @change="selectRole" v-model="model.roleId">
                            <a-select-option v-for="item in roleList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <a-form-model-item has-feedback label="上传头像" prop="photo"></a-form-model-item>
                </a-col>
            </a-row>
        </a-form-model>
    </a-modal>
</template>
<script>
import myDate from '@/views/components/myDate/index'
export default {
    props: {
        type: {
            type: String, // add edit
            default: 'add'
        },
        dialogVisible: Boolean,
        data: Object
    },
    data () {
        return {
            visible: false,
            model: {
                userName: '',
                password: '',
                employeeName: '',
                sex: '',
                sexId: undefined,
                phone: '',
                birthday: null,
                email: '',
                hospital: '',
                hospitalId: undefined,
                role: '',
                roleId: undefined,
                photo: []
            },
            rules: {
                userName: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ],
                employeeName: [
                    {required: true, message: '请输入姓名', trigger: 'blur'}
                ],
                phone: [
                    {required: true, message: '请输入手机号', trigger: 'blur'}
                ],
                hospitalId: [
                    {required: true, message: '请选择医院', trigger: 'change'}
                ],
                roleId: [
                    {required: true, message: '请选择角色', trigger: 'change'}
                ]
            },
            sexOptions: [{
                label: '男',
                value: '1'
            }, {
                label: '女',
                value: '2'
            }],
            hospitalList: [{
                label: '浙江省人民医院',
                value: '1'
            }, {
                label: '安徽省中医院',
                value: '2'
            }],
            roleList: [{
                label: '管理老师',
                value: '1'
            }, {
                label: '管理老师——客户',
                value: '2'
            }]
        }
    },
    computed: {
        title () {
            return this.type === 'add' ? '添加员工' : '编辑员工'
        }
    },
    components: {
        myDate
    },
    methods: {
        cancel () {
            this.$emit('update:dialogVisible', false)
        },
        ok () {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    console.log(this.model)
                    this.$emit('update:dialogVisible', false)
                }
            })
        },
        selectSex (val) {
            let obj = this.sexOptions.find(i => i.value === val)
            this.model.sex = obj ? obj.label : ''
        },
        selectHospital (val) {
            let obj = this.hospitalList.find(i => i.value === val)
            this.model.hospital = obj ? obj.label : ''
        },
        selectRole (val) {
            let obj = this.roleList.find(i => i.value === val)
            this.model.role = obj ? obj.label : ''
        }
    },
    watch: {
        dialogVisible: {
            handler (val) {
                this.visible = val
            },
            immediate: true
        }
    }
}
</script>
<style lang="less">
.employee-panel {
    .ant-form-item {
        display: flex;
        flex-direction: row;
        .ant-form-item-label {
            width: 100px;
        }
        .ant-form-item-control-wrapper {
            flex: 1;
        }
    }
}
</style>
