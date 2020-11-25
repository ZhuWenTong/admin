<template>
    <page-container>
        <filter-area @search="loadData" @clear="clear">
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-input v-model="params.keyword" placeholder="请输入关键字" allowClear />
            <a-input v-model="params.userName" placeholder="用户" allowClear />
            <template slot="more">
                <a-input v-model="params.shopName" placeholder="商品/服务名称" allowClear />
                <a-input v-model="params.complaints" placeholder="投诉内容" allowClear />
                <a-select placeholder="请选择回复状态" allowClear @change="loadData" v-model="params.reply">
                    <a-select-option v-for="item in replyList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </template>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading">
            <template slot="orderNo" slot-scope="text, props">
                <a @click="openView(props.key)">{{props.orderNo}}</a>
            </template>
            <template slot="operation" slot-scope="text, props">
                <template v-if="props.isDel === 0">
                    <a-button type="primary" @click="reply(props)" style="margin-right: 5px;">回复</a-button>
                    <a-button @click="deleteItem(props)">删除</a-button>
                </template>
                <template v-else>
                    <span style="color: #ccc;">已刪除</span>
                </template>
            </template>
        </a-table>
        <dialog-reply :dialogVisible.sync="dialogVisible" :data="currentComplaint" v-if="dialogVisible" />
    </page-container>
</template>
<script>
import tableData from './data'
import pageContainer from '@/views/components/page-container/index'
import filterArea from '@/components/page/filterArea/index'
import dialogReply from './dialogReply'
export default {
    data () {
        return {
            tableData: tableData,
            columns: [{
                title: '订单号',
                dataIndex: 'orderNo',
                scopedSlots: { customRender: 'orderNo' }
            }, {
                title: '投诉',
                dataIndex: 'complaints'
            }, {
                title: '用户',
                dataIndex: 'userName'
            }, {
                title: '联系电话',
                dataIndex: 'tel'
            }, {
                title: '地址',
                dataIndex: 'address'
            }, {
                title: '时间',
                dataIndex: 'createTime'
            }, {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' }
            }],
            hospitalList: [{
                label: '浙江省人民医院',
                value: '1'
            }, {
                label: '安徽省中医院',
                value: '2'
            }],
            replyList: [{
                label: '已回复',
                value: '1'
            }, {
                label: '未回复',
                value: '2'
            }],
            params: {
                hospital: undefined,
                keyword: '',
                userName: '',
                shopName: '',
                complaints: '',
                reply: undefined
            },
            dialogVisible: false,
            currentComplaint: null,
            loading: false
        }
    },
    components: {
        pageContainer,
        filterArea,
        dialogReply
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
            this.params.keyword = ''
            this.params.userName = ''
            this.params.shopName = ''
            this.params.complaints = ''
            this.params.reply = undefined
            this.loadData()
        },
        reply (data) {
            this.currentComplaint = data
            this.dialogVisible = true
        },
        openView (id) {
            this.$router.push('/orderManage/orderDetail/' + id)
        },
        deleteItem (data) {
            this.$confirm({
                title: '提示',
                content: '确认删除该投诉, 是否继续?',
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
