<template>
    <a-modal v-model="visible" :title="title" @cancel="cancel" width="1200px" wrapClassName="serve-panel">
        <a-steps :current="currentStep">
            <a-step v-for="item in stepList" :key="item.value" :title="item.label" />
        </a-steps>
        <div class="container">
            <select-goods v-show="currentStep === 0" @change="getGoods" :data="goodModel" />
            <basic-info v-show="currentStep === 1" :data="model" />
            <good-details v-show="currentStep === 2" />
        </div>
        <template slot="footer">
            <div class="custom-footer">
                <a-alert :show-icon="false" :message="'您当前选择的商品类别是：' + selectGoodName" type="warning" v-if="currentStep === 0" />
                <a-button-group>
                    <a-button type="primary" @click="prev" v-if="currentStep !== 0">上一步</a-button>
                    <a-button type="primary" @click="next" v-if="currentStep !== 2">下一步</a-button>
                    <a-button type="primary" v-if="currentStep !== 0">上架</a-button>
                </a-button-group>
            </div>
        </template>
    </a-modal>
</template>
<script>
import selectGoods from './selectGoods'
import basicInfo from './basicInfo'
import goodDetails from './goodDetails'
export default {
    props: {
        type: {
            type: String, // add edit
            default: 'add'
        },
        dialogVisible: Boolean,
        data: Object
    },
    data () {
        return {
            visible: false,
            stepList: [{
                label: '选择商品品类',
                value: '1'
            }, {
                label: '编辑基本信息',
                value: '2'
            }, {
                label: '编辑商品详情',
                value: '3'
            }],
            currentStep: 0,
            model: {
                goodList: []
            },
            goodModel: null
        }
    },
    computed: {
        title () {
            return this.type === 'add' ? '发布商品' : '编辑商品'
        },
        selectGoodName () {
            return this.model.goodList.map(i => i.label).join(' > ')
        }
    },
    components: {
        selectGoods,
        basicInfo,
        goodDetails
    },
    methods: {
        init () {
            if (this.type === 'edit') {
                this.currentStep = 1
                this.model.goodList = [{label: '食品饮料', value: '1'}, {label: '饮料', value: '1-2'}, {label: '碳酸饮料', value: '1-2-1'}]
                this.goodModel = {
                    pName: '食品饮料',
                    pId: '1',
                    goodName: '饮料',
                    goodId: '1-2',
                    sName: '碳酸饮料',
                    sId: '1-2-1'
                }
            }
        },
        cancel () {
            this.$emit('update:dialogVisible', false)
        },
        ok () {
            this.$emit('update:dialogVisible', false)
        },
        getGoods (data) {
            let {pName, pId, goodName, goodId, sName, sId} = data
            this.model.goodList = [{label: pName, value: pId}]
            if (goodId) {
                this.model.goodList = [{label: pName, value: pId}, {label: goodName, value: goodId}]
            }
            if (sId) {
                this.model.goodList = [{label: pName, value: pId}, {label: goodName, value: goodId}, {label: sName, value: sId}]
            }
        },
        prev () {
            this.currentStep--
        },
        next () {
            if (this.currentStep === 0 && !this.model.goodList.length) {
                this.$message.error('请选择商品分类')
                return
            }
            this.currentStep++
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
.serve-panel {
    .custom-footer {
        text-align: center;
        .ant-alert {
            text-align: left;
            margin-bottom: 20px;
        }
    }
    .container {
        margin-top: 20px;
    }
}
</style>
