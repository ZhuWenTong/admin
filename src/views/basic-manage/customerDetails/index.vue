<template>
    <page-container>
        <filter-area @search="loadData" @clear="clear">
            <a-input v-model="params.keyword" placeholder="姓名/手机号" allowClear />
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-range-picker v-model="dateTime" @change="changeDate"></a-range-picker>
            <a-select placeholder="请选择服务状态" allowClear @change="loadData" v-model="params.status">
                <a-select-option v-for="item in statusOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id">
            <!-- <template slot="operation" slot-scope="text, props">
                <a @click="toView(props)">查看</a>
            </template> -->
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
            statusOption: [{
                label: '服务中',
                value: '1'
            }, {
                label: '服务结束',
                value: '2'
            }],
            params: {
                keyword: '',
                hospital: undefined,
                startDate: '',
                endDate: '',
                status: undefined
            },
            dateTime: [],
            columns: [{
                title: '订单编号',
                dataIndex: 'orderNo'
            }, {
                title: '护工姓名',
                dataIndex: 'workerName'
            }, {
                title: '医院',
                dataIndex: 'hospital'
            }, {
                title: '住院地址',
                dataIndex: 'address'
            }, {
                title: '开始时间',
                dataIndex: 'startDate'
            }, {
                title: '结束时间',
                dataIndex: 'endDate'
            }, {
                title: '累计天数',
                dataIndex: 'days'
            }, {
                title: '订单总价',
                dataIndex: 'orderPrice'
            }, {
                title: '服务状态',
                dataIndex: 'status'
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
                    id: '1',
                    orderNo: '00000001',
                    workerName: 'xxx',
                    hospital: '浙江省人民医院',
                    address: 'xxxxxxxxxxxxxxxxx',
                    startDate: '2020-11-11 10:00',
                    endDate: '2020-11-11 18:00',
                    days: 1,
                    orderPrice: 300,
                    status: '服务中'
                }, {
                    id: '2',
                    orderNo: '00000001',
                    workerName: 'xxx',
                    hospital: '浙江省人民医院',
                    address: 'xxxxxxxxxxxxxxxxx',
                    startDate: '2020-11-11 10:00',
                    endDate: '2020-11-11 18:00',
                    days: 1,
                    orderPrice: 300,
                    status: '服务中'
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
            this.params.status = undefined
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
