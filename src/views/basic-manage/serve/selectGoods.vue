<template>
    <div class="select-goods">
        <a-spin :spinning="loading1">
            <div class="list">
                <div v-for="item in pGoods" :key="item.id" class="list-item" :class="{'active': item.id === model.pId}" @click="selectPGoods(item)">
                    <span>{{item.label}}</span>
                    <span>》</span>
                </div>
            </div>
        </a-spin>
        <a-spin :spinning="loading2">
            <div class="list" v-show="loading2 || goods.length">
                <div v-for="item in goods" :key="item.id" class="list-item" :class="{'active': item.id === model.goodId}" @click="selectGoods(item)">
                    <span>{{item.label}}</span>
                    <span>》</span>
                </div>
            </div>
        </a-spin>
        <a-spin :spinning="loading3">
            <div class="list" v-show="loading3 || sGoods.length">
                <div v-for="item in sGoods" :key="item.id" class="list-item" :class="{'active': item.id === model.sId}" @click="selectSonGoods(item)">
                    <span>{{item.label}}</span>
                    <span>》</span>
                </div>
            </div>
        </a-spin>
    </div>
</template>
<script>
import {pList, list, sList} from './goods'
export default {
    props: {
        data: {
            type: Object,
            default () {
                return {
                    pName: '',
                    pId: '',
                    goodName: '',
                    goodId: '',
                    sName: '',
                    sId: ''
                }
            }
        }
    },
    data () {
        return {
            pGoods: [],
            goods: [],
            sGoods: [],
            loading1: false,
            loading2: false,
            loading3: false,
            model: {
                pName: '',
                pId: '',
                goodName: '',
                goodId: '',
                sName: '',
                sId: ''
            }
        }
    },
    methods: {
        init () {
            this.getPGoods()
            if (this.data) {
                this.model = this.data
            }
            if (this.model.goodId) {
                this.getGoods(this.model.pId)
            }
            if (this.model.sId) {
                this.getSonGoods(this.model.goodId)
            }
        },
        // 获取第一栏商品分类
        getPGoods () {
            this.loading1 = true
            setTimeout(() => {
                this.pGoods = pList
                this.loading1 = false
            }, 1000)
        },
        selectPGoods (item) {
            if (item.id === this.model.pId) return
            this.model.pName = item.label
            this.model.pId = item.id
            this.getGoods(item.id)
            // 处理第二、三栏数据
            this.sGoods = []
            this.model.goodName = ''
            this.model.goodId = ''
            this.model.sName = ''
            this.model.sId = ''
            // 页面获取数据
            this.$emit('change', this.model)
        },
        /**
         * @param {id} 第一栏选中商品id
         * @todo 获取第二栏商品分类
         */
        getGoods (id) {
            this.loading2 = true
            setTimeout(() => {
                let arr = list.filter(i => i.parentId === id)
                this.goods = arr
                this.loading2 = false
            }, 1000)
        },
        selectGoods (item) {
            if (item.id === this.model.goodId) return
            this.model.goodName = item.label
            this.model.goodId = item.id
            this.getSonGoods(item.id)
            // 处理第三栏数据
            this.model.sName = ''
            this.model.sId = ''
            // 页面获取数据
            this.$emit('change', this.model)
        },
        /**
         * @param {id} 第二栏选中商品id
         * @todo 获取第三栏商品分类
         */
        getSonGoods (id) {
            this.loading3 = true
            setTimeout(() => {
                let arr = sList.filter(i => i.parentId === id)
                this.sGoods = arr
                this.loading3 = false
            }, 1000)
        },
        selectSonGoods (item) {
            if (item.id === this.model.sId) return
            this.model.sName = item.label
            this.model.sId = item.id
            // 页面获取数据
            this.$emit('change', this.model)
        }
    },
    created () {
        this.init()
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
.select-goods {
    .flex(row, flex-start, flex-start);
    .list {
        width: 300px;
        border: 1px solid #e6e6e6;
        padding: 4px 6px;
        box-sizing: border-box;
        margin-right: 20px;
        .list-item {
            height: 30px;
            padding: 0 10px;
            box-sizing: border-box;
            .flex(row, space-between, center);
            cursor: pointer;
            border: 1px solid transparent;
            &.active {
                border: 1px solid #bce8f1;
                background: #d9edf7;
            }
        }
    }
}
</style>
