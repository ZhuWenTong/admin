<template>
    <div class="basic-info">
        <div class="tit">基本信息</div>
        <a-form-model ref="ruleForm" :model="model" :rules="rules" labelAlign="right" class="basic">
            <a-form-model-item has-feedback label="所属医院" prop="hospital">
                <a-select placeholder="请选择医院" allowClear @change="selectHospital" v-model="model.hospitalId" :style="{width: '300px'}">
                    <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="商品/服务分类">
                <span>{{selectGoodName}}</span>
            </a-form-model-item>
        </a-form-model>
        <div class="tit">服务信息</div>
        <a-form-model ref="ruleForm" :model="model" :rules="rules" labelAlign="right" class="basic">
            <a-form-model-item has-feedback label="名称" prop="goodName">
                <a-input placeholder="3-60个字符" v-model="model.goodName" allowClear :style="{width: '700px'}" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="基础服务价格" prop="price">
                <a-input prefix="￥" placeholder="请输入基础服务价格" v-model="model.price" allowClear type="number" :style="{width: '350px'}" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="图片" prop="photo"></a-form-model-item>
        </a-form-model>
        <div class="tit">一对多设置</div>
        <div class="one-many">
            <div class="set">
                <div class="set-item" v-for="(item, index) in model.oneManySet" :key="index">
                    <span class="label">{{item.label}}：</span>
                    <a-input addon-before="价格" type="number" :style="{width: '200px'}" allowClear v-model="item.value" />
                    <a-button v-if="index !== 0 && index === model.oneManySet.length - 1" @click="deleteItem(index)">删除</a-button>
                </div>
            </div>
            <a-button type="primary" @click="addSet">添加设置</a-button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: Object
    },
    data () {
        return {
            model: {
                hospitalId: undefined,
                hospital: '',
                goodName: '',
                price: '',
                oneManySet: [{
                    label: '一对多',
                    value: ''
                }]
            },
            rules: {
                goodName: [
                    {required: true, message: '请输入商品名称', trigger: 'blur'}
                ],
                price: [
                    {required: true, message: '请输入基础服务价格', trigger: 'blur'}
                ]
            },
            hospitalList: [{
                label: '浙江省人民医院',
                value: '1'
            }, {
                label: '安徽省中医院',
                value: '2'
            }]
        }
    },
    computed: {
        selectGoodName () {
            return this.data.goodList.map(i => i.label).join(' > ')
        }
    },
    methods: {
        selectHospital (val) {
            let obj = this.hospitalList.find(i => i.value === val)
            this.model.hospital = obj ? obj.label : ''
        },
        addSet () {
            let {oneManySet} = this.model
            oneManySet.push({
                label: '一对' + oneManySet.length,
                value: ''
            })
        },
        deleteItem (index) {
            this.model.oneManySet.splice(index, 1)
        }
    }
}
</script>
<style lang="less">
.basic-info {
    .tit {
        font-size: 14px;
        font-weight: bold;
        line-height: 40px;
        border: 1px solid #dddddd;
        background: #f8f8f8;
        padding: 0 10px;
    }
    .ant-form-item {
        display: flex;
        flex-direction: row;
        .ant-form-item-label {
            width: 120px;
        }
        .ant-form-item-control-wrapper {
            flex: 1;
        }
    }
    .basic {
        margin-top: 20px;
    }
    .one-many {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 20px;
        .set {
            .set-item {
                display: flex;
                align-items: center;
                &:not(:last-child) {
                    margin-bottom: 20px;
                }
                .label {
                    display: inline-block;
                    width: 100px;
                    text-align: left;
                }
                .ant-btn {
                    margin-left: 20px;
                }
            }
        }
    }
}
</style>
