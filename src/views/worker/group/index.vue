<template>
    <div class="worker-group">
        <filter-area @search="loadData" @clear="clear">
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-input v-model="params.groupName" placeholder="请输入小组名称" allowClear />
            <a-select placeholder="请选择小组状态" allowClear @change="loadData" v-model="params.groupStatus">
                <a-select-option v-for="item in groupOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <template slot="action">
                <a-button type="primary" @click="addGroup">添加小组</a-button>
            </template>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading">
            <template slot="member" slot-scope="text, props">
                <span>{{props.member.map(i => i.name).join('，')}}</span>
            </template>
            <template slot="servicePoint" slot-scope="text, props">
                <span>{{props.servicePoint.map(i => i.label).join('/')}}</span>
            </template>
            <template slot="groupStatus" slot-scope="text, props">
                <span>{{props.groupStatus === 1 ? '正常' : '禁用'}}</span>
            </template>
            <template slot="operation" slot-scope="text, props">
                <a @click="changeMember(props)" style="margin-right: 5px;">组员变动</a>
                <a @click="openRecord(props)" style="margin-right: 5px;">历史记录</a>
                <a @click="handleDisable(props)" style="margin-right: 5px;">禁用</a>
                <a @click="openDetail(props)">查看订单</a>
            </template>
        </a-table>
        <dialogAddGroup :dialogVisible.sync="addGroupVisible" v-if="addGroupVisible" @submit="submit" />
        <dialogChange :dialogVisible.sync="changeVisible" v-if="changeVisible" :data="currentGroup" @change="changeGroup" />
        <dialogRecord :dialogVisible.sync="recordVisible" v-if="recordVisible" :data="currentGroup" />
    </div>
</template>
<script>
import filterArea from '@/components/page/filterArea/index'
export default {
    data () {
        return {
            loading: false,
            params: {
                hospital: undefined,
                groupName: '',
                groupStatus: undefined
            },
            hospitalList: [{
                label: '浙江省人民医院',
                value: '1'
            }, {
                label: '安徽省中医院',
                value: '2'
            }],
            groupOption: [{
                label: '正常',
                value: '1'
            }, {
                label: '禁用',
                value: '2'
            }],
            columns: [{
                title: '小组名称',
                dataIndex: 'groupName'
            }, {
                title: '成员',
                dataIndex: 'member',
                scopedSlots: { customRender: 'member' }
            }, {
                title: '服务点',
                dataIndex: 'servicePoint',
                scopedSlots: { customRender: 'servicePoint' }
            }, {
                title: '小组状态',
                dataIndex: 'groupStatus',
                scopedSlots: { customRender: 'groupStatus' }
            }, {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' },
                width: '300px'
            }],
            tableData: [],
            currentGroup: null,
            addGroupVisible: false,
            changeVisible: false,
            recordVisible: false
        }
    },
    components: {
        filterArea,
        dialogAddGroup: () => import('./dialogAddGroup'),
        dialogChange: () => import('./dialogChange'),
        dialogRecord: () => import('./dialogRecord')
    },
    methods: {
        loadData () {
            this.loading = true
            setTimeout(() => {
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.hospital = undefined
            this.params.groupName = ''
            this.params.groupStatus = undefined
        },
        addGroup () {
            this.addGroupVisible = true
        },
        changeMember (data) {
            this.currentGroup = data
            this.changeVisible = true
        },
        openRecord (data) {
            this.currentGroup = data
            this.recordVisible = true
        },
        handleDisable (data) {
            console.log(data)
            this.$confirm({
                title: '提示',
                content: '此操作将禁用该小组, 是否继续?',
                onOk () {
                    console.log('OK')
                },
                onCancel () {
                    console.log('Cancel')
                }
            })
        },
        openDetail (data) {
            console.log(data)
            this.$router.push('/workerManage/teamOrders/1')
        },
        submit (data) {
            console.log(data)
            this.tableData.push(data)
        },
        changeGroup (data) {
            console.log('change: ', data)
        }
    },
    created () {
        this.loadData()
    }
}
</script>
<style lang="less">
.worker-group {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px;
}
</style>
