<template>
    <div class="salary">
        <filter-area @search="loadData" @clear="clear">
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-month-picker placeholder="请选择发放时间" v-model="dateTime" @change="changeDate" :style="{width: '200px'}" />
            <a-select placeholder="请选择状态" allowClear @change="loadData" v-model="params.status">
                <a-select-option v-for="item in statusOptions" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <template slot="action">
                <a-button type="primary">生成工资单</a-button>
            </template>
        </filter-area>
		<a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id">
            <template slot="operation" slot-scope="text, props">
                <a style="margin-right: 5px;" @click="toView(props)">查看</a>
                <a style="margin-right: 5px;" @click="toEdit(props)">编辑</a>
                <a style="margin-right: 5px;">提交</a>
                <a style="margin-right: 5px;">导出</a>
                <a style="margin-right: 5px;">重新生成</a>
                <a style="margin-right: 5px;">取消</a>
            </template>
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
            statusOptions: [{
                label: '待提交',
                value: '1'
            }, {
                label: '待审核',
                value: '2'
            }],
            params: {
                hospital: undefined,
                grantTime: '',
                status: undefined
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
            loading: false,
            currentSalary: null
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
					id: '112',
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
            }, 1000);
        },
        clear () {
            this.params.hospital = undefined
            this.params.grantTime = ''
            this.dateTime = null
            this.params.status = undefined
            this.loadData()
        },
        changeDate (date, dateString) {
            this.params.grantTime = dateString
            this.loadData()
        },
        toView (data) {
            this.currentSalary = data
            this.$router.push('/collect/salaryDetails/' + data.id + '/view')
        },
        toEdit (data) {
            this.currentSalary = data
            this.$router.push('/collect/salaryDetails/' + data.id + '/edit')
        }
    },
    created () {
        this.loadData()
    }
}
</script>
<style lang="less">
.salary {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px;
}
</style>
