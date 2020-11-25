<template>
    <page-container>
        <filter-area @search="loadData" @clear="clear">
            <div>
                <span>医院：</span>
                <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                    <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </div>
            <div>
                <span>确认收入日期：</span>
                <a-range-picker v-model="dateTime" @change="changeDate"></a-range-picker>
            </div>
            <template slot="more">
                <div>
                    <span>订单编号：</span>
                    <a-input v-model="params.orderNo" placeholder="请输入订单编号" allowClear />
                </div>
                <div>
                    <span>病人姓名：</span>
                    <a-input v-model="params.patientName" placeholder="请输入病人姓名" allowClear />
                </div>
            </template>
            <template slot="action">
                <a-button type="primary">导出</a-button>
            </template>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id">
            <template slot="balanceDetails" slot-scope="text, props">
                <p v-for="(item, index) in props.balanceDetails" :key="index">{{item.label}}：{{item.value}}</p>
            </template>
            <template slot="incomeMethod" slot-scope="text, props">
                <p v-for="(item, index) in props.incomeMethod" :key="index">{{item.label}}：{{item.value}}</p>
            </template>
        </a-table>
    </page-container>
</template>
<script>
import pageContainer from '@/views/components/page-container/index'
import filterArea from '@/components/page/filterArea/index'
export default {
    data () {
        return {
            hospitalList: [{
                label: '浙江省人民医院',
                value: '1'
            }, {
                label: '安徽省中医院',
                value: '2'
            }],
            params: {
                hospital: undefined,
                startDate: '',
                endDate: '',
                orderNo: '',
                patientName: ''
            },
            dateTime: [],
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
            }, {
                title: '操作人',
                dataIndex: 'operator'
            }, {
                title: '操作时间',
                dataIndex: 'operateTime'
            }],
            tableData: [],
            loading: false
        }
    },
    components: {
        pageContainer,
        filterArea
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
                    balanceMethod: '支付宝',
                    operator: 'xxx',
                    operateTime: '2020-11-16 10:20'
                }]
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.hospital = undefined
            this.params.startDate = ''
            this.params.endData = ''
            this.dateTime = []
            this.params.orderNo = ''
            this.params.patientName = ''
            this.loadData()
        },
        changeDate (date, dateString) {
            this.params.startDate = dateString[0]
            this.params.endData = dateString[1]
            this.loadData()
        }
    },
    created () {
        this.loadData()
    }
}
</script>
