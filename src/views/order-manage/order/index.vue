<template>
    <page-container>
        <a-tabs default-active-key="1" @change="changeTab">
            <a-tab-pane v-for="item in tabOptions" :key="item.value" :tab="item.label"></a-tab-pane>
        </a-tabs>
        <filter-area @search="loadData" @clear="clear">
            <a-input v-model="params.keyword" placeholder="姓名/手机号/订单编号" allowClear />
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <my-date v-model="params.orderDate" placeholder="请选择下单日期" @change="loadData" />
            <my-date v-model="params.startDate" placeholder="请选择预约开始时间" @change="loadData" />
            <my-date v-model="params.endDate" placeholder="请选择预约结束时间" @change="loadData" />
            <template slot="more">
                <a-select placeholder="请选择来源" allowClear @change="loadData" v-model="params.source">
                    <a-select-option v-for="item in sourceOptions" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
                <a-input v-model="params.operator" placeholder="请输入操作人" allowClear />
                <a-select placeholder="请选择订单状态" allowClear @change="loadData" v-model="params.orderStatus">
                    <a-select-option v-for="item in orderOptions" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
                <a-select placeholder="请选择申请类型" allowClear @change="loadData" v-model="params.applyType">
                    <a-select-option v-for="item in applyOptions" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
                <a-select placeholder="请选择服务类型" allowClear @change="loadData" v-model="params.serveType">
                    <a-select-option v-for="item in serveOptions" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </template>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading">
            <template slot="operation" slot-scope="text, props">
                <a @click="openView(props.key)" style="margin-right: 5px;">查看</a>
                <a @click="openCancel(props)">取消</a>
            </template>
        </a-table>
        <dialog-cancel :dialogVisible.sync="dialogVisible" :data="currentOrder" v-if="dialogVisible" />
    </page-container>
</template>
<script>
import tableData from './data'
import pageContainer from '@/views/components/page-container/index'
import filterArea from '@/components/page/filterArea/index'
import myDate from '@/views/components/myDate/index'
import dialogCancel from './dialogCancel'
export default {
    data () {
        return {
            tabOptions: [{
                label: '待确认',
                value: '1'
            }, {
                label: '进行中',
                value: '2'
            }, {
                label: '已完成',
                value: '3'
            }],
            columns: [{
                title: '所属医院',
                dataIndex: 'hospital'
            }, {
                title: '服务类型',
                dataIndex: 'serviceType'
            }, {
                title: '订单编号',
                dataIndex: 'orderNo'
            }, {
                title: '下单时间',
                dataIndex: 'createTime'
            }, {
                title: '联系人姓名',
                dataIndex: 'contactName'
            }, {
                title: '住院地址',
                dataIndex: 'address'
            }, {
                title: '预约开始时间',
                dataIndex: 'startTime'
            }, {
                title: '预约结束时间',
                dataIndex: 'endTime'
            }, {
                title: '护工',
                dataIndex: 'care'
            }, {
                title: '订单来源',
                dataIndex: 'orderSource'
            }, {
                title: '操作人',
                dataIndex: 'operator'
            }, {
                title: '申请类型',
                dataIndex: 'applicationType'
            }, {
                title: '订单状态',
                dataIndex: 'orderStatus'
            }, {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' }
            }],
            tableData: tableData,
            params: {
                keyword: '',
                hospital: undefined,
                orderDate: null,
                startDate: null,
                endDate: null,
                source: undefined,
                operator: '',
                orderStatus: undefined,
                applyType: undefined,
                serveType: undefined
            },
            hospitalList: [{
                label: '浙江省人民医院',
                value: '1'
            }, {
                label: '安徽省中医院',
                value: '2'
            }],
            sourceOptions: [{
                label: 'APP',
                value: '1'
            }, {
                label: 'WECHAT',
                value: '2'
            }],
            orderOptions: [{
                label: '待付款',
                value: '1'
            }, {
                label: '已付款',
                value: '2'
            }],
            applyOptions: [{
                label: '挂账',
                value: '1'
            }, {
                label: '改价',
                value: '2'
            }],
            serveOptions: [{
                label: '院内陪护',
                value: '1'
            }, {
                label: '母婴陪护',
                value: '2'
            }],
            dialogVisible: false,
            currentOrder: null,
            loading: false
        }
    },
    components: {
        pageContainer,
        filterArea,
        myDate,
        dialogCancel
    },
    methods: {
        loadData () {
            this.loading = true
            setTimeout(() => {
                this.loading = false
            }, 1000)
        },
        clear () {
            const {params} = this
            params.keyword = ''
            params.hospital = undefined
            params.orderDate = null
            params.startDate = null
            params.endDate = null
            params.source = undefined
            params.operator = ''
            params.orderStatus = undefined
            params.applyType = undefined
            params.serveType = undefined
            this.loadData()
        },
        changeTab (val) {
            console.log(val)
        },
        openView (id) {
            this.$router.push('/orderManage/orderDetail/' + id)
        },
        openCancel (data) {
            this.currentOrder = data
            this.dialogVisible = true
        }
    },
    created () {
        this.loadData()
    }
}
</script>
