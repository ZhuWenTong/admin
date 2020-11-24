<template>
    <div class="department">
        <filter-area @search="loadData" @clear="clear">
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-range-picker v-model="dateTime" @change="changeDate"></a-range-picker>
            <template slot="action">
                <a-button type="primary">导出</a-button>
            </template>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id">
            <template slot="operation" slot-scope="text, props">
                <a @click="toView(props)">查看</a>
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
                hospital: undefined,
                startDate: '',
                endData: ''
            },
            dateTime: [],
            columns: [{
                title: '归属病区',
                dataIndex: 'ward'
            }, {
                title: '服务病人数',
                dataIndex: 'servicePatientsNum'
            }, {
                title: '当前病人数',
                dataIndex: 'currentPatientsNum'
            }, {
                title: '当前护工数',
                dataIndex: 'currentWorkerNum'
            }, {
                title: '用工配比',
                dataIndex: 'workRate'
            }, {
                title: '累计天数',
                dataIndex: 'days'
            }, {
                title: '累计金额',
                dataIndex: 'allAmonuts'
            }, {
                title: '管理费金额',
                dataIndex: 'manageAmount'
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
                    id: '1',
                    ward: '2楼',
                    servicePatientsNum: 2,
                    currentPatientsNum: 4,
                    currentWorkerNum: 2,
                    workRate: 1,
                    days: 2,
                    allAmonuts: 500,
                    manageAmount: 10
                }]
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.hospital = undefined
            this.params.startDate = ''
            this.params.endData = ''
            this.dateTime = []
            this.loadData()
        },
        changeDate (date, dateString) {
            this.params.startDate = dateString[0]
            this.params.endData = dateString[1]
            this.loadData()
        },
        toView (data) {
            this.$router.push('/statistics/departmentDetails/' + data.id)
        }
    },
    created () {
        this.loadData()
    }
}
</script>
<style lang="less">
.department {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px;
}
</style>
