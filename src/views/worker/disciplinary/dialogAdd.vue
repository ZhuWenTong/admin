<template>
    <a-modal v-model="visible" title="添加" ok-text="确定" cancel-text="取消" @cancel="cancel" @ok="ok" width="400px">
        <a-form-model ref="ruleForm" :model="model" :rules="rules" :label-col="{span: 6}" :wrapper-col="{span: 18}" labelAlign="right">
            <a-form-model-item has-feedback label="所属医院" prop="hospitalId">
                <a-select placeholder="请选择医院" allowClear @change="selectHospital" v-model="model.hospitalId">
                    <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item has-feedback label="护工姓名" prop="workerId">
                <a-select placeholder="请选择护工姓名" allowClear @change="selectWorker" v-model="model.workerId">
                    <a-select-option v-for="item in workerList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item has-feedback label="处理日期" prop="processDate">
                <my-date placeholder="请选择处理日期" v-model="model.processDate" style="width: 100%;" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="款项类别" prop="paymentTypeId">
                <a-select placeholder="请选择款项类别" allowClear @change="selectPaymentType" v-model="model.paymentTypeId">
                    <a-select-option v-for="item in paymentTypeOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item has-feedback label="金额" prop="money">
                <a-input placeholder="请输入金额" type="number" v-model="model.money" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="备注" prop="remark">
                <a-textarea :auto-size="{minRows: 3}" placeholder="请输入备注" v-model="model.remark" />
            </a-form-model-item>
        </a-form-model>
    </a-modal>
</template>
<script>
import myDate from '@/views/components/myDate/index'
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
            workerList: [{
                label: '张三',
                value: 'zs'
            }, {
                label: '李四',
                value: 'lisi'
            }],
            paymentTypeOption: [{
                label: '奖励',
                value: '1'
            }, {
                label: '惩罚',
                value: '2'
            }],
            model: {
                hospitalId: undefined,
                hospital: '',
                workerId: undefined,
                workerName: '',
                processDate: null,
                paymentTypeId: undefined,
                paymentTypeName: '',
                money: '',
                remark: ''
            },
            rules: {
                hospital: [
                    {required: true, message: '请选择所属医院', trigger: 'blur'}
                ],
                workerId: [
                    {required: true, message: '请选择护工姓名', trigger: 'blur'}
                ],
                processDate: [
                    {required: true, message: '请选择处理日期', trigger: 'change'}
                ],
                paymentTypeId: [
                    {required: true, message: '请选择款项类别', trigger: 'blur'}
                ],
                money: [
                    {required: true, message: '请输入金额', trigger: 'blur'}
                ]
            }
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
                    this.$emit('change', this.model)
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
        selectPaymentType (val) {
            let obj = this.paymentTypeOption.find(i => i.value === val)
            this.model.paymentTypeName = obj ? obj.label : ''
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
