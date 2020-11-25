<template>
    <page-container>
        <filter-area @search="loadData" @clear="clear">
            <a-input v-model="params.keyword" placeholder="姓名/手机号/订单编号" allowClear />
            <a-range-picker v-model="dateTime" @change="changeDate"></a-range-picker>
            <a-select placeholder="请选择服务状态" allowClear @change="loadData" v-model="params.status">
                <a-select-option v-for="item in statusOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id">
            <template slot="operation" slot-scope="text, props">
                <a @click="toView(props)">查看</a>
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
            statusOption: [{
                label: '服务中',
                value: '1'
            }, {
                label: '已结束',
                value: '2'
            }],
            params: {
                keyword: '',
                startData: '',
                endDate: '',
                status: undefined
            },
            dateTime: [],
            columns: [{
                title: '所属医院',
                dataIndex: 'hospital'
            }, {
                title: '归属病区',
                dataIndex: 'ward'
            }, {
                title: '订单编号',
                dataIndex: 'orderNo'
            }, {
                title: '病人姓名',
                dataIndex: 'patientName'
            }, {
                title: '护工姓名',
                dataIndex: 'workerName'
            }, {
                title: '开始时间',
                dataIndex: 'startTime'
            }, {
                title: '结束时间',
                dataIndex: 'endTime'
            }, {
                title: '累计天数',
                dataIndex: 'days'
            }, {
                title: '订单总价',
                dataIndex: 'orderPrice'
            }, {
                title: '管理费金额',
                dataIndex: 'manageAmounts'
            }, {
                title: '服务状态',
                dataIndex: 'serviceStatus'
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
                    id: 11,
                    hospital: '浙江省人民医院',
                    ward: '一号楼一楼',
                    orderNo: '00000001',
                    patientName: 'xxx',
                    workerName: 'xxx',
                    startTime: '2020-11-11 16:30',
                    endTime: '2020-11 17:00',
                    days: 1,
                    orderPrice: 300,
                    manageAmounts: 20,
                    serviceStatus: '服务中'
                }]
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.keyword = ''
            this.params.startData = ''
            this.params.endDate = ''
            this.dateTime = []
            this.params.status = undefined
            this.loadData()
        },
        changeDate (date, dateString) {
            this.params.startData = dateString[0]
            this.params.endDate = dateString[1]
            this.loadData()
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
