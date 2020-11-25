<template>
    <page-container>
        <filter-area @search="loadData" @clear="clear">
            <div>
                <span style="width: 45px;">医院：</span>
                <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                    <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </div>
            <div>
                <span>病人姓名：</span>
                <a-input v-model="params.patientName" placeholder="请输入病人姓名" allowClear />
            </div>
            <div>
                <span>订单编号：</span>
                <a-input v-model="params.orderNo" placeholder="请输入订单编号" allowClear />
            </div>
            <template slot="action">
                <a-button type="primary" @click="openDetail">收入明细</a-button>
            </template>
        </filter-area>
        <div style="margin-bottom: 20px;">
            <a-button :disabled="disabled" style="margin-right: 20px;" @click="openConfirm">确认收入</a-button>
            <a-button @click="openConfirm">全部确认收入</a-button>
        </div>
        <a-table
            :columns="columns"
            :data-source="tableData"
            bordered
            :loading="loading"
            rowKey="id"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
            <template slot="operation" slot-scope="text, props">
                <a @click="toView(props)">明细</a>
            </template>
        </a-table>
        <dialog-details :dialogVisible.sync="dialogVisible" v-if="dialogVisible" :data="currentSettle" />
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
                patientName: '',
                orderNo: ''
            },
            dateTime: null,
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
                title: '预约日期',
                dataIndex: 'appointDate'
            }, {
                title: '预收金额',
                dataIndex: 'advanceAmount'
            }, {
                title: '确认收入周期',
                dataIndex: 'revenueCycle'
            }, {
                title: '收入金额',
                dataIndex: 'incomeAmount'
            }, {
                title: '收入方式',
                dataIndex: 'incomeMethod'
            }, {
                title: '余额',
                dataIndex: 'balance'
            }, {
                title: '余额明细',
                dataIndex: 'balanceDetails'
            }, {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' }
            }],
            tableData: [],
            loading: false,
            dialogVisible: false,
            currentSettle: null,
            selectedRowKeys: [],
            disabled: true
        }
    },
    components: {
        pageContainer,
        filterArea,
        dialogDetails: () => import('./dialogDetails')
    },
    methods: {
        loadData () {
            this.loading = true
            setTimeout(() => {
                this.tableData = [{
                    id: '1',
                    orderNo: '00000018',
                    patientName: 'xxx',
                    bedNo: '1号床',
                    appointDate: '2020-11-12',
                    advanceAmount: 100,
                    revenueCycle: 'xxxxxxxxxxx',
                    incomeAmount: 200,
                    incomeMethod: '现金',
                    balance: 100,
                    balanceDetails: 'xxxxxxxxxxxxxx'
                }, {
                    id: '2',
                    orderNo: '00000019',
                    patientName: 'xxx',
                    bedNo: '1号床',
                    appointDate: '2020-11-12',
                    advanceAmount: 100,
                    revenueCycle: 'xxxxxxxxxxx',
                    incomeAmount: 200,
                    incomeMethod: '现金',
                    balance: 100,
                    balanceDetails: 'xxxxxxxxxxxxxx'
                }, {
                    id: '3',
                    orderNo: '00000020',
                    patientName: 'xxx',
                    bedNo: '1号床',
                    appointDate: '2020-11-12',
                    advanceAmount: 100,
                    revenueCycle: 'xxxxxxxxxxx',
                    incomeAmount: 200,
                    incomeMethod: '现金',
                    balance: 100,
                    balanceDetails: 'xxxxxxxxxxxxxx'
                }]
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.hospital = undefined
            this.params.patientName = ''
            this.params.orderNo = ''
            this.loadData()
        },
        toView (data) {
            this.currentSettle = data
            this.dialogVisible = true
        },
        openDetail () {
            this.$router.push('/collect/incomeDetails')
        },
        onSelectChange (selectedRowKeys) {
            this.disabled = !selectedRowKeys.length
            this.selectedRowKeys = selectedRowKeys
        },
        openConfirm () {
            this.$router.push('/collect/incomeConfirm')
        }
    },
    created () {
        this.loadData()
    }
}
</script>
