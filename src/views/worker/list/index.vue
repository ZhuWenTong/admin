<template>
    <div class="worker-list">
        <filter-area @search="loadData" @clear="clear">
            <a-input v-model="params.keyword" placeholder="姓名/手机号/护工编号" allowClear />
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <my-date placeholder="请选择入职时间" v-model="params.entryTime" @change="loadData" />
            <a-select placeholder="请选择户龄" allowClear @change="loadData" v-model="params.serviceAge">
                <a-select-option v-for="item in serviceOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <template slot="more">
                <a-select placeholder="请选择状态" allowClear @change="loadData" v-model="params.status">
                    <a-select-option v-for="item in statusOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
                <a-select placeholder="请选择有无照片" allowClear @change="loadData" v-model="params.photo">
                    <a-select-option v-for="item in photoOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
                <a-select placeholder="请选择性别" allowClear @change="loadData" v-model="params.sex">
                    <a-select-option v-for="item in sexOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </template>
            <template slot="action">
                <a-button type="primary" @click="clickAdd">新增</a-button>
                <a-button type="primary">导出</a-button>
            </template>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered rowKey="id" :loading="loading">
            <template slot="photo" slot-scope="text, props">
                <img :src="props.photo" style="height: 100px;" />
            </template>
            <template slot="operation" slot-scope="text, props">
                <a @click="openEdit(props)" style="margin-right: 5px;">编辑</a>
                <more-action :data="props" @change="handleMore" />
            </template>
        </a-table>
        <dialog-panel :type="type" :dialogVisible.sync="dialogVisible" v-if="dialogVisible" :data="currentWorker" />
        <dialog-leave :dialogVisible.sync="leaveVisible" v-if="leaveVisible" :data="currentWorker" />
    </div>
</template>
<script>
import tableData from './data'
import filterArea from '@/components/page/filterArea/index'
import myDate from '@/views/components/myDate/index'
import moreAction from './moreAction'
import dialogPanel from './dialogPanel'
import dialogLeave from './dialogLeave'
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
            serviceOption: [{
                label: '全部',
                value: '0'
            }, {
                label: '0-1年',
                value: '1'
            }, {
                label: '1-5年',
                value: '2'
            }],
            statusOption: [{
                label: '删除',
                value: '0'
            }, {
                label: '在职',
                value: '1'
            }, {
                label: '请假',
                value: '2'
            }],
            photoOption: [{
                label: '有',
                value: '1'
            }, {
                label: '无',
                value: '2'
            }],
            sexOption: [{
                label: '男',
                value: '1'
            }, {
                label: '女',
                value: '2'
            }],
            params: {
                keyword: '',
                hospital: undefined,
                entryTime: null,
                serviceAge: undefined,
                status: undefined,
                photo: undefined,
                sex: undefined
            },
            tableData: tableData,
            columns: [{
                title: '所属医院',
                dataIndex: 'hospital'
            }, {
                title: '照片',
                dataIndex: 'photo',
                scopedSlots: { customRender: 'photo' }
            }, {
                title: '护工姓名',
                dataIndex: 'workerName'
            }, {
                title: '护工编号',
                dataIndex: 'workerNo'
            }, {
                title: '性别',
                dataIndex: 'sex'
            }, {
                title: '手机号码',
                dataIndex: 'phone'
            }, {
                title: '入职时间',
                dataIndex: 'entryTime'
            }, {
                title: '当前服务病人数',
                dataIndex: 'serviceNum'
            }, {
                title: '护龄',
                dataIndex: 'serviceAge'
            }, {
                title: '是否保险',
                dataIndex: 'hasInsurance'
            }, {
                title: '状态',
                dataIndex: 'status'
            }, {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' }
            }],
            type: 'add',
            dialogVisible: false,
            currentWorker: null,
            leaveVisible: false,
            loading: false
        }
    },
    components: {
        filterArea,
        myDate,
        moreAction,
        dialogPanel,
        dialogLeave
    },
    methods: {
        loadData () {
            this.loading = true
            setTimeout(() => {
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.keyword = ''
            this.params.hospital = undefined
            this.params.entryTime = null
            this.params.serviceAge = undefined
            this.params.status = undefined
            this.params.photo = undefined
            this.params.sex = undefined
        },
        openEdit (data) {
            this.currentWorker = data
            this.type = 'edit'
            this.dialogVisible = true
        },
        handleMore (key, data) {
            this.currentWorker = data
            console.log(key, data)
            if (key === 'a') {
                // 完善信息
                this.$router.push('/workerManage/perfectly/' + data.key)
            } else if (key === 'b') {
                // 请假
                this.leaveVisible = true
            } else if (key === 'c') {
                this.$confirm({
                    title: '提示',
                    content: '此操作将离职改员工, 是否继续?',
                    onOk () {
                        console.log('OK')
                    },
                    onCancel () {
                        console.log('Cancel')
                    }
                })
            }
        },
        clickAdd () {
            this.type = 'add'
            this.dialogVisible = true
        }
    }
}
</script>
<style lang="less">
.worker-list {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px 10px 0 10px;
}
</style>
