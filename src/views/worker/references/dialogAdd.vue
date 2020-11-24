<template>
    <a-modal v-model="visible" title="添加" ok-text="确定" cancel-text="取消" @cancel="cancel" @ok="ok" width="400px">
        <a-form-model ref="ruleForm" :model="model" :rules="rules" :label-col="{span: 8}" :wrapper-col="{span: 16}" labelAlign="right">
            <a-form-model-item has-feedback label="所属医院" prop="hospital">
                <a-select placeholder="请选择医院" allowClear @change="selectHospital" v-model="model.hospitalId">
                    <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item has-feedback label="介绍人类型" prop="referencesTypeId">
                <a-select placeholder="请选择介绍人类型" allowClear @change="selectRefType" v-model="model.referencesTypeId">
                    <a-select-option v-for="item in refTypeOptions" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item has-feedback label="介绍人姓名" prop="referencesName">
                <a-input placeholder="请输入介绍人姓名" v-model="model.referencesName" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="联系方式" prop="phone">
                <a-input placeholder="请输入联系方式" v-model="model.phone" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="新护工姓名" prop="newWorkerId">
                <a-select placeholder="请选择新护工" allowClear @change="selectNewWorker" v-model="model.newWorkerId">
                    <a-select-option v-for="item in newWorkerList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </a-form-model-item>
        </a-form-model>
    </a-modal>
</template>
<script>
export default {
    props: {
        dialogVisible: Boolean
    },
    data () {
        return {
            visible: false,
            hospitalList: [{
                label: '浙江省人民医院',
                value: '1'
            }, {
                label: '安徽省中医院',
                value: '2'
            }],
            refTypeOptions: [{
                label: '公司护工',
                value: '1'
            }, {
                label: '本院护工',
                value: '2'
            }],
            newWorkerList: [{
                label: '张三',
                value: 'zs'
            }, {
                label: '李四',
                value: 'lisi'
            }],
            model: {
                hospitalId: undefined,
                hospital: '',
                referencesTypeId: undefined,
                referencesTypeName: '',
                referencesName: '',
                phone: '',
                newWorkerId: undefined,
                newWorkerName: ''
            },
            rules: {
                hospital: [
                    {required: true, message: '请选择所属医院', trigger: 'blur'}
                ],
                referencesTypeId: [
                    {required: true, message: '请选择介绍人类型', trigger: 'blur'}
                ],
                referencesName: [
                    {required: true, message: '请输入介绍人姓名', trigger: 'blur'}
                ],
                phone: [
                    {required: true, message: '请输入联系方式', trigger: 'blur'}
                ],
                newWorkerId: [
                    {required: true, message: '请选择新护工', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        cancel () {
            this.$emit('update:dialogVisible', false)
        },
        ok () {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.$emit('change', this.model)
                    this.$emit('update:dialogVisible', false)
                }
            })
        },
        selectHospital (val) {
            let obj = this.hospitalList.find(i => i.value === val)
            this.model.hospital = obj ? obj.label : ''
        },
        selectRefType (val) {
            let obj = this.refTypeOptions.find(i => i.value === val)
            this.model.referencesTypeName = obj ? obj.label : ''
        },
        selectNewWorker (val) {
            let obj = this.newWorkerList.find(i => i.value === val)
            this.model.newWorkerName = obj ? obj.label : ''
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
