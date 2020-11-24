<template>
    <div class="disciplinary">
        <filter-area @search="loadData" @clear="clear">
            <a-input v-model="params.keyword" placeholder="姓名/护工编号" allowClear />
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <my-date placeholder="请选择款项日期" v-model="params.paymentDate" @change="loadData" />
            <a-select placeholder="请选择款项类型" allowClear @change="loadData" v-model="params.paymentTypeId">
                <a-select-option v-for="item in paymentTypeOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <template slot="more">
                <a-select placeholder="请选择具体事由" allowClear @change="loadData" v-model="params.reason">
                    <a-select-option v-for="item in reasonList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
                <a-select placeholder="请选择金额状态" allowClear @change="loadData" v-model="params.status">
                    <a-select-option v-for="item in statusOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </template>
            <template slot="action">
                <a-button type="primary" @click="add">新增</a-button>
            </template>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id">
            <template slot="operation" slot-scope="text, props">
                <a @click="editItem(props)" style="margin-right: 5px;">编辑</a>
                <a @click="deleteItem(props)">删除</a>
            </template>
        </a-table>
        <dialog-add :dialogVisible.sync="addVisible" v-if="addVisible" @change="loadData" />
        <dialog-edit :dialogVisible.sync="editVisible" v-if="editVisible" :data="currentRecord" @change="loadData" />
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
                paymentDate: null,
                paymentTypeId: undefined,
                reason: undefined,
                status: undefined
            },
            hospitalList: [{
                label: '浙江省人民医院',
                value: '1'
            }, {
                label: '安徽省中医院',
                value: '2'
            }],
            paymentTypeOption: [{
                label: '奖励',
                value: '1'
            }, {
                label: '惩罚',
                value: '2'
            }],
            reasonList: [{
                label: '事由a',
                value: 'a'
            }, {
                label: '事由b',
                value: 'b'
            }],
            statusOption: [{
                label: '作废',
                value: '1'
            }, {
                label: '未结算',
                value: '2'
            }, {
                label: '发放中',
                value: '3'
            }, {
                label: '已结算',
                value: '4'
            }],
            loading: false,
            columns: [{
                title: '处理日期',
                dataIndex: 'processDate'
            }, {
                title: '所属医院',
                dataIndex: 'hospital'
            }, {
                title: '护工姓名',
                dataIndex: 'workerName'
            }, {
                title: '护工编号',
                dataIndex: 'workerNo'
            }, {
                title: '款项类型',
                dataIndex: 'paymentTypeName'
            }, {
                title: '具体事由',
                dataIndex: 'reason'
            }, {
                title: '金额',
                dataIndex: 'money'
            }, {
                title: '金额状态',
                dataIndex: 'status'
            }, {
                title: '处理人',
                dataIndex: 'processor'
            }, {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' }
            }],
            tableData: [],
            currentRecord: null,
            addVisible: false,
            editVisible: false
        }
    },
    components: {
        filterArea,
        myDate,
        dialogAdd: () => import('./dialogAdd'),
        dialogEdit: () => import('./dialogEdit')
    },
    methods: {
        loadData () {
            this.loading = true
            setTimeout(() => {
                this.tableData = [{
                    id: '1',
                    processDate: '2020-11-06',
                    hospital: '浙江省人民医院',
                    hospitalId: '1',
                    workerName: '张三',
                    workerId: 'zs',
                    workerNo: '00000001',
                    paymentTypeName: '奖励',
                    paymentTypeId: '1',
                    reason: '事由a',
                    reasonId: 'a',
                    money: '100',
                    status: '已结算',
                    processor: 'xxx'
                }]
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.keyword = ''
            this.params.hospital = undefined
            this.params.paymentDate = null
            this.params.paymentTypeId = undefined
            this.params.reason = undefined
            this.params.status = undefined
            this.loadData()
        },
        add () {
            this.addVisible = true
        },
        editItem (data) {
            this.currentRecord = data
            this.editVisible = true
        },
        deleteItem (data) {
            console.log(data)
            this.$confirm({
                title: '提示',
                content: '此操作将删除该奖惩记录, 是否继续?',
                onOk () {
                    console.log('OK')
                },
                onCancel () {
                    console.log('Cancel')
                }
            })
        }
    },
    created () {
        this.loadData()
    }
}
</script>
<style lang="less">
.disciplinary {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px;
}
</style>
