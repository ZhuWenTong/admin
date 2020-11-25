<template>
    <page-container>
        <filter-area @search="loadData" @clear="clear">
            <a-input v-model="params.keyword" placeholder="姓名/手机号/订单号/流水单号" allowClear />
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-range-picker v-model="dateTime" @change="changeDate"></a-range-picker>
            <a-select placeholder="请选择收入类型" allowClear @change="loadData" v-model="params.incomeType">
                <a-select-option v-for="item in incomeOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <template slot="more">
                <a-select placeholder="请选择支出类型" allowClear @change="loadData" v-model="params.spendType">
                    <a-select-option v-for="item in spendOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
                <a-select placeholder="请选择支付方式" allowClear @change="loadData" v-model="params.paymentMethod">
                    <a-select-option v-for="item in payOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
                <a-select placeholder="请选择交易状态" allowClear @change="loadData" v-model="params.tradStatus">
                    <a-select-option v-for="item in tradOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
                <a-input v-model="params.operator" placeholder="请输入操作人" allowClear />
            </template>
            <template slot="action">
                <a-button type="primary" @click="add">添加</a-button>
                <a-button>导出</a-button>
            </template>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id">
            <template slot="operation" slot-scope="text, props">
                <a @click="toView(props)">查看</a>
            </template>
        </a-table>
        <dialog-add :dialogVisible.sync="dialogVisible" v-if="dialogVisible" @add="loadData" />
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
            incomeOption: [{
                label: '预收款',
                value: '1'
            }, {
                label: '补款',
                value: '2'
            }],
            spendOption: [{
                label: '订单退款',
                value: '1'
            }, {
                label: '借款',
                value: '2'
            }],
            payOption: [{
                label: '微信',
                value: '1'
            }, {
                label: '支付宝',
                value: '2'
            }],
            tradOption: [{
                label: '成功',
                value: '1'
            }, {
                label: '失败',
                value: '2'
            }],
            params: {
                keyword: '',
                hospital: undefined,
                startDate: '',
                endDate: '',
                incomeType: undefined,
                spendType: undefined,
                paymentMethod: undefined,
                tradStatus: undefined,
                operator: ''
            },
            dateTime: [],
            columns: [{
                title: '订单编号',
                dataIndex: 'orderNo'
            }, {
                title: '联系人',
                dataIndex: 'contract'
            }, {
                title: '联系方式',
                dataIndex: 'phone'
            }, {
                title: '流水号',
                dataIndex: 'waterNo'
            }, {
                title: '交易时间',
                dataIndex: 'tradTime'
            }, {
                title: '金额',
                dataIndex: 'money'
            }, {
                title: '交易类型',
                dataIndex: 'tradType'
            }, {
                title: '支付方式',
                dataIndex: 'paymentMethod'
            }, {
                title: '支付状态',
                dataIndex: 'payStatus'
            }, {
                title: '操作人',
                dataIndex: 'operator'
            }, {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' }
            }],
            tableData: [],
            loading: false,
            dialogVisible: false
        }
    },
    components: {
        pageContainer,
        filterArea,
        dialogAdd: () => import('./dialogAdd')
    },
    methods: {
        loadData () {
            this.loading = true
            setTimeout(() => {
                this.tableData = [{
                    id: '1',
                    orderNo: '00000001',
                    contract: 'xxx',
                    phone: '16666666666',
                    waterNo: '412341324',
                    tradTime: '2020-11-11 10:57',
                    money: 222,
                    tradType: '结算',
                    paymentMethod: '微信',
                    payStatus: '成功',
                    operator: 'xxx'
                }, {
                    id: '2',
                    orderNo: '00000002',
                    contract: 'xxx',
                    phone: '16666666666',
                    waterNo: '412341324',
                    tradTime: '2020-11-11 10:57',
                    money: 222,
                    tradType: '结算',
                    paymentMethod: '微信',
                    payStatus: '成功',
                    operator: 'xxx'
                }]
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.keyword = ''
            this.params.hospital = undefined
            this.params.startDate = ''
            this.params.endDate = ''
            this.dateTime = []
            this.params.incomeType = undefined
            this.params.spendType = undefined
            this.params.paymentMethod = undefined
            this.params.tradStatus = undefined
            this.params.operator = ''
            this.loadData()
        },
        changeDate (date, dateString) {
            this.params.startDate = dateString[0]
            this.params.endDate = dateString[1]
            this.loadData()
        },
        add () {
            this.dialogVisible = true
        },
        toView (data) {
            this.$router.push('/orderManage/orderDetail/' + data.id)
        }
    },
    created () {
        this.loadData()
    }
}
</script>
