<template>
    <page-container>
        <filter-area @search="loadData" @clear="clear">
            <a-input v-model="params.keyword" placeholder="姓名/手机号" allowClear />
            <div>
                <span style="width: 80px;">所属医院：</span>
                <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                    <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </div>
            <div>
                <span style="width: 80px;">所属角色：</span>
                <a-select placeholder="请选择角色" allowClear @change="loadData" v-model="params.role">
                    <a-select-option v-for="item in roleList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </div>
            <div>
                <span style="width: 50px;">状态：</span>
                <a-select placeholder="请选择状态" allowClear @change="loadData" v-model="params.status">
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
        <dialog-panel :dialogVisible.sync="dialogVisible" v-if="dialogVisible" :type="type" :data="currentEmployee" />
    </page-container>
</template>
<script>
import pageContainer from '@/views/components/page-container/index'
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
            roleList: [{
                label: '管理老师',
                value: '1'
            }, {
                label: '管理老师——客户',
                value: '2'
            }],
            statusOptions: [{
                label: '已启用',
                value: '1'
            }, {
                label: '已禁用',
                value: '2'
            }],
            params: {
                keyword: '',
                hospital: undefined,
                role: undefined,
                status: undefined
            },
            columns: [{
                title: '照片',
                dataIndex: 'photo'
            }, {
                title: '姓名',
                dataIndex: 'employeeName'
            }, {
                title: '性别',
                dataIndex: 'sex'
            }, {
                title: '手机号码',
                dataIndex: 'phone'
            }, {
                title: '用户名',
                dataIndex: 'userName'
            }, {
                title: '所属医院',
                dataIndex: 'hospital'
            }, {
                title: '所属角色',
                dataIndex: 'roleName'
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
            currentEmployee: null,
            type: ''
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
                    photo: 'photo',
                    employeeName: 'xxx',
                    sex: '男',
                    phone: '16666666666',
                    userName: 'qwer',
                    hospital: '浙江省人民医院',
                    roleName: '管理老师',
                    status: '1'
                }, {
                    id: '2',
                    photo: 'photo',
                    employeeName: 'xxx',
                    sex: '男',
                    phone: '16666666666',
                    userName: 'qwer',
                    hospital: '浙江省人民医院',
                    roleName: '管理老师',
                    status: '2'
                }]
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.keyword = ''
            this.params.hospital = undefined
            this.params.role = undefined
            this.params.status = undefined
            this.loadData()
        },
        add () {
            this.type = 'add'
            this.dialogVisible = true
        },
        edit (data) {
            this.type = 'edit'
            this.currentEmployee = data
            this.dialogVisible = true
        },
        handleDisable (data) {
            this.$confirm({
                title: '提示',
                content: '确定要禁用这个管理人员吗？',
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
                content: '确定要启用这个管理人员吗？',
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
