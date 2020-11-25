<template>
    <page-container>
        <filter-area :showSearchBtn="false">
            <div>
                <span style="width: 80px;">医院状态：</span>
                <a-select placeholder="请选择医院状态" allowClear @change="loadData" v-model="params.status">
                    <a-select-option v-for="item in statusOptions" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </div>
            <template slot="action">
                <a-button type="primary" @click="add" icon="plus-circle">添加</a-button>
            </template>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id">
            <template slot="status" slot-scope="text, props">
                {{props.status === '1' ? '已启用' : '已禁用'}}
            </template>
            <template slot="operation" slot-scope="text, props">
                <a-button type="primary" style="margin-right: 5px;" @click="edit(props)">编辑</a-button>
                <a-button v-if="props.status === '1'" style="background: #ff4d4f;color: #fff;border-color: #ff4d4f;" @click="handleDisable(props)">禁用</a-button>
                <a-button v-if="props.status === '2'" style="background: #5daf34;color: #fff;border-color: #5daf34;" @click="handleEnable(props)">启用</a-button>
            </template>
        </a-table>
        <dialog-panel :dialogVisible.sync="dialogVisible" v-if="dialogVisible" :type="type" :data="currentHospital" />
    </page-container>
</template>
<script>
import pageContainer from '@/views/components/page-container/index'
import filterArea from '@/components/page/filterArea/index'
export default {
    data () {
        return {
            params: {
                status: undefined
            },
            statusOptions: [{
                label: '全部',
                value: '0'
            }, {
                label: '已启用',
                value: '1'
            }, {
                label: '已禁用',
                value: '2'
            }],
            columns: [{
                title: '医院id',
                dataIndex: 'id'
            }, {
                title: '医院logo',
                dataIndex: 'logo'
            }, {
                title: '医院名称',
                dataIndex: 'hospital'
            }, {
                title: '创建人',
                dataIndex: 'creator'
            }, {
                title: '医院地址',
                dataIndex: 'address'
            }, {
                title: '简介',
                dataIndex: 'abstract'
            }, {
                title: '状态',
                dataIndex: 'status',
                scopedSlots: { customRender: 'status' }
            }, {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' }
            }],
            tableData: [],
            loading: false,
            dialogVisible: false,
            type: '',
            currentHospital: null
        }
    },
    components: {
        pageContainer,
        filterArea,
        dialogPanel: () => import('./dialogPanel')
    },
    methods: {
        loadData () {
            this.loading = true
            setTimeout(() => {
                this.tableData = [{
                    id: '1',
                    logo: 'logo',
                    hospital: '浙江省人民医院',
                    creator: '杭州新视窗信息技术有限公司',
                    address: '杭州市下城区上塘路158号',
                    abstract: 'xxxxxxxxx',
                    status: '1'
                }, {
                    id: '2',
                    logo: 'logo',
                    hospital: '武进人民医院南院',
                    creator: '杭州新视窗信息技术有限公司',
                    address: '武进区马杭镇滆湖东路85号',
                    abstract: 'qqqqqqqqqqqqqqqqq',
                    status: '2'
                }]
                this.loading = false
            }, 1000)
        },
        add () {
            this.type = 'add'
            this.dialogVisible = true
        },
        edit (data) {
            this.type = 'edit'
            this.currentHospital = data
            this.dialogVisible = true
        },
        handleDisable (data) {
            this.$confirm({
                title: '提示',
                content: '确定要禁用这个医院吗？',
                onOk () {
                    console.log(data)
                },
                onCancel () {
                    console.log('Cancel')
                }
            })
        },
        handleEnable (data) {
            this.$confirm({
                title: '提示',
                content: '确定要启用这个医院吗？',
                onOk () {
                    console.log(data)
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
