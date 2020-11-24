<template>
    <div class="field-work">
        <filter-area @search="loadData" @clear="clear">
            <a-input v-model="params.keyword" placeholder="姓名/手机号" allowClear />
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-range-picker v-model="dateTime" @change="changeDate"></a-range-picker>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id"></a-table>
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
                keyword: '',
                hospital: undefined,
                startDate: '',
                endDate: ''
            },
            dateTime: [],
            columns: [{
                title: '所属医院',
                dataIndex: 'hospital'
            }, {
                title: '员工姓名',
                dataIndex: 'employeeName'
            }, {
                title: '联系方式',
                dataIndex: 'phone'
            }, {
                title: '开单数量',
                dataIndex: 'orderNum'
            }, {
                title: '结单数量',
                dataIndex: 'statementNum'
            }, {
                title: '收款金额',
                dataIndex: 'paymentAmount'
            }, {
                title: '退款金额',
                dataIndex: 'refundAmount'
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
                    id: '12',
                    hospital: '浙江省人民医院',
                    employeeName: 'xxx',
                    phone: '16666666666',
                    orderNum: 12,
                    statementNum: 10,
                    paymentAmount: 123,
                    refundAmount: 100
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
            this.loadData()
        },
        changeDate (date, dateString) {
            this.params.startData = dateString[0]
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
.field-work {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px;
}
</style>
