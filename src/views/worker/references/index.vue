<template>
    <div class="references">
        <filter-area @search="loadData" @clear="clear">
            <a-input v-model="params.keyword" placeholder="姓名/手机号" allowClear />
            <a-select placeholder="请选择介绍人类型" allowClear @change="loadData" v-model="params.referencesType">
                <a-select-option v-for="item in refTypeOptions" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-select placeholder="请选择累计金额" allowClear @change="loadData" v-model="params.addMoney">
                <a-select-option v-for="item in addMoneyOptions" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <template slot="more">
                <a-select placeholder="请选择状态" allowClear @change="loadData" v-model="params.status">
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
export default {
    data () {
        return {
            params: {
                keyword: '',
                referencesType: undefined,
                hospital: undefined,
                addMoney: undefined,
                status: undefined
            },
            refTypeOptions: [{
                label: '公司护工',
                value: '1'
            }, {
                label: '本院护工',
                value: '2'
            }],
            hospitalList: [{
                label: '浙江省人民医院',
                value: '1'
            }, {
                label: '安徽省中医院',
                value: '2'
            }],
            addMoneyOptions: [{
                label: '0',
                value: '0'
            }, {
                label: '100',
                value: '100'
            }],
            statusOption: [{
                label: '未领',
                value: '1'
            }, {
                label: '已领',
                value: '2'
            }],
            columns: [{
                title: '介绍人类型',
                dataIndex: 'referencesType'
            }, {
                title: '介绍人姓名',
                dataIndex: 'referencesName'
            }, {
                title: '联系方式',
                dataIndex: 'phone'
            }, {
                title: '新护工',
                dataIndex: 'newWorker'
            }, {
                title: '联系方式',
                dataIndex: 'workerPhone'
            }, {
                title: '新护工累计天数',
                dataIndex: 'allDays'
            }, {
                title: '介绍费金额',
                dataIndex: 'referencesMoney'
            }, {
                title: '已领金额',
                dataIndex: 'getMoney'
            }, {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' }
            }],
            tableData: [],
            loading: false,
            addVisible: false
        }
    },
    components: {
        filterArea,
        dialogAdd: () => import('./dialogAdd')
    },
    methods: {
        loadData () {
            this.loading = true
            setTimeout(() => {
                this.tableData = [{
                    id: '1',
                    referencesType: '公司护工',
                    referencesName: 'xxx',
                    phone: '16666666666',
                    newWorker: 'xxx',
                    workerPhone: '18888888888',
                    allDays: '6',
                    referencesMoney: '200',
                    getMoney: '800'
                }]
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.keyword = ''
            this.params.referencesType = undefined
            this.params.hospital = undefined
            this.params.addMoney = undefined
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
.references {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px;
}
</style>
