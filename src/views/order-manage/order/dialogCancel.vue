<template>
    <a-modal v-model="visible" title="提示" ok-text="确定" cancel-text="取消" @cancel="cancel" @ok="ok" width="400px">
        <a-form-model ref="ruleForm" :model="model" :rules="rules" :label-col="{span: 6}" :wrapper-col="{span: 18}" labelAlign="left">
            <a-form-model-item has-feedback label="取消原因" prop="reason">
                <a-input v-model="model.reason" />
            </a-form-model-item>
        </a-form-model>
    </a-modal>
</template>
<script>
export default {
    props: {
        dialogVisible: Boolean,
        data: Object
    },
    data () {
        return {
            visible: false,
            model: {
                reason: ''
            },
            rules: {
                reason: [
                    {required: true, message: '请输入取消原因', trigger: 'blur'}
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
    }
}
</script>
