<template>
    <div class="role-manage">
        <div style="margin-bottom: 20px;">
            <a-button @click="add" icon="plus-circle" type="primary">添加</a-button>
        </div>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id">
            <template slot="operation" slot-scope="text, props">
                <a-button type="primary" @click="edit(props)" style="margin-right: 10px;">编辑</a-button>
                <a-button type="danger" @click="deleteItem(props)">删除</a-button>
            </template>
        </a-table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            columns: [{
                title: '角色名称',
                dataIndex: 'roleName'
            }, {
                title: '角色描述',
                dataIndex: 'description'
            }, {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' },
                width: 300
            }],
            tableData: [],
            loading: false
        }
    },
    methods: {
        loadData () {
            this.loading = true
            setTimeout(() => {
                this.tableData = [{
                    id: '1',
                    roleName: '管理老师',
                    description: '管理老师'
                }]
                this.loading = false
            }, 1000)
        },
        add () {
            this.$router.push('/roleManage/permission/0/add')
        },
        edit (data) {
            this.$router.push('/roleManage/permission/' + data.id + '/edit')
        },
        deleteItem (data) {
            this.$confirm({
                title: '提示',
                content: '确定要删除这个角色吗？',
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
<style lang="less">
.role-manage {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px;
}
</style>
