<template>
    <page-container>
        <filter-area @search="loadData" @clear="clear">
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-month-picker v-model="dateTime" @change="changeDate" :style="{width: '200px'}" />
        </filter-area>
        <a-spin :spinning="loading">
            <div v-show="!loading && !pageData.length" style="height: 600px;"></div>
            <div v-for="(item, index) in pageData" :key="index" >
                <p>{{item.name}} {{item.details}}</p>
                <a-table :data-source="item.tableData">
                    <a-table-column title="姓名 / 日期" key="name" data-index="name"></a-table-column>
                    <a-table-column v-for="col in item.data" :key="col" :title="col" :dataIndex="col"></a-table-column>
                    <p slot="expandedRowRender" slot-scope="props" style="margin: 0">
                        床位信息：{{props.bed}} 天数：{{props.days}} 单价：{{props.price}}
                    </p>
                </a-table>
            </div>
        </a-spin>
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
            params: {
                hospital: undefined,
                attendanceDate: ''
            },
            dateTime: null,
            pageData: [],
            loading: false
        }
    },
    components: {
        pageContainer,
        filterArea
    },
    methods: {
        loadData () {
            this.loading = true
            setTimeout(() => {
                let data = [{
                    name: '张三',
                    data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
                    details: '1对1：0天 | 1对2：0天 | 1对3：31天 |',
                    patient_list: [{
                        bed: '一号楼-1楼-1号床',
                        data: [10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11],
                        days: 10,
                        name: '测试1',
                        price: 200
                    }, {
                        bed: '一号楼-2楼-1号床',
                        data: [20, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12],
                        days: 20,
                        name: '测试2',
                        price: 300
                    }]
                }, {
                    name: '李四',
                    data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                    details: '1对1：0天 | 1对2：0天 | 1对3：31天 |',
                    patient_list: [{
                        bed: '一号楼-1楼-2号床',
                        data: [30, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        days: 12,
                        name: '测试11',
                        price: 100
                    }, {
                        bed: '一号楼-3楼-1号床',
                        data: [40, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        days: 21,
                        name: '测试22',
                        price: 210
                    }]
                }]
                // <a-table-column key="firstName" data-index="firstName">
                // [{firstName: 'xxx'}]
                // [{name: '测试1', 1: 1, 2: 1, 3: 1, 4: 1}, {name: '测试2'}]
                let pageData = []
                data.forEach(i => {
                    let item = {}
                    let tableData = []
                    i.patient_list.forEach(j => {
                        let obj = {}
                        i.data.forEach((k, kdx) => {
                            obj[k] = j.data[kdx]
                        })
                        obj.name = j.name
                        obj.bed = j.bed
                        obj.price = j.price
                        obj.days = j.days
                        // console.log(obj)
                        tableData.push(obj)
                    })
                    item.name = i.name
                    item.details = i.details
                    item.data = i.data
                    item.tableData = tableData
                    pageData.push(item)
                })
                this.pageData = pageData
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.hospital = undefined
            this.params.attendanceDate = ''
            this.dateTime = null
            this.loadData()
        },
        changeDate (date, dateString) {
            this.params.attendanceDate = dateString
            this.loadData()
        }
    },
    created () {
        this.loadData()
    }
}
</script>
