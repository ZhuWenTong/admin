<template>
    <div class="professional">
        <p class="title">
            <span>健康证</span>
        </p>
        <div class="item">
            <a-form-model ref="ruleForm" :model="model" :rules="rules" :label-col="{span: 6}" :wrapper-col="{span: 18}" labelAlign="left">
                <a-form-model-item has-feedback label="体检时间" prop="healthExamTime">
                    <my-date v-model="model.healthExamTime" placeholder="请选择体检时间" style="width: 100%;" @change="selectHealthDate" />
                </a-form-model-item>
                <a-form-model-item has-feedback label="有效期" prop="expirationDate">
                    <my-date disabled placeholder="请选择有效期" v-model="model.expirationDate" style="width: 100%;" />
                </a-form-model-item>
            </a-form-model>
        </div>
        <p class="title">
            <span>职业证书</span>
            <a-button type="primary" @click="add">继续添加</a-button>
        </p>
        <div class="item" v-for="(item, index) in model.professionalCert" :key="index">
            <a-form-model :label-col="{span: 6}" :wrapper-col="{span: 18}" labelAlign="left">
                <a-form-model-item has-feedback label="护理证书" prop="nursing">
                    <a-input v-model="item.nursing" />
                </a-form-model-item>
                <a-form-model-item has-feedback label="获取时间" prop="getTime">
                    <my-date v-model="item.getTime" placeholder="请选择获取时间" style="width: 100%;" />
                </a-form-model-item>
            </a-form-model>
            <div class="action" v-show="model.professionalCert.length > 1" @click="deleteItem(index)">
                <a-icon type="delete" /><span>删除</span>
            </div>
        </div>
        <div class="footer">
            <a-button type="primary" @click="save">保存</a-button>
        </div>
    </div>
</template>
<script>
import myDate from '@/views/components/myDate/index'
export default {
    data () {
        return {
            model: {
                healthExamTime: null,
                expirationDate: null,
                professionalCert: [{
                    nursing: '',
                    getTime: null
                }]
            },
            rules: {
                healthExamTime: [
                    {required: true, message: '请选择体检时间', trigger: 'change'}
                ],
                expirationDate: [
                    {required: true, message: '请选择有效期', trigger: 'change'}
                ]
            }
        }
    },
    components: {
        myDate
    },
    methods: {
        add () {
            this.model.professionalCert.push({
                nursing: '',
                getTime: null
            })
        },
        selectHealthDate (date, dateString) {
            this.model.expirationDate = this.oneYearLater(dateString)
        },
        oneYearLater (dateString) {
            let date = new Date(dateString)
            let y = date.getFullYear() + 1
            let m = date.getMonth() + 1
            let d = date.getDate()
            let dateStr = `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`
            return dateStr
        },
        deleteItem (index) {
            this.model.professionalCert.splice(index, 1)
        },
        save () {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    console.log(this.model)
                }
            })
        }
    }
}
</script>
<style lang="less">
.flex(@direction: row, @justify: flex-start, @align: center) {
    display: flex;
    flex-direction: @direction;
    justify-content: @justify;
    align-items: @align;
}
.professional {
    .title {
        .flex(row, space-between, center);
        &>span {
            font-size: 16px;
            font-weight: bold;
        }
    }
    .item {
        padding: 0 10px;
        border-bottom: 1px solid #dcdfd6;
        margin-bottom: 20px;
        .flex(row, flex-start, flex-start);
        .ant-form {
            width: 400px;
        }
        .action {
            margin-left: 20px;
            color: @primary-color;
            cursor: pointer;
            span {
                margin-left: 4px;
            }
        }
    }
    .footer {
        .flex(row, flex-end, center);
        padding-bottom: 20px;
    }
}
</style>
