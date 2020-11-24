<template>
    <div class="salary-audit">
        <filter-area @search="loadData" @clear="clear">
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id">
            <template slot="operation" slot-scope="text, props">
                <a style="margin-right: 5px;" @click="toView(props)">查看</a>
                <a>导出</a>
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
            params: {
                hospital: undefined
            },
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
        filterArea
    },
    methods: {
        loadData () {
            this.loading = true
            setTimeout(() => {
                this.tableData = [{
                    id: '132',
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
            this.loadData()
        },
        toView (data) {
            this.currentSalary = data
            this.$router.push('/collect/salaryDetails/' + data.id + '/audit')
        },
    },
    created () {
        this.loadData()
    }
}
</script>
<style lang="less">
.salary-audit {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px;
}
</style>
