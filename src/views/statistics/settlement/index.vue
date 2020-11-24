<template>
    <div class="settlement">
        <filter-area @search="loadData" @clear="clear">
            <a-range-picker v-model="dateTime" @change="changeDate"></a-range-picker>
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-select placeholder="请选择楼栋" allowClear @change="loadData" v-model="params.building">
                <a-select-option v-for="item in buildOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-select placeholder="请选择病区/楼层" allowClear @change="loadData" v-model="params.area">
                <a-select-option v-for="item in areaOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-input v-model="params.admin" placeholder="请输入管理员姓名" allowClear />
        </filter-area>
        <div class="total">
            <p>结算总额：10.24元   护工费总额：8.19元   管理费总额：2.05元   结算收款：9.84元</p>
            <p>POS机：0.24元   现金：10元  </p>
        </div>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id" :scroll="{ x: 2500 }">
            <p slot="expandedRowRender" slot-scope="props" style="margin: 0">
                备注：{{ props.remark }}
            </p>
        </a-table>
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
            buildOption: [{
                label: '一号楼',
                value: '1'
            }, {
                label: '二号楼',
                value: '2'
            }],
            areaOption: [{
                label: '一楼',
                value: '1'
            }, {
                label: '二楼',
                value: '2'
            }],
            params: {
                startDate: '',
                endDate: '',
                hospital: undefined,
                building: undefined,
                area: undefined,
                admin: ''
            },
            dateTime: [],
            columns: [{
                title: '订单编号',
                dataIndex: 'orderNo',
                width: 120
            }, {
                title: '结算日期',
                dataIndex: 'settleDate',
                width: 160
            }, {
                title: '楼栋',
                dataIndex: 'building',
                width: 100
            }, {
                title: '病区/楼层',
                dataIndex: 'ward',
                width: 100
            }, {
                title: '床位号',
                dataIndex: 'bedNo',
                width: 100
            }, {
                title: '管理老师',
                dataIndex: 'teacher',
                width: 100
            }, {
                title: '护工姓名',
                dataIndex: 'workerName',
                width: 100
            }, {
                title: '病人姓名',
                dataIndex: 'patientName',
                width: 100
            }, {
                title: '联系方式',
                dataIndex: 'phone',
                width: 160
            }, {
                title: '陪护日期',
                dataIndex: 'escortDate',
            }, {
                title: '单价',
                dataIndex: 'price',
                width: 100
            }, {
                title: '天数',
                dataIndex: 'days',
                width: 100
            }, {
                title: '实际订单金额',
                dataIndex: 'actualAmount',
                width: 120
            }, {
                title: '护工费结算',
                dataIndex: 'nursingFee',
                width: 120
            }, {
                title: '管理费结算',
                dataIndex: 'manageFee',
                width: 120
            }, {
                title: '预收款',
                dataIndex: 'advanceAmount',
                width: 120
            }, {
                title: '收款方式',
                dataIndex: 'paymentMethod',
                width: 100
            }, {
                title: '结算收款',
                dataIndex: 'settlePayment',
                width: 100
            }, {
                title: '结算方式',
                dataIndex: 'settleMethod',
                width: 100
            }, {
                title: '退款金额',
                dataIndex: 'refundAmount',
                width: 100
            }, {
                title: '退款方式',
                dataIndex: 'refundMethod',
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
                    id: '111',
                    orderNo: '00000001',
                    settleDate: '2020-11-12',
                    building: '一号楼',
                    ward: '1楼',
                    bedNo: '2号床',
                    teacher: 'xxx',
                    workerName: 'xxx',
                    patientName: 'xxx',
                    phone: '16666666666',
                    escortDate: '2020-11-11至2020-11-12',
                    price: 100,
                    days: 2,
                    actualAmount: 120,
                    nursingFee: 100,
                    manageFee: 10,
                    advanceAmount: 100,
                    paymentMethod: '微信',
                    settlePayment: 100,
                    settleMethod: '支付宝',
                    refundAmount: 100,
                    refundMethod: '现金',
                    remark: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
                }]
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.startDate = ''
            this.params.endDate = ''
            this.dateTime = []
            this.params.hospital = undefined
            this.params.building = undefined
            this.params.area = undefined
            this.params.admin = ''
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
.settlement {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px;
}
</style>