<template>
    <page-container>
        <filter-area @search="loadData" @clear="clear">
            <a-input v-model="params.keyword" placeholder="姓名/手机号/护工编号" allowClear />
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <my-date placeholder="请选择领取时间" v-model="params.receiveTime" @change="loadData" />
            <a-select placeholder="请选择押金状态" allowClear @change="loadData" v-model="params.depositStatus">
                <a-select-option v-for="item in statusOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <template slot="action">
                <a-button type="primary" @click="add">添加</a-button>
            </template>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id">
            <!-- <template slot="operation" slot-scope="text, props">

            </template> -->
        </a-table>
        <dialog-add :dialogVisible.sync="dialogVisible" v-if="dialogVisible" @submit="submit" />
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
                hospital: undefined,
                receiveTime: null,
                depositStatus: undefined
            },
            hospitalList: [{
                label: '浙江省人民医院',
                value: '1'
            }, {
                label: '安徽省中医院',
                value: '2'
            }],
            statusOption: [{
                label: '未支付',
                value: '1'
            }, {
                label: '已支付',
                value: '2'
            }, {
                label: '已退款',
                value: '3'
            }],
            loading: false,
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
                title: '性别',
                dataIndex: 'sex'
            }, {
                title: '手机号码',
                dataIndex: 'phone'
            }, {
                title: '领取时间',
                dataIndex: 'receiveTime'
            }, {
                title: '归还时间',
                dataIndex: 'returnTime'
            }, {
                title: '押金名称',
                dataIndex: 'depositName'
            }, {
                title: '金额',
                dataIndex: 'money'
            }, {
                title: '押金状态',
                dataIndex: 'depositStatus'
            }, {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' }
            }],
            tableData: [],
            dialogVisible: false
        }
    },
    components: {
        pageContainer,
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
                    sex: '男',
                    phone: '16666666666',
                    receiveTime: '2020-11-05 17:00',
                    returnTime: '2020-11-05 17:00',
                    depositName: 'xxxxxx',
                    money: '100',
                    depositStatus: '已支付'
                }]
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.keyword = ''
            this.params.hospital = undefined
            this.params.receiveTime = null
            this.params.depositStatus = undefined
            this.loadData()
        },
        add () {
            this.dialogVisible = true
        },
        submit (data) {
            console.log(data)
        }
    },
    created () {
        this.loadData()
    }
}
</script>
