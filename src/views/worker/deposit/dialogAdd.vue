<template>
    <a-modal v-model="visible" title="添加" ok-text="确定" cancel-text="取消" @cancel="cancel" @ok="ok" width="400px">
        <a-form-model ref="ruleForm" :model="model" :rules="rules" :label-col="{span: 6}" :wrapper-col="{span: 18}" labelAlign="right">
            <a-form-model-item has-feedback label="所属医院" prop="hospital">
                <a-select placeholder="请选择医院" allowClear @change="selectHospital" v-model="model.hospitalId">
                    <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item has-feedback label="护工姓名" prop="workerId">
                <a-select placeholder="请选择护工姓名" allowClear @change="selectWorker" v-model="model.workerId">
                    <a-select-option v-for="item in workerList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item has-feedback label="押金名称" prop="depositId">
                <a-select placeholder="请选择押金名称" allowClear @change="selectDeposit" v-model="model.depositId">
                    <a-select-option v-for="item in depositList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item has-feedback label="押金金额" prop="depositAmount">
                <a-input placeholder="请输入押金金额" v-model="model.depositAmount" type="number" />
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
            model: {
                hospitalId: undefined,
                hospital: '',
                workerId: undefined,
                workerName: '',
                depositId: undefined,
                deposit: '',
                depositAmount: ''
            },
            rules: {
                hospital: [
                    {required: true, message: '请选择所属医院', trigger: 'blur'}
                ],
                workerId: [
                    {required: true, message: '请选择护工姓名', trigger: 'blur'}
                ],
                depositId: [
                    {required: true, message: '请选择押金名称', trigger: 'blur'}
                ],
                depositAmount: [
                    {required: true, message: '请输入押金金额', trigger: 'blur'}
                ]
            },
            hospitalList: [{
                label: '浙江省人民医院',
                value: '1'
            }, {
                label: '安徽省中医院',
                value: '2'
            }],
            workerList: [{
                label: '张三',
                value: 'zs'
            }, {
                label: '李四',
                value: 'lisi'
            }],
            depositList: [{
                label: '押金a',
                value: 'a'
            }, {
                label: '押金b',
                value: 'b'
            }]
        }
    },
    methods: {
        cancel () {
            this.$emit('update:dialogVisible', false)
        },
        ok () {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.$emit('submit', this.model)
                    this.$emit('update:dialogVisible', false)
                }
            })
        },
        selectHospital (val) {
            let obj = this.hospitalList.find(i => i.value === val)
            this.model.hospital = obj ? obj.label : ''
        },
        selectWorker (val) {
            let obj = this.workerList.find(i => i.value === val)
            this.model.workerName = obj ? obj.label : ''
        },
        selectDeposit (val) {
            let obj = this.depositList.find(i => i.value === val)
            this.model.deposit = obj ? obj.label : ''
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
