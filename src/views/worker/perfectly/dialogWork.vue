<template>
    <a-modal v-model="visible" :title="title" ok-text="确定" cancel-text="取消" @cancel="cancel" @ok="ok" width="400px">
        <a-form-model ref="ruleForm" :model="model" :rules="rules" :label-col="{span: 6}" :wrapper-col="{span: 18}" labelAlign="left">
            <a-form-model-item has-feedback label="入职公司" prop="company">
                <a-input placeholder="请输入公司名称" v-model="model.company" autocomplete="off" allowClear />
            </a-form-model-item>
            <a-form-model-item has-feedback label="入职日期" prop="company">
                <my-date placeholder="请选择入职日期" v-model="model.entryTime" style="width: 100%;" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="离职日期" prop="company">
                <my-date placeholder="请选择离职日期" v-model="model.outTime" style="width: 100%;" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="离职原因" prop="reason">
                <a-input placeholder="请输入离职原因" v-model="model.reason" autocomplete="off" allowClear />
            </a-form-model-item>
            <a-form-model-item has-feedback label="表现情况" prop="reason">
                <a-textarea :auto-size="{ minRows: 3 }" placeholder="请输入表现情况" v-model="model.performance" autocomplete="off" allowClear />
            </a-form-model-item>
        </a-form-model>
    </a-modal>
</template>
<script>
import myDate from '@/views/components/myDate/index'
export default {
    props: {
        type: {
            type: String,
            defalut: 'add' // add edit
        },
        data: Object,
        dialogVisible: Boolean
    },
    data () {
        return {
            visible: false,
            model: {
                company: '',
                entryTime: null,
                outTime: null,
                reason: '',
                performance: ''
            },
            rules: {
                company: [
                    {required: true, message: '请输入公司名称', trigger: 'blur'}
                ],
                entryTime: [
                    {required: true, message: '请选择入职日期', trigger: 'change'}
                ],
                outTime: [
                    {required: true, message: '请选择离职日期', trigger: 'change'}
                ]
            }
        }
    },
    computed: {
        title () {
            return this.type === 'add' ? '新增工作经历' : '编辑工作经历'
        }
    },
    components: {
        myDate
    },
    methods: {
        init () {
            if (this.type === 'edit') {
                for (let i in this.data) {
                    for (let j in this.model) {
                        if (i === j) {
                            this.model[i] = this.data[i]
                        }
                    }
                }
            }
        },
        cancel () {
            this.$emit('update:dialogVisible', false)
        },
        ok () {
            const _this = this
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    // 新增 修改 api
                    this.$emit('change', _this.model, _this.type)
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
