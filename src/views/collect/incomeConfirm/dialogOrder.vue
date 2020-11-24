<template>
    <a-modal v-model="visible" title="未确定订单" :footer="null" @cancel="cancel" width="960px">
        <a-tabs v-model="params.type" @change="changeTab">
            <a-tab-pane v-for="item in tabData" :key="item.id" :tab="item.label + '(' + item.value +')'"></a-tab-pane>
        </a-tabs>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id"></a-table>
    </a-modal>
</template>
<script>
export default {
    props: {
        dialogVisible: Boolean
    },
    data () {
        return {
            visible: false,
            tabData: [{
                label: '未补齐金额',
                value: 24,
                id: '1'
            }, {
                label: '未产生费用',
                value: 0,
                id: '2'
            }, {
                label: '状态不满足',
                value: 10,
                id: '3'
            }, {
                label: '已确认订单',
                value: 0,
                id: '4'
            }],
            params: {
                type: '1'
            },
            columns: [{
                title: '订单号',
                dataIndex: 'orderNo'
            }, {
                title: '患者姓名',
                dataIndex: 'patientName'
            }, {
                title: '说明',
                dataIndex: 'instructions'
            }],
            tableData: [],
            loading: false
        }
    },
    methods: {
        cancel () {
            this.$emit('update:dialogVisible', false)
        },
        loadData () {
            this.loading = true
            setTimeout(() => {
                this.tableData = [{
                    id: '1',
                    orderNo: '00000001',
                    patientName: 'xxx',
                    instructions: 'xxxxxxxxxxxxxxxxxxx'
                }]
                this.loading = false
            }, 1000);
        },
        changeTab () {
            this.loadData()
        }
    },
    created () {
        this.loadData()
    },
    watch: {
        dialogVisible: {
            handler (val) {
                this.visible = val
            },
            immediate: true
        }
    }
}
</script>
