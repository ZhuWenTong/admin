<template>
    <a-modal v-model="visible" :title="title" ok-text="确定" cancel-text="取消" @cancel="cancel" @ok="ok" width="800px" class="dialog-building">
        <a-form-model ref="ruleForm" :model="model" :rules="rules" labelAlign="right">
            <a-row :gutter="[40, 10]">
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="楼栋名称" prop="buildName">
                        <a-input placeholder="请输入楼栋名称" v-model="model.buildName" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="排序" prop="sort">
                        <a-input placeholder="请输入排序" v-model="model.sort" type="number" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <a-form-model-item has-feedback label="备注" prop="remark">
                        <a-textarea placeholder="请输入备注" v-model="model.remark" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
            </a-row>
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
                buildName: '',
                sort: '',
                remark: '',
                key: Math.ceil(Math.random() * 10000),
                scopedSlots: { title: 'custom' },
                children: []
            },
            rules: {
                buildName: [
                    {required: true, message: '请输入楼栋名称', trigger: 'blur'}
                ]
            }
        }
    },
    computed: {
        title () {
            return this.data ? '编辑楼栋' : '新增楼栋'
        },
        type () {
            return this.data ? 'edit' : 'add'
        }
    },
    methods: {
        init () {
            if (this.type === 'edit') {
                let {model, data} = this
                for (let i in model) {
                    for (let j in data) {
                        if (i === j) {
                            model[i] = data[i]
                        }
                    }
                }
            }
        },
        cancel () {
            this.$emit('update:dialogVisible', false)
        },
        ok () {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.$emit('change', this.model, this.type)
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
<style lang="less">
.dialog-building {
    .ant-form-item {
        display: flex;
        flex-direction: row;
        .ant-form-item-label {
            width: 100px;
        }
        .ant-form-item-control-wrapper {
            flex: 1;
        }
    }
}
</style>
