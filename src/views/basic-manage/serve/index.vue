<template>
    <div class="serve-page">
        <filter-area @search="loadData" @clear="clear">
            <div>
                <span style="width: 80px;">所属医院：</span>
                <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                    <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </div>
            <div>
                <span style="width: 50px;">状态：</span>
                <a-select placeholder="请选择状态" allowClear @change="loadData" v-model="params.status">
                    <a-select-option v-for="item in statusOptions" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </div>
            <template slot="action">
                <a-button type="primary" @click="add">发布商品</a-button>
            </template>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id">
            <template slot="status" slot-scope="text, props">
                {{props.status === '1' ? '已上架' : '已下架'}}
            </template>
            <template slot="operation" slot-scope="text, props">
                <a-button type="primary" style="margin-right: 5px;" @click="edit(props)">编辑</a-button>
                <a-button type="danger" style="margin-right: 5px;" @click="deleteItem(props)" disabled>删除</a-button>
                <a-button v-if="props.status === '1'" type="danger" @click="takeDown(props)">下架</a-button>
                <a-button v-if="props.status === '2'" style="background: #5daf34;color: #fff;border-color: #5daf34;" @click="putaway(props)">上架</a-button>
            </template>
        </a-table>
        <dialog-panel :dialogVisible.sync="dialogVisible" v-if="dialogVisible" :type="type" :data="currentServe" />
    </div>
</template>
<script>
import filterArea from '@/components/page/filterArea/index'
export default {
    data () {
        return {
            params: {
                hospital: undefined,
                status: undefined
            },
            hospitalList: [{
                label: '浙江省人民医院',
                value: '1'
            }, {
                label: '安徽省中医院',
                value: '2'
            }],
            statusOptions: [{
                label: '已启用',
                value: '1'
            }, {
                label: '已禁用',
                value: '2'
            }],
            columns: [{
                title: '图片',
                dataIndex: 'photo'
            }, {
                title: '所属医院',
                dataIndex: 'hospital'
            }, {
                title: '名称',
                dataIndex: 'serviceName'
            }, {
                title: '基础服务价格',
                dataIndex: 'servePrice'
            }, {
                title: '创建时间',
                dataIndex: 'createTime'
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
            type: 'add',
            currentServe: null
        }
    },
    components: {
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
                    hospital: '浙江省人民医院',
                    serviceName: 'xxx',
                    servePrice: '100',
                    createTime: '2020-11-09 16:43',
                    status: '1'
                }, {
                    id: '2',
                    photo: 'photo',
                    hospital: '浙江省人民医院',
                    serviceName: 'xxx',
                    servePrice: '100',
                    createTime: '2020-11-09 16:43',
                    status: '2'
                }],
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.hospital = undefined
            this.params.status = undefined
            this.loadData()
        },
        add () {
            this.type = 'add'
            this.dialogVisible = true
        },
        edit (data) {
            this.type = 'edit'
            this.currentServe = data
            this.dialogVisible = true
        },
        deleteItem (data) {
            console.log(data)
        },
        takeDown (data) {
            this.$confirm({
                title: '提示',
                content: '确定要下架这个服务吗？',
                onOk () {
                    console.log(data)
                },
                onCancel () {
                    console.log('Cancel')
                }
            })
        },
        putaway (data) {
            this.$confirm({
                title: '提示',
                content: '确定要上架这个服务吗？',
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
.serve-page {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px;
}
</style>
