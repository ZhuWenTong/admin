<template>
    <div class="basic">
        <a-form-model ref="ruleForm" :model="model" :rules="rules" :label-col="{span: 6}" :wrapper-col="{span: 18}" labelAlign="right" style="max-width: 600px;">
            <a-form-model-item label="公司名称" prop="companyName">
                <a-input placeholder="请输入公司名称" v-model="model.companyName" allowClear />
            </a-form-model-item>
            <a-form-model-item label="公司简称" prop="companyShortName">
                <a-input placeholder="请输入公司简称" v-model="model.companyShortName" allowClear />
            </a-form-model-item>
            <a-form-model-item label="联系人" prop="contact">
                <a-input placeholder="请输入联系人" v-model="model.contact" allowClear />
            </a-form-model-item>
            <a-form-model-item label="联系电话" prop="phone">
                <a-input placeholder="请输入联系电话" v-model="model.phone" allowClear />
            </a-form-model-item>
            <a-form-model-item label="客服电话" prop="serviceTel">
                <a-input placeholder="请输入客服电话" v-model="model.serviceTel" allowClear />
            </a-form-model-item>
            <a-form-model-item label="地址" prop="address">
                <a-input placeholder="请输入地址" v-model="model.address" allowClear />
            </a-form-model-item>
            <a-form-model-item label="平台比例" prop="platformRate">
                <a-input placeholder="请输入平台比例" type="number" v-model="model.platformRate" allowClear>
                    <template slot="suffix">%</template>
                </a-input>
            </a-form-model-item>
            <a-form-model-item label="公司logo" prop="logo"></a-form-model-item>
            <a-form-model-item label="轮播图" prop="swiper"></a-form-model-item>
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
                companyName: '',
                companyShortName: '',
                contact: '',
                phone: '',
                serviceTel: '',
                address: '',
                platformRate: '',
                logo: [],
                swiper: []
            },
            rules: {
                companyName: [
                    {required: true, message: '请输入公司名称', trigger: 'blur'}
                ],
                companyShortName: [
                    {required: true, message: '请输入公司简称', trigger: 'blur'}
                ],
                contact: [
                    {required: true, message: '请输入联系人', trigger: 'blur'}
                ],
                phone: [
                    {required: true, message: '请输入联系电话', trigger: 'blur'}
                ],
                platformRate: [
                    {required: true, message: '请输入平台比例', trigger: 'blur'}
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
