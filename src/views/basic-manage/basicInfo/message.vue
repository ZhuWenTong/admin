<template>
    <div class="message">
        <a-form-model ref="ruleForm" :model="model" :rules="rules" :label-col="{span: 6}" :wrapper-col="{span: 18}" labelAlign="right" style="max-width: 500px;">
            <a-form-model-item label="APPKEY" prop="APPKEY">
                <a-input placeholder="请输入APPKEY" v-model="model.APPKEY" allowClear />
            </a-form-model-item>
            <a-form-model-item label="APPSECRET" prop="APPSECRET">
                <a-input placeholder="APPSECRET" v-model="model.APPSECRET" allowClear />
            </a-form-model-item>
            <a-form-model-item label="SIGNNAME" prop="SIGNNAME">
                <a-input placeholder="请输入SIGNNAME" v-model="model.SIGNNAME" allowClear />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{span: 14, offset: 4}">
                <a-button type="primary" @click="save" style="margin-right: 10px;">保存</a-button>
                <a-button @click="cancel">取消</a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>
<script>
export default {
    data () {
        return {
            model: {
                APPKEY: '',
                APPSECRET: '',
                SIGNNAME: ''
            },
            rules: {
                APPKEY: [
                    {required: true, message: '请输入APPKEY', trigger: 'blur'}
                ],
                APPSECRET: [
                    {required: true, message: '请输入APPSECRET', trigger: 'blur'}
                ],
                SIGNNAME: [
                    {required: true, message: '请输入SIGNNAME', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        save () {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    console.log(this.model)
                }
            })
        },
        cancel () {
            this.$confirm({
                title: '提示',
                content: '取消操作将不会保存当前页面所有填写内容，确定要取消吗？',
                onOk () {
                    console.log('Ok')
                },
                onCancel () {
                    console.log('Cancel')
                }
            })
        }
    }
}
</script>