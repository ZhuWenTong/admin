<template>
    <a-modal v-model="visible" title="请假" ok-text="确定" cancel-text="取消" @cancel="cancel" @ok="ok" width="400px">
        <a-form-model ref="ruleForm" :model="model" :rules="rules" :label-col="{span: 6}" :wrapper-col="{span: 18}" labelAlign="left">
            <a-form-model-item has-feedback label="护工姓名" prop="workerName">
                <a-input disabled v-model="model.workerName" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="开始日期" prop="startDate">
                <my-date placeholder="请选择开始日期" v-model="model.startDate" style="width: 100%;" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="结束日期" prop="endDate">
                <my-date placeholder="请选择结束日期" v-model="model.endDate" style="width: 100%;" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="当天考勤" prop="checkIn">
                <a-select placeholder="请选择当天考勤" allowClear v-model="model.checkIn">
                    <a-select-option v-for="item in checkInOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item has-feedback label="请假原因" prop="reason">
                <a-input placeholder="请输入请假原因" v-model="model.reason" />
            </a-form-model-item>
        </a-form-model>
    </a-modal>
</template>
<script>
import myDate from '@/views/components/myDate/index'
export default {
    props: {
        dialogVisible: Boolean,
        data: Object
    },
    data () {
        return {
            visible: false,
            model: {
                workerName: '',
                startDate: null,
                endDate: null,
                checkIn: undefined,
                reason: ''
            },
            rules: {
                startDate: [
                    {required: true, message: '请选择开始日期', trigger: 'change'}
                ],
                endDate: [
                    {required: true, message: '请选择结束日期', trigger: 'change'}
                ]
            },
            checkInOption: [{
                label: '0.5',
                value: '0.5'
            }, {
                label: '1',
                value: '1'
            }, {
                label: '0',
                value: '0'
            }]
        }
    },
    components: {
        myDate
    },
    methods: {
        init () {
            this.model.workerName = this.data.workerName
        },
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
        }
    },
    watch: {
        dialogVisible: {
            handler (val) {
                this.visible = val
            },
            immediate: true
        }
    },
    created () {
        this.init()
    }
}
</script>
