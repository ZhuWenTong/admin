<template>
    <a-modal v-model="visible" title="新增" ok-text="确定" cancel-text="取消" @cancel="cancel" @ok="ok" width="400px">
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
            <a-form-model-item has-feedback label="借款时间" prop="borrowDate">
                <my-date placeholder="请选择借款时间" v-model="model.borrowDate" style="width: 100%;" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="借款金额" prop="money">
                <a-input placeholder="请输入借款金额" type="number" v-model="model.money" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="借款方式" prop="borrowWayId">
                <a-select placeholder="请选择借款方式" allowClear @change="selectWay" v-model="model.borrowWayId">
                    <a-select-option v-for="item in wayOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
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
            model: {
                hospitalId: undefined,
                hospital: '',
                workerId: undefined,
                workerName: '',
                borrowDate: null,
                money: '',
                borrowWayName: '',
                borrowWayId: undefined
            },
            rules: {
                hospital: [
                    {required: true, message: '请选择所属医院', trigger: 'blur'}
                ],
                workerId: [
                    {required: true, message: '请选择护工姓名', trigger: 'blur'}
                ],
                borrowDate: [
                    {required: true, message: '请选择借款时间', trigger: 'change'}
                ],
                money: [
                    {required: true, message: '请输入借款金额', trigger: 'blur'}
                ],
                borrowWayId: [
                    {required: true, message: '请选择借款方式', trigger: 'blur'}
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
            wayOption: [{
                label: '现金',
                value: '1'
            }]
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
        selectWay (val) {
            let obj = this.wayOption.find(i => i.value === val)
            this.model.borrowWayName = obj ? obj.label : ''
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
