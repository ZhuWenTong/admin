<template>
    <div class="borrow">
        <filter-area @search="loadData" @clear="clear">
            <a-input v-model="params.keyword" placeholder="姓名/手机号/护工编号" allowClear />
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <my-date placeholder="请选择借款时间" v-model="params.borrowTime" @change="loadData" />
            <a-input v-model="params.money" placeholder="请输入借款金额" allowClear type="number" />
            <template slot="more">
                <a-select placeholder="请选择金额状态" allowClear @change="loadData" v-model="params.status">
                    <a-select-option v-for="item in statusOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </template>
            <template slot="action">
                <a-button type="primary" @click="add">新增</a-button>
            </template>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id"></a-table>
        <dialogAdd :dialogVisible.sync="addVisible" v-if="addVisible" @change="loadData" />
    </div>
</template>
<script>
import filterArea from '@/components/page/filterArea/index'
import myDate from '@/views/components/myDate/index'
export default {
    data () {
        return {
            params: {
                keyword: '',
                hospital: undefined,
                borrowTime: null,
                money: '',
                status: undefined
            },
            hospitalList: [{
                label: '浙江省人民医院',
                value: '1'
            }, {
                label: '安徽省中医院',
                value: '2'
            }],
            statusOption: [{
                label: '打款中',
                value: '1'
            }, {
                label: '已打款',
                value: '2'
            }, {
                label: '已归还',
                value: '3'
            }],
            columns: [{
                title: '所属医院',
                dataIndex: 'hospital'
            }, {
                title: '护工姓名',
                dataIndex: 'workerName'
            }, {
                title: '护工编号',
                dataIndex: 'workerNo'
            }, {
                title: '手机号码',
                dataIndex: 'phone'
            }, {
                title: '借款时间',
                dataIndex: 'borrowTime'
            }, {
                title: '借款金额',
                dataIndex: 'money'
            }, {
                title: '金额状态',
                dataIndex: 'borrowStatus'
            }],
            tableData: [],
            loading: false,
            addVisible: false
        }
    },
    components: {
        filterArea,
        myDate,
        dialogAdd: () => import('./dialogAdd')
    },
    methods: {
        loadData () {
            this.loading = true
            setTimeout(() => {
                this.tableData = [{
                    id: '1',
                    hospital: '浙江省人民医院',
                    hospitalId: '1',
                    workerName: 'xxx',
                    workerNo: '00000001',
                    phone: '16666666666',
                    borrowTime: '2020-11-05 17:00',
                    money: '100',
                    borrowStatus: '已打款'
                }]
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.keyword = ''
            this.params.hospital = undefined
            this.params.borrowTime = null
            this.params.money = ''
            this.params.status = undefined
            this.loadData()
        },
        add () {
            this.addVisible = true
        }
    },
    created () {
        this.loadData()
    }
}
</script>
<style lang="less">
.borrow {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px;
}
</style>
