<template>
    <page-container>
        <filter-area @search="loadData" @clear="clear">
            <a-input v-model="params.keyword" placeholder="姓名/手机号/护工编号" allowClear />
            <a-select placeholder="请选择服务类型" allowClear @change="loadData" v-model="params.service">
                <a-select-option v-for="item in serviceOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <my-date placeholder="请选择下单时间" v-model="params.orderTime" @change="loadData" />
            <my-date placeholder="请选择预约开始时间" v-model="params.orderStartTime" @change="loadData" />
            <template slot="more">
                <my-date placeholder="请选择预约结束时间" v-model="params.orderEndTime" @change="loadData" />
                <a-select placeholder="请选择来源" allowClear @change="loadData" v-model="params.source">
                    <a-select-option v-for="item in sourceOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
                <a-input v-model="params.operator" placeholder="请输入操作人" allowClear />
                <a-select placeholder="请选择订单状态" allowClear @change="loadData" v-model="params.orderStatus">
                    <a-select-option v-for="item in statusOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
                <a-input v-model="params.charge" placeholder="请输入责任护工" allowClear />
            </template>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered rowKey="id" :loading="loading">
            <template slot="operation" slot-scope="text, props">
                <a @click="openView(props.id)" style="margin-right: 5px;">查看</a>
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
            params: {
                keyword: '',
                service: undefined,
                orderTime: null,
                orderStartTime: null,
                orderEndTime: null,
                source: undefined,
                operator: '',
                orderStatus: undefined,
                charge: ''
            },
            loading: false,
            serviceOption: [{
                label: '院内陪护',
                value: '1'
            }, {
                label: '母婴陪护',
                value: '2'
            }],
            sourceOption: [{
                label: 'APP',
                value: 'APP'
            }, {
                label: 'WAP',
                value: 'WAP'
            }, {
                label: 'PC',
                value: 'PC'
            }],
            statusOption: [{
                label: '已确认',
                value: '1'
            }, {
                label: '申请结算',
                value: '2'
            }],
            columns: [{
                title: '服务类型',
                dataIndex: 'service'
            }, {
                title: '订单编号',
                dataIndex: 'orderNo'
            }, {
                title: '下单时间',
                dataIndex: 'orderTime'
            }, {
                title: '联系人姓名',
                dataIndex: 'contactName'
            }, {
                title: '住院地址',
                dataIndex: 'address'
            }, {
                title: '预约开始时间',
                dataIndex: 'orderStartTime'
            }, {
                title: '预约结束时间',
                dataIndex: 'orderEndTime'
            }, {
                title: '护工小组名称',
                dataIndex: 'groupName'
            }, {
                title: '责任护工',
                dataIndex: 'charge'
            }, {
                title: '操作人',
                dataIndex: 'operator'
            }, {
                title: '订单状态',
                dataIndex: 'orderStatus'
            }, {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' }
            }],
            tableData: [{
                id: '1',
                service: '院内陪护',
                orderNo: '00000001',
                orderTime: '2020-11-05 16:11',
                contactName: 'xxx',
                address: 'xxxxxxxxxxx',
                orderStartTime: '2020-11-05 16:11',
                orderEndTime: '2020-11-05 16:11',
                groupName: 'xxx',
                charge: 'xxx',
                operator: 'xxx',
                orderStatus: '已确认'
            }, {
                id: '2',
                service: '院内陪护',
                orderNo: '00000001',
                orderTime: '2020-11-05 16:11',
                contactName: 'xxx',
                address: 'xxxxxxxxxxx',
                orderStartTime: '2020-11-05 16:11',
                orderEndTime: '2020-11-05 16:11',
                groupName: 'xxx',
                charge: 'xxx',
                operator: 'xxx',
                orderStatus: '已确认'
            }, {
                id: '3',
                service: '院内陪护',
                orderNo: '00000001',
                orderTime: '2020-11-05 16:11',
                contactName: 'xxx',
                address: 'xxxxxxxxxxx',
                orderStartTime: '2020-11-05 16:11',
                orderEndTime: '2020-11-05 16:11',
                groupName: 'xxx',
                charge: 'xxx',
                operator: 'xxx',
                orderStatus: '已确认'
            }]
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
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.keyword = ''
            this.params.service = undefined
            this.params.orderTime = null
            this.params.orderStartTime = null
            this.params.orderEndTime = null
            this.params.source = undefined
            this.params.operator = ''
            this.params.orderStatus = undefined
            this.params.charge = ''
            this.loadData()
        },
        openView (id) {
            this.$router.push('/orderManage/orderDetail/' + id)
        },
    },
    created () {
        this.loadData()
    }
}
</script>
