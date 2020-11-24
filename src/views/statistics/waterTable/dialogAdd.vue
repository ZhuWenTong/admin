<template>
    <a-modal v-model="visible" title="添加" ok-text="确定" cancel-text="取消" @cancel="cancel" @ok="ok" width="400px">
        <a-form-model ref="ruleForm" :model="model" :rules="rules" :label-col="{span: 6}" :wrapper-col="{span: 18}" labelAlign="right">
            <a-form-model-item has-feedback label="所属医院" prop="hospitalId">
                <a-select placeholder="请选择医院" allowClear @change="selectHospital" v-model="model.hospitalId">
                    <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item has-feedback label="金额类型" prop="amountTypeId">
                <a-select placeholder="请选择金额类型" allowClear @change="selectAmonut" v-model="model.amountTypeId">
                    <a-select-option v-for="item in amountTypeOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item has-feedback label="收支类型" prop="inoutTypeId">
                <a-select placeholder="请选择收支类型" allowClear disabled v-model="model.inoutTypeId">
                    <a-select-option v-for="item in inoutOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item has-feedback label="金额" prop="money">
                <a-input placeholder="请输入金额" type="number" v-model="model.money" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="支付方式" prop="paymentMethodId">
                <a-select placeholder="请选择支付方式" allowClear @change="selectPayMethod" v-model="model.paymentMethodId">
                    <a-select-option v-for="item in payOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item has-feedback label="备注" prop="remark">
                <a-textarea :auto-size="{minRows: 3}" placeholder="请输入备注" v-model="model.remark" />
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
            amountTypeOption: [{
                label: '其他支出',
                value: '1'
            }, {
                label: '费用报销',
                value: '2'
            }, {
                label: '其他收入',
                value: '3'
            }],
            inoutOption: [{
                label: '收入',
                value: '1'
            }, {
                label: '支出',
                value: '2'
            }],
            payOption: [{
                label: '微信',
                value: '1'
            }, {
                label: '支付宝',
                value: '2'
            }],
            model: {
                hospital: '',
                hospitalId: undefined,
                amountType: '',
                amountTypeId: undefined,
                inoutType: '',
                inoutTypeId: undefined,
                money: '',
                paymentMethod: '',
                paymentMethodId: undefined,
                remark: ''
            },
            rules: {
                hospitalId: [
                    {required: true, message: '请选择医院', trigger: 'change'}
                ],
                amountTypeId: [
                    {required: true, message: '请选择金额类型', trigger: 'change'}
                ],
                inoutTypeId: [
                    {required: true, message: '请选择收支类型', trigger: 'change'}
                ],
                money: [
                    {required: true, message: '请输入金额', trigger: 'blur'}
                ],
                paymentMethodId: [
                    {required: true, message: '请选择支付方式', trigger: 'change'}
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
                    this.$emit('add', this.model)
                    this.$emit('update:dialogVisible', false)
                }
            })
        },
        selectHospital (val) {
            let obj = this.hospitalList.find(i => i.value === val)
            this.model.hospital = obj ? obj.label : ''
        },
        selectAmonut (val) {
            let obj = this.amountTypeOption.find(i => i.value === val)
            this.model.amountType = obj ? obj.label : ''
            this.model.inoutTypeId = val === '3' ? '1' : '2'
            let o = this.inoutOption.find(i => i.value === this.model.inoutTypeId)
            this.model.inoutType = o ? o.label : ''
        },
        selectPayMethod (val) {
            let obj = this.payOption.find(i => i.value === val)
            this.model.paymentMethod = obj ? obj.label : ''
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
