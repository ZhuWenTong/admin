<template>
    <a-modal v-model="visible" title="组员变动" @cancel="cancel" :footer="null" width="1000px">
        <filter-area @search="loadData" @clear="clear">
            <a-input v-model="params.member" placeholder="请输入成员名称" allowClear />
            <my-date placeholder="请选择生效时间" v-model="params.effectTime" @change="loadData" />
            <a-select placeholder="请选择记录来源" allowClear @change="loadData" v-model="params.recordSource">
                <a-select-option v-for="item in sourceOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id"></a-table>
    </a-modal>
</template>
<script>
import filterArea from '@/components/page/filterArea/index'
import myDate from '@/views/components/myDate/index'
export default {
    props: {
        dialogVisible: Boolean,
        data: Object
    },
    data () {
        return {
            visible: false,
            params: {
                member: '',
                effectTime: null,
                recordSource: undefined
            },
            sourceOption: [{
                label: '创建',
                value: '1'
            }, {
                label: '变动',
                value: '2'
            }],
            columns: [{
                title: '生效时间',
                dataIndex: 'effectTime'
            }, {
                title: '小组名称',
                dataIndex: 'groupName'
            }, {
                title: '成员',
                dataIndex: 'member'
            }, {
                title: '记录来源',
                dataIndex: 'recordSource'
            }],
            tableData: [{
                id: '1',
                effectTime: '2020-11-05 15:25',
                groupName: 'a',
                member: 'xxx,yyy',
                recordSource: '创建'
            }, {
                id: '2',
                effectTime: '2020-11-05 15:25',
                groupName: 'b',
                member: 'xxx,yyy',
                recordSource: '创建'
            }, {
                id: '3',
                effectTime: '2020-11-05 15:25',
                groupName: 'c',
                member: 'xxx,zzz',
                recordSource: '变动'
            }],
            loading: false
        }
    },
    components: {
        filterArea,
        myDate
    },
    methods: {
        cancel () {
            this.$emit('update:dialogVisible', false)
        },
        loadData () {
            this.loading = true
            setTimeout(() => {
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.member = ''
            this.params.effectTime = null
            this.params.recordSource = undefined
            this.loadData()
        }
    },
    watch: {
        dialogVisible: {
            handler (val) {
                this.visible = val
            },
            immediate: true
        }
    },
    created () {
        this.loadData()
    }
}
</script>
