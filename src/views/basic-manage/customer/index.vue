<template>
    <div class="customer">
        <filter-area @search="loadData" @clear="clear">
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-input v-model="params.keyword" placeholder="姓名/手机号" allowClear />
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
                keyword: ''
            },
            columns: [{
                title: '病人姓名',
                dataIndex: 'sickName'
            }, {
                title: '手机号码',
                dataIndex: 'phone'
            }, {
                title: '累计金额',
                dataIndex: 'amount'
            }, {
                title: '累计天数',
                dataIndex: 'days'
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
                    sickName: 'xxx',
                    phone: '16666666666',
                    amount: 123,
                    days: 12
                }, {
                    id: '2',
                    sickName: 'aaa',
                    phone: '16666666666',
                    amount: 234,
                    days: 2
                }]
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.hospital = undefined
            this.params.keyword = ''
            this.loadData()
        },
        toView (data) {
            this.$router.push('/basicData/customerDetails/' + data.id)
        }
    },
    created () {
        this.loadData()
    }
}
</script>
<style lang="less">
.customer {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px;
}
</style>
