<template>
    <page-container>
        <filter-area @search="loadData" @clear="clear">
            <div>
                <span style="width: 80px;">所属医院：</span>
                <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                    <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </div>
            <div>
                <span>楼栋：</span>
                <a-select placeholder="请选择楼栋" allowClear @change="loadData" v-model="params.building">
                    <a-select-option v-for="item in buildOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </div>
            <div>
                <span>病区/楼层：</span>
                <a-select placeholder="请选择病区/楼层" allowClear @change="loadData" v-model="params.area">
                    <a-select-option v-for="item in areaOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
            </div>
            <template slot="more">
                <div>
                    <span style="width: 80px;">日期：</span>
                    <my-date placeholder="请选择日期" v-model="params.date" @change="loadData" />
                </div>
                <div>
                    <span>管理员姓名：</span>
                    <a-input v-model="params.admin" placeholder="请输入管理员姓名" allowClear />
                </div>
            </template>
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id"></a-table>
    </page-container>
</template>
<script>
import pageContainer from '@/views/components/page-container/index'
import filterArea from '@/components/page/filterArea/index'
import myDate from '@/views/components/myDate/index'
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
            buildOption: [{
                label: '一号楼',
                value: '1'
            }, {
                label: '二号楼',
                value: '2'
            }],
            areaOption: [{
                label: '一楼',
                value: '1'
            }, {
                label: '二楼',
                value: '2'
            }],
            params: {
                hospital: undefined,
                building: undefined,
                area: undefined,
                date: null,
                admin: ''
            },
            columns: [{
                title: '订单编号',
                dataIndex: 'orderNo'
            }, {
                title: '所属医院',
                dataIndex: 'hospital'
            }, {
                title: '患者姓名',
                dataIndex: 'patientName'
            }, {
                title: '患者联系电话',
                dataIndex: 'patientPhone'
            }, {
                title: '病区楼层',
                dataIndex: 'wardFloor'
            }, {
                title: '床位号',
                dataIndex: 'bedNo'
            }, {
                title: '护工',
                dataIndex: 'workerName'
            }, {
                title: '预约开始时间',
                dataIndex: 'startTime'
            }, {
                title: '预约结束时间',
                dataIndex: 'endTime'
            }, {
                title: '实际结束时间',
                dataIndex: 'actualEndTime'
            }, {
                title: '管理老师',
                dataIndex: 'teacher'
            }],
            tableData: [],
            loading: false
        }
    },
    components: {
        pageContainer,
        filterArea,
        myDate
    },
    methods: {
        loadData () {
            this.loading = true
            setTimeout(() => {
                this.tableData = [{
                    id: '1',
                    orderNo: '0000001',
                    hospital: '浙江省人民医院',
                    patientName: 'xxx',
                    patientPhone: '16666666666',
                    wardFloor: '一号楼一楼',
                    bedNo: '1号床',
                    workerName: 'xxx',
                    startTime: '2020-11-11 15:25',
                    endTime: '2020-11-11 17:30',
                    actualEndTime: '2020-11-11 18:00',
                    teacher: 'xxx'
                }]
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.hospital = undefined
            this.params.building = undefined
            this.params.area = undefined
            this.params.date = null
            this.params.admin = ''
            this.loadData()
        }
    },
    created () {
        this.loadData()
    }
}
</script>
