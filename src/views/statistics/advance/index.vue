<template>
    <div class="advance">
        <filter-area @search="loadData" @clear="clear">
            <a-range-picker v-model="dateTime" @change="changeDate" :style="{width: '300px'}"></a-range-picker>
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-select placeholder="请选择楼栋" allowClear @change="loadData" v-model="params.building">
                <a-select-option v-for="item in buildOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-select placeholder="请选择病区/楼层" allowClear @change="loadData" v-model="params.area">
                <a-select-option v-for="item in areaOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-select placeholder="请选择订单状态" allowClear @change="loadData" v-model="params.status">
                <a-select-option v-for="item in statusOptions" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-input v-model="params.admin" placeholder="请输入管理员姓名" allowClear />
        </filter-area>
        <div class="total">
            <p>预收总额:0.24元</p>
        </div>
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
            statusOptions: [{
                label: '已结算',
                value: '1'
            }, {
                label: '未结算',
                value: '2'
            }],
            params: {
                startDate: '',
                endDate: '',
                hospital: undefined,
                building: undefined,
                area: undefined,
                status: undefined,
                admin: ''
            },
            dateTime: [],
            columns: [{
                title: '订单编号',
                dataIndex: 'orderNo'
            }, {
                title: '收款日期',
                dataIndex: 'receiptDate'
            }, {
                title: '楼栋',
                dataIndex: 'building'
            }, {
                title: '病区/楼层',
                dataIndex: 'wardFloor'
            }, {
                title: '床位号',
                dataIndex: 'bedNo'
            }, {
                title: '管理老师',
                dataIndex: 'teacher'
            }, {
                title: '护工姓名',
                dataIndex: 'workerName'
            }, {
                title: '病人姓名',
                dataIndex: 'patientName'
            }, {
                title: '预收金额',
                dataIndex: 'advanceAmount'
            }, {
                title: '支付方式',
                dataIndex: 'paymentMethod'
            }, {
                title: '病患联系方式',
                dataIndex: 'phone'
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
                    orderNo: '00000012',
                    receiptDate: '2020-11-12',
                    building: '一号楼',
                    wardFloor: '1楼',
                    bedNo: '3号床',
                    teacher: 'xxx',
                    patientName: 'xxx',
                    workerName: 'xxx',
                    advanceAmount: 100,
                    paymentMethod: '微信',
                    phone: '18888888888'
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
            this.params.status = undefined
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
.advance {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px;
}
</style>
