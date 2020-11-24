<template>
    <div class="work-experiences">
        <div class="action">
            <a-button type="primary" @click="add">新增</a-button>
        </div>
        <a-table :columns="columns" :data-source="model.experiences" bordered>
            <template slot="operation" slot-scope="text, props, index">
                <a @click="edit(props)" style="margin-right: 5px;">编辑</a>
                <a @click="deleteItem(props, index)">删除</a>
            </template>
        </a-table>
        <dialog-work :dialogVisible.sync="dialogVisible" :type="type" :data="currentWork" @change="handleAddData" v-if="dialogVisible" />
    </div>
</template>
<script>
import dialogWork from './dialogWork'
export default {
    data () {
        return {
            model: {
                experiences: []
            },
            columns: [{
                title: '入职公司',
                dataIndex: 'company'
            }, {
                title: '入职时间',
                dataIndex: 'entryTime'
            }, {
                title: '离职时间',
                dataIndex: 'outTime'
            }, {
                title: '离职原因',
                dataIndex: 'reason'
            }, {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' }
            }],
            dialogVisible: false,
            type: 'add',
            currentWork: null
        }
    },
    components: {
        dialogWork
    },
    methods: {
        loadData () {},
        handleAddData (data, type) {
            console.log(data)
            if (type === 'add') {
                this.model.experiences.push(data)
            }
        },
        add () {
            this.type = 'add'
            this.dialogVisible = true
        },
        edit (data) {
            console.log(data)
            this.type = 'edit'
            this.currentWork = data
            this.dialogVisible = true
        },
        deleteItem (data, index) {
            console.log(data, index)
            const _this = this
            this.$confirm({
                title: '提示',
                content: '此操作将删除该工作记录, 是否继续?',
                onOk () {
                    _this.model.experiences.splice(index, 1)
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
.work-experiences {
    padding-bottom: 20px;
    .action {
        display: flex;
        flex-direction: row-reverse;
        margin-bottom: 20px;
    }
}
</style>
