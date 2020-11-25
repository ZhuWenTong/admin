<template>
    <page-container class="bed-management">
        <div class="hospital-list">
            <a-tree :tree-data="hospitalData" :load-data="loadHospital">
                <template slot="custom" slot-scope="item">
                    <div class="custom-node">
                        <span>{{item.title}}</span>
                        <span>操作</span>
                    </div>
                </template>
            </a-tree>
        </div>
        <div class="bed-main">
            <filter-area @search="loadData" @clear="clear">
                <a-input v-model="params.bedName" placeholder="请输入床位名称" allowClear />
            </filter-area>
            <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id"></a-table>
        </div>
    </page-container>
</template>
<script>
import pageContainer from '@/views/components/page-container/index'
import filterArea from '@/components/page/filterArea/index'
export default {
    data () {
        return {
            params: {
                bedName: ''
            },
            hospitalData: [{
                title: '浙江省人民医院',
                key: '1',
                scopedSlots: { title: 'custom' }
            }, {
                title: '安徽省中医院',
                key: '2',
                scopedSlots: { title: 'custom' }
            }],
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
            loading: false
        }
    },
    components: {
        pageContainer,
        filterArea
    },
    methods: {
        loadHospital (treeNode) {
            console.log(treeNode.dataRef)
            return new Promise(resolve => {
                if (treeNode.dataRef.children) {
                    resolve()
                    return
                }
                setTimeout(() => {
                    treeNode.dataRef.children = [
                        { title: 'Child Node', key: `${treeNode.eventKey}-0`, scopedSlots: { title: 'custom' } },
                        { title: 'Child Node', key: `${treeNode.eventKey}-1`, scopedSlots: { title: 'custom' } },
                    ]
                    this.hospitalData = [...this.hospitalData]
                    resolve()
                }, 1000)
            })
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
        clear () {

        }
    },
    created () {
        this.loadData()
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
