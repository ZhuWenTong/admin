<template>
    <div class="income">
        <filter-area @search="loadData" @clear="clear">
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-range-picker v-model="dateTime" @change="changeDate"></a-range-picker>
            <a-input v-model="params.admin" placeholder="请输入管理员姓名" allowClear />
            <template slot="action">
                <a-button type="primary">导出</a-button>
            </template>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id" :scroll="{ x: 2900 }"></a-table>
    </div>
</template>
<script>
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
                admin: ''
            },
            dateTime: [],
            columns: [{
                title: '序号',
                dataIndex: 'index',
                width: 80,
                fixed: 'left'
            }, {
                title: '项目名称',
                dataIndex: 'projectName',
                width: 150,
                fixed: 'left'
            }, {
                title: '订单编号',
                dataIndex: 'orderNo',
                width: 100
            }, {
                title: '下单日期',
                dataIndex: 'orderDate',
                width: 150
            }, {
                title: '预约开始日期',
                dataIndex: 'startDate',
                width: 150
            }, {
                title: '预约结束日期',
                dataIndex: 'endDate',
                width: 150
            }, {
                title: '预约天数',
                dataIndex: 'appointmentDays',
                width: 100
            }, {
                title: '实际天数',
                dataIndex: 'actualDays',
                width: 100
            }, {
                title: '退费天数',
                dataIndex: 'refundDays',
                width: 100
            }, {
                title: '订单结算日期',
                dataIndex: 'settleDate',
                width: 150
            }, {
                title: '洽谈价格',
                dataIndex: 'discussPrice',
                width: 100
            }, {
                title: '支付金额',
                dataIndex: 'payAmount',
                width: 100
            }, {
                title: '支付统计',
                dataIndex: 'payStatistics',
                width: 100
            }, {
                title: '减免天数',
                dataIndex: 'reduceDays',
                width: 100
            }, {
                title: '减免金额',
                dataIndex: 'reduceAmount',
                width: 100
            }, {
                title: '退款金额',
                dataIndex: 'refundAmount',
                width: 100
            }, {
                title: '退款统计',
                dataIndex: 'refundStatistics',
                width: 100
            }, {
                title: '实际金额',
                dataIndex: 'actualAmount',
                width: 100
            }, {
                title: '确认收入',
                dataIndex: 'confirmIncome',
                width: 100
            }, {
                title: '退款时间',
                dataIndex: 'refundTime',
                width: 150
            }, {
                title: '联系人',
                dataIndex: 'contract',
                width: 100
            }, {
                title: '联系地址',
                dataIndex: 'address'
            }, {
                title: '联系电话',
                dataIndex: 'phone',
                width: 150
            }, {
                title: '管理老师',
                dataIndex: 'teacher',
                width: 100
            }],
            tableData: [],
            loading: false
        }
    },
    components: {
        filterArea
    },
    methods: {
        loadData () {
            this.loading = true
            setTimeout(() => {
                this.tableData = [{
                    id: '1',
                    index: 1,
                    orderNo: '00000001',
                    projectName: 'xxxxxxx',
                    orderDate: '2020-11-11',
                    startDate: '2020-11-11',
                    endDate: '2020-11-11',
                    appointmentDays: 1,
                    actualDays: 1,
                    refundDays: 1,
                    settleDate: '2020-11-11',
                    discussPrice: 100,
                    payAmount: 100,
                    payStatistics: 1,
                    reduceDays: 1,
                    reduceAmount: 1,
                    refundAmount: 1,
                    refundStatistics: 1,
                    actualAmount: 1,
                    confirmIncome: 1,
                    refundTime: '2020-11-11 14:25',
                    contract: 'xxx',
                    address: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
                    phone: '16666666666',
                    teacher: 'xxx'
                }]
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.hospital = undefined
            this.params.startDate = ''
            this.params.endDate = ''
            this.dateTime = []
            this.params.admin = ''
            this.loadData()
        },
        changeDate (date, dateString) {
            this.params.startDate = dateString[0]
            this.params.endDate = dateString[1]
            this.loadData()
        }
    },
    created () {
        this.loadData()
    }
}
</script>
<style lang="less">
.income {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px;
}
</style>
