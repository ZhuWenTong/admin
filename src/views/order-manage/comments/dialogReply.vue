<template>
    <a-modal v-model="visible" title="回复评论" ok-text="确定" cancel-text="取消" @cancel="cancel" @ok="ok" width="400px">
        <a-form-model ref="ruleForm" :model="model" :rules="rules" :label-col="{span: 6}" :wrapper-col="{span: 18}" labelAlign="right">
            <a-form-model-item label="评论内容">
                <span>{{data.comments}}</span>
            </a-form-model-item>
            <a-form-model-item has-feedback label="回复内容" prop="reply">
                <a-textarea :auto-size="{minRows: 3}" v-model="model.reply" />
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
                reply: ''
            },
            rules: {
                reply: [
                    {required: true, message: '请输入回复内容', trigger: 'blur'}
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
