<template>
    <page-container class="bed-management">
        <div class="hospital-list">
            <a-spin :spinning="treeLoading">
                <div v-show="treeLoading" style="height: 200px;"></div>
                <a-tree :tree-data="hospitalData" @select="handleSelect">
                    <template slot="custom" slot-scope="item">
                        <div class="custom-node">
                            <span>{{item.title}}</span>
                            <my-action :data="item" @change="handleChange" />
                        </div>
                    </template>
                </a-tree>
            </a-spin>
        </div>
        <div class="bed-main">
            <filter-area @search="loadData" @clear="clear">
                <a-input v-model="params.bedName" placeholder="请输入床位名称" allowClear />
            </filter-area>
            <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id"></a-table>
        </div>
        <dialog-building :dialogVisible.sync="visibleBuilding" :data="currentBuilding" v-if="visibleBuilding" @change="changeBuilding" />
        <dialog-floor :dialogVisible.sync="visibleFloor" :data="currentFloor" v-if="visibleFloor" @change="changeFloor" />
        <dialog-ward :dialogVisible.sync="visibleWard" :data="currentWard" v-if="visibleWard" @change="changeWard" />
        <dialog-bed :dialogVisible.sync="visibleBed" :data="currentBed" v-if="visibleBed" @change="changeBed" />
    </page-container>
</template>
<script>
import pageContainer from '@/views/components/page-container/index'
import filterArea from '@/components/page/filterArea/index'
import myAction from './myAction'
export default {
    data () {
        return {
            params: {
                bedName: ''
            },
            hospitalData: [],
            columns: [{
                title: '床位号',
                dataIndex: 'bedNo'
            }, {
                title: '病房号',
                dataIndex: 'roomNo'
            }, {
                title: '所属医院',
                dataIndex: 'hospital'
            }, {
                title: '楼栋',
                dataIndex: 'building'
            }, {
                title: '病区/楼层',
                dataIndex: 'ward'
            }, {
                title: '有效值',
                dataIndex: 'validValue'
            }],
            tableData: [],
            loading: false,
            treeLoading: false,
            currentSelect: null,
            visibleBuilding: false,
            currentBuilding: null,
            visibleFloor: false,
            currentFloor: null,
            visibleWard: false,
            currentWard: null,
            visibleBed: false,
            currentBed: null
        }
    },
    components: {
        pageContainer,
        filterArea,
        myAction,
        dialogBuilding: () => import('./dialogBuilding'),
        dialogFloor: () => import('./dialogFloor'),
        dialogWard: () => import('./dialogWard'),
        dialogBed: () => import('./dialogBed')
    },
    methods: {
        handleChange (key, data) {
            this.currentSelect = data
            if (key === 'add' && data.depth === 1) { // 新建楼栋
                this.visibleBuilding = true
            }
            if (key === 'edit' && data.depth === 2) { // 修改楼栋
                this.currentBuilding = data
                this.visibleBuilding = true
            }
            if (key === 'delete' && data.depth === 2) { // 删除楼栋
                if (data.children.length) {
                    this.$message.warning('有下级层级数据，无法进行删除')
                } else {
                    this.$confirm({
                        title: '提示',
                        content: '此操作将永久删除该楼栋, 是否继续?',
                        onOk () {
                            console.log(data)
                        },
                        onCancel () {
                            console.log('Cancel')
                        }
                    })
                }
            }
            if (key === 'add' && data.depth === 2) { // 新建病区/楼层
                this.visibleFloor = true
            }
            if (key === 'edit' && data.depth === 3) { // 编辑病区/楼层
                this.currentFloor = data
                this.visibleFloor = true
            }
            if (key === 'delete' && data.depth === 3) { // 删除病区/楼层
                if (data.children.length) {
                    this.$message.warning('有下级层级数据，无法进行删除')
                } else {
                    this.$confirm({
                        title: '提示',
                        content: '此操作将永久删除该病区/楼层, 是否继续?',
                        onOk () {
                            console.log(data)
                        },
                        onCancel () {
                            console.log('Cancel')
                        }
                    })
                }
            }
            if (key === 'add' && data.depth === 3) { // 新增病房
                this.visibleWard = true
            }
            if (key === 'edit' && data.depth === 4) { // 编辑病房
                this.currentWard = data
                this.visibleWard = true
            }
            if (key === 'delete' && data.depth === 4) { // 删除病房
                if (data.children.length) {
                    this.$message.warning('有下级层级数据，无法进行删除')
                } else {
                    this.$confirm({
                        title: '提示',
                        content: '此操作将永久删除该病房, 是否继续?',
                        onOk () {
                            console.log(data)
                        },
                        onCancel () {
                            console.log('Cancel')
                        }
                    })
                }
            }
            if (key === 'add' && data.depth === 4) { // 新增病床
                this.visibleBed = true
            }
            if (key === 'edit' && data.depth === 5) { // 编辑病床
                this.currentBed = data
                this.visibleBed = true
            }
            if (key === 'delete' && data.depth === 5) {
                if (data.children.length) {
                    this.$message.warning('有下级层级数据，无法进行删除')
                } else {
                    this.$confirm({
                        title: '提示',
                        content: '此操作将永久删除该病床, 是否继续?',
                        onOk () {
                            console.log(data)
                        },
                        onCancel () {
                            console.log('Cancel')
                        }
                    })
                }
            }
        },
        /**
         * @param data 楼栋信息
         * @param type add edit
         */
        changeBuilding (data, type) {
            if (type === 'add') {
                let newItem = {
                    ...data,
                    title: data.buildName,
                    depth: this.currentSelect.depth + 1
                }
                this.currentSelect.dataRef.children.push(newItem)
            }
            if (type === 'edit') {
                this.editDetail(data, this.hospitalData, 'buildName')
                this.currentBuilding = null
            }
        },
        changeFloor (data, type) {
            if (type === 'add') {
                let newItem = {
                    ...data,
                    title: data.floorName,
                    depth: this.currentSelect.depth + 1
                }
                this.currentSelect.dataRef.children.push(newItem)
            }
            if (type === 'edit') {
                this.editDetail(data, this.hospitalData, 'floorName')
                this.currentFloor = null
            }
        },
        changeWard (data, type) {
            if (type === 'add') {
                let newItem = {
                    ...data,
                    title: data.wardName,
                    depth: this.currentSelect.depth + 1
                }
                this.currentSelect.dataRef.children.push(newItem)
            }
            if (type === 'edit') {
                this.editDetail(data, this.hospitalData, 'wardName')
                this.currentWard = null
            }
        },
        changeBed (data, type) {
            if (type === 'add') {
                let newItem = {
                    ...data,
                    title: data.bedName,
                    depth: this.currentSelect.depth + 1
                }
                this.currentSelect.dataRef.children.push(newItem)
            }
            if (type === 'edit') {
                this.editDetail(data, this.hospitalData, 'bedName')
                this.currentBed = null
            } 
        },
        /**
         * @param data 修改弹框返回的数据
         * 递归 修改树形数据
         */
        editDetail (data, treeData, key) {
            treeData.forEach(item => {
                if (item.key === data.key) {
                    for (let i in item) {
                        for (let j in data) {
                            if (i === j) {
                                item[i] = data[i]
                                item.title = data[key]
                            }
                        }
                    }
                }
                if (item.children && item.children.length) {
                    this.editDetail(data, item.children, key)
                }
            })
        },
        handleSelect (selectedKeys, data) {
            console.log(selectedKeys, data)
        },
        loadData () {
            this.loading = true
            setTimeout(() => {
                this.tableData = [{
                    id: '1',
                    bedNo: '1号床',
                    roomNo: '1病房',
                    hospital: '浙江省人民医院',
                    building: '1号楼',
                    ward: '1楼',
                    validValue: 1
                }]
                this.loading = false
            }, 1000)
        },
        loadTree () {
            this.treeLoading = true
            setTimeout(() => {
                this.hospitalData = [{
                    title: '浙江省人民医院',
                    key: 1,
                    scopedSlots: { title: 'custom' },
                    depth: 1,
                    children: []
                }, {
                    title: '安徽省中医院',
                    key: 2,
                    scopedSlots: { title: 'custom' },
                    depth: 1,
                    children: []
                }]
                this.treeLoading = false
            }, 1000)
        },
        clear () {

        }
    },
    created () {
        this.loadData()
        this.loadTree()
    }
}
</script>
<style lang="less">
.bed-management {
    display: flex;
    flex-direction: row;
    .hospital-list {
        width: 300px;
        .ant-tree-node-content-wrapper {
            width: 100%;
            padding-right: 30px;
        }
        .custom-node {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    }
    .bed-main {
        flex: 1;
        padding: 20px;
        margin-left: 20px;
    }
}
</style>
