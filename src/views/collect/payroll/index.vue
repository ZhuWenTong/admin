<template>
    <page-container>
        <filter-area @search="loadData" @clear="clear">
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-month-picker placeholder="请选择发放时间" v-model="dateTime" @change="changeDate" :style="{width: '200px'}" />
            <a-select placeholder="请选择发放状态" allowClear @change="loadData" v-model="params.grantStatus">
                <a-select-option v-for="item in statusOptions" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id">
            <template slot="operation" slot-scope="text, props">
                <a style="margin-right: 5px;" @click="pay(props)">发放</a>
                <a>导出</a>
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
            statusOptions: [{
                label: '待发放',
                value: '1'
            }, {
                label: '已发放',
                value: '2'
            }],
            params: {
                hospital: undefined,
                grantTime: '',
                grantStatus: undefined
            },
            dateTime: null,
            columns: [{
                title: '所属医院',
                dataIndex: 'hospital'
            }, {
                title: '发放时间',
                dataIndex: 'grantTime'
            }, {
                title: '起薪日期',
                dataIndex: 'startDate'
            }, {
                title: '计薪截止日期',
                dataIndex: 'endDate'
            }, {
                title: '订单实际收入',
                dataIndex: 'actualIncome'
            }, {
                title: '应发工资',
                dataIndex: 'shouldPay'
            }, {
                title: '实发工资',
                dataIndex: 'realSalary'
            }, {
                title: '发放人数',
                dataIndex: 'grantNum'
            }, {
                title: '公司收入',
                dataIndex: 'companyIncome'
            }, {
                title: '医院收入',
                dataIndex: 'hospitalIncome'
            }, {
                title: '发放状态',
                dataIndex: 'grantStatus'
            }, {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' }
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
                    id: '1234',
                    hospital: '浙江省人民医院',
                    grantTime: '2020-11-16 15:41',
					startDate: '2020-11-16',
					endDate: '2020-11-16',
					actualIncome: 100,
					shouldPay: 100,
					realSalary: 100,
					grantNum: 30,
					companyIncome: 2000,
					hospitalIncome: 3000,
					grantStatus: '已发放'
                }]
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.hospital = undefined
            this.params.grantTime = ''
            this.dateTime = null
            this.params.grantStatus = undefined
            this.loadData()
        },
        changeDate (date, dateString) {
            this.params.grantTime = dateString
            this.loadData()
        },
        pay (data) {
            console.log(data)
            this.$router.push('/collect/salaryDetails/' + data.id + '/pay')
        }
    },
    created () {
        this.loadData()
    }
}
</script>
