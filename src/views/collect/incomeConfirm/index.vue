<template>
    <div class="income-confirm">
        <filter-area @search="loadData" :showSearchBtn="false">
            <div>
                <span>确认收入日期：</span>
                <my-date placeholder="请选择确认收入日期" v-model="params.confirmDate" @change="loadData" />
            </div>
            <template slot="action">
                <a-button type="primary" @click="viewOrder">查看未确定订单</a-button>
            </template>
        </filter-area>
        <div>
            <p>截止至：<span style="color: #ff5a00;">2020-11-15</span>， 该计费周期内共产生收入总额：<span style="color: #ff5a00;">￥0</span>，其中</p>
        </div>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id">
            <template slot="balanceDetails" slot-scope="text, props">
                <p v-for="(item, index) in props.balanceDetails" :key="index">{{item.label}}：{{item.value}}</p>
            </template>
            <template slot="incomeMethod" slot-scope="text, props">
                <p v-for="(item, index) in props.incomeMethod" :key="index">{{item.label}}：{{item.value}}</p>
            </template>
        </a-table>
        <dialog-order :dialogVisible.sync="dialogVisible" v-if="dialogVisible" />
    </div>
</template>
<script>
import filterArea from '@/components/page/filterArea/index'
import myDate from '@/views/components/myDate/index'
export default {
    data () {
        return {
            params: {
                confirmDate: null
            },
            columns: [{
                title: '订单编号',
                dataIndex: 'orderNo'
            }, {
                title: '患者姓名',
                dataIndex: 'patientName'
            }, {
                title: '床位号',
                dataIndex: 'bedNo'
            }, {
                title: '上次确认收入日期',
                dataIndex: 'lastReceiptDate'
            }, {
                title: '上期结余',
                dataIndex: 'oldBalance'
            }, {
                title: '上期结余方式',
                dataIndex: 'oldBalanceMethod'
            }, {
                title: '确认收入日期',
                dataIndex: 'confirmReceiptDate'
            }, {
                title: '余额',
                dataIndex: 'balance'
            }, {
                title: '余额明细',
                dataIndex: 'balanceDetails',
                scopedSlots: { customRender: 'balanceDetails' }
            }, {
                title: '本期收入',
                dataIndex: 'currentIncome'
            }, {
                title: '收入方式',
                kedataIndexy: 'incomeMethod',
                scopedSlots: { customRender: 'incomeMethod' }
            }, {
                title: '本期结余',
                dataIndex: 'currentBalance'
            }, {
                title: '结余方式',
                dataIndex: 'balanceMethod'
            }],
            tableData: [],
            loading: false,
            dialogVisible: false
        }
    },
    components: {
        filterArea,
        myDate,
        dialogOrder: () => import('./dialogOrder')
    },
    methods: {
        loadData () {
            this.loading = true
            setTimeout(() => {
                this.tableData = [{
                    id: '123',
                    orderNo: '00000001',
                    patientName: 'xxx',
                    bedNo: '一号楼-1楼-2号床',
                    lastReceiptDate: '2020-11-16',
                    oldBalance: 100,
                    oldBalanceMethod: '微信',
                    confirmReceiptDate: '2020-11-16',
                    balance: 12,
                    balanceDetails: [{
                        label: 'POS机',
                        value: 12
                    }, {
                        label: '现金',
                        value: 123
                    }],
                    currentIncome: 200,
                    incomeMethod: [{
                        label: 'POS机',
                        value: 12
                    }, {
                        label: '现金',
                        value: 123
                    }],
                    currentBalance: 120,
                    balanceMethod: '支付宝'
                }]
                this.loading = false
            }, 1000);
        },
        viewOrder () {
            this.dialogVisible = true
        }
    },
    created () {
        this.loadData()
    }
}
</script>
<style lang="less">
.income-confirm {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px;
}
</style>
