<template>
    <page-container>
        <filter-area @search="loadData" @clear="clear">
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-select placeholder="请选择护工" allowClear @change="loadData" v-model="params.worker">
                <a-select-option v-for="item in workerList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-month-picker placeholder="请选择发放时间" v-model="dateTime" @change="changeDate" :style="{width: '200px'}" />
            <a-select placeholder="请选择发放状态" allowClear @change="loadData" v-model="params.grantStatus">
                <a-select-option v-for="item in statusOptions" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <template slot="more">
                <my-date placeholder="请选择操作日期" v-model="params.operateDate" @change="loadData" />
            </template>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id" :scroll="{ x: 2200 }">
            <template slot="operation" slot-scope="text, props">
                <a style="margin-right: 5px;" @click="toView(props)">查看</a>
            </template>
        </a-table>
    </page-container>
</template>
<script>
import pageContainer from '@/views/components/page-container/index'
import filterArea from '@/components/page/filterArea/index'
import myDate from '@/views/components/myDate/index'
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
            workerList: [{
                label: '李菊花',
                value: '1'
            }, {
                label: '王桂花',
                value: 2
            }],
            statusOptions: [{
                label: '发放中',
                value: '1'
            }, {
                label: '发放成功',
                value: '2'
            }],
            params: {
                hospital: undefined,
                worker: undefined,
                grantTime: '',
                grantStatus: undefined,
                operateDate: null
            },
            dateTime: null,
            columns: [{
                title: '护工编号',
                dataIndex: 'workerNo',
                width: 150,
                fixed: 'left'
            }, {
                title: '护工姓名',
                dataIndex: 'workerName',
                width: 100,
                fixed: 'left'
            }, {
                title: '发放时间',
                dataIndex: 'grantTime',
                width: 150
            }, {
                title: '手机号码',
                dataIndex: 'phone',
                width: 150
            }, {
                title: '起薪日期',
                dataIndex: 'startDate',
                width: 150
            }, {
                title: '计薪截止日期',
                dataIndex: 'endDate',
                width: 150
            }, {
                title: '订单实际收入',
                dataIndex: 'actualIncome',
                width: 120
            }, {
                title: '应发工资',
                dataIndex: 'shouldPay',
                width: 100
            }, {
                title: '系统奖励',
                dataIndex: 'systemReward',
                width: 100
            }, {
                title: '外部奖励',
                dataIndex: 'externalReward',
                width: 100
            }, {
                title: '系统扣款',
                dataIndex: 'systemDeduct',
                width: 100
            }, {
                title: '外部扣款',
                dataIndex: 'externalDeduct',
                width: 100
            }, {
                title: '实发工资',
                dataIndex: 'realSalary',
                width: 100
            }, {
                title: '发放状态',
                dataIndex: 'grantStatus',
                width: 100
            }, {
                title: '返回结果',
                dataIndex: 'result'
            }, {
                title: '操作时间',
                dataIndex: 'operateTime',
                width: 160
            }, {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' },
                width: 160
            }],
            tableData: [],
            loading: false
        }
    },
    components: {
        pageContainer,
        filterArea,
        myDate
    },
    methods: {
        loadData () {
            this.loading = true
            setTimeout(() => {
                this.tableData = [{
                    id: '234',
                    grantTime: '2020-11-17 14:41',
                    workerNo: '00000012',
                    workerName: 'xxx',
                    phone: '18888888888',
                    startDate: '2020-11-17',
                    endDate: '2020-11-17',
                    actualIncome: 120,
                    shouldPay: 100,
                    systemReward: 100,
                    externalReward: 100,
                    systemDeduct: 20,
                    externalDeduct: 0,
                    realSalary: 400,
                    grantStatus: '已发放',
                    result: '12345',
                    operateTime: '2020-11-17 14:45'
                }]
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.hospital = undefined
            this.params.worker = undefined
            this.params.grantTime = ''
            this.dateTime = null
            this.params.grantStatus = undefined
            this.params.operateDate = null
            this.loadData()
        },
        changeDate (date, dateString) {
            this.params.grantTime = dateString
            this.loadData()
        },
        toView (data) {
            this.$router.push('/collect/salaryDetails/' + data.id + '/view')
        }
    },
    created () {
        this.loadData()
    }
}
</script>
