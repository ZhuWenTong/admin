<template>
    <div class="salary-details">
        <filter-area @search="loadData" @clear="clear">
            <a-input v-model="params.keyword" placeholder="护工编号/护工姓名/手机号" />
            <template slot="action">
                <a-button type="primary">导出</a-button>
            </template>
        </filter-area>
        <div v-if="pageType === 'audit'" style="margin-bottom: 20px;">
            <a-button type="primary" @click="handleApprove(1)" style="margin-right: 20px;">审核通过</a-button>
            <a-button @click="handleApprove(2)">审核不通过</a-button>
        </div>
        <div v-if="pageType === 'pay'" style="margin-bottom: 20px;">
            <a-button type="primary" @click="pay">发放工资</a-button>
        </div>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id">
            <template slot="externalReward" slot-scope="text, props">
                <span v-if="pageType === 'view' || pageType === 'audit' || pageType === 'pay'">{{props.externalReward}}</span>
                <a-input v-if="pageType === 'edit'" type="number" v-model="props.externalReward" :style="{width: '100px'}" />
            </template>
            <template slot="externalDeduct" slot-scope="text, props">
                <span v-if="pageType === 'view' || pageType === 'audit' || pageType === 'pay'">{{props.externalDeduct}}</span>
                <a-input v-if="pageType === 'edit'" type="number" v-model="props.externalDeduct" :style="{width: '100px'}" />
            </template>
        </a-table>
        <dialog-approved :dialogVisible.sync="dialogVisible" :type="approvedType" />
        <dialog-pay :dialogVisible.sync="payVisible" />
    </div>
</template>
<script>
import filterArea from '@/components/page/filterArea/index'
export default {
    data () {
        return {
            params: {
                keyword: ''
            },
            columns: [{
                title: '护工编号',
                dataIndex: 'workerNo'
            }, {
                title: '护工姓名',
                dataIndex: 'workerName'
            }, {
                title: '手机号',
                dataIndex: 'phone'
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
                title: '系统奖励',
                dataIndex: 'systemReward'
            }, {
                title: '外部奖励',
                dataIndex: 'externalReward',
                scopedSlots: { customRender: 'externalReward' }
            }, {
                title: '系统扣款',
                dataIndex: 'systemDeduct'
            }, {
                title: '外部扣款',
                dataIndex: 'externalDeduct',
                scopedSlots: { customRender: 'externalDeduct' }
            }, {
                title: '实发工资',
                dataIndex: 'realSalary'
            }],
            tableData: [],
            loading: false,
            pageType: '', // edit修改 view查看 audit审核 pay发放
            dialogVisible: false,
            approvedType: null,
            payVisible: false
        }
    },
    components: {
        filterArea,
        dialogApproved: () => import('./dialogApproved'),
        dialogPay: () => import('./dialogPay')
    },
    methods: {
        loadData () {
            this.loading = true
            setTimeout(() => {
                this.tableData = [{
                    id: '123',
                    workerNo: '00000001',
                    workerName: 'xxx',
                    phone: '16666666666',
                    startDate: '2020-11-16',
                    endDate: '2020-11-16',
                    actualIncome: 100,
                    shouldPay: 100,
                    systemReward: 100,
                    externalReward: 100,
                    systemDeduct: 100,
                    externalDeduct: 100,
                    realSalary: 100
                }]
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.keyword = ''
            this.loadData()
        },
        /**
         * type 1通过 2不通过
         */
        handleApprove (type) {
            this.approvedType = type
            this.dialogVisible = true
        },
        pay () {
            this.payVisible = true
        }
    },
    created () {
        this.loadData()
        this.pageType = this.$route.params.type
    }
}
</script>
<style lang="less">
.salary-details {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px;
}
</style>
