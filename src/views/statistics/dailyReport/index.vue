<template>
    <page-container>
        <filter-area @search="loadData" @clear="clear">
            <a-select placeholder="请选择医院" allowClear @change="loadData" v-model="params.hospital">
                <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <my-date placeholder="请选择日期" v-model="params.dateTime" @change="loadData" />
        </filter-area>
        <a-table :columns="columns" :data-source="tableData" bordered :loading="loading" rowKey="id2"></a-table>
    </page-container>
</template>
<script>
import pageContainer from '@/views/components/page-container/index'
import filterArea from '@/components/page/filterArea/index'
import myDate from '@/views/components/myDate/index'
export default {
    data () {
        const renderContent = (value, row) => {
            const obj = {
                children: value,
                attrs: {
                    rowSpan: row.rowSpan2
                }
            }
            return obj
        }
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
                dateTime: null
            },
            columns: [{
                title: '楼栋',
                dataIndex: 'building',
                customRender: (value, row) => {
                    // console.log(value, row, index)
                    const obj = {
                        children: value,
                        attrs: {
                            rowSpan: row.rowSpan
                        }
                    }
                    return obj
                }
            }, {
                title: '病区',
                dataIndex: 'ward',
                customRender: renderContent
            }, {
                title: '病人数',
                dataIndex: 'patientsum',
                customRender: renderContent
            }, {
                title: '护理员人数',
                dataIndex: 'workerNum',
                customRender: renderContent
            }, {
                title: '病人数',
                dataIndex: 'patients'
            }, {
                title: '单价',
                dataIndex: 'price'
            }, {
                title: '金额',
                dataIndex: 'amount'
            }, {
                title: '管理费金额',
                dataIndex: 'manageAmount'
            }],
            tableData: [{
                id: '1',
                building: 'a',
                ward: '1',
                rowSpan: 2
            }, {
                id: '2',
                building: 'a',
                ward: '2'
            }],
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
                this.handleData()
                this.loading = false
            }, 1000)
        },
        clear () {
            this.params.hospital = undefined
            this.params.dateTime = null
            this.loadData()
        },
        handleData () {
            let data = [{
                id: '1',
                areaName: '一号楼',
                report: [{
                    id: '11',
                    areaName: '2楼',
                    patient: 2,
                    worker: 2,
                    areaReport: [{
                        patient: 1,
                        price: 100,
                        amount: 100,
                        manageAmount: 10,
                        id: '1'
                    }, {
                        patient: 1,
                        price: 100,
                        amount: 100,
                        manageAmount: 10,
                        id: '2'
                    }]
                }, {
                    id: '12',
                    areaName: '1楼',
                    patient: 3,
                    worker: 3,
                    areaReport: [{
                        patient: 1,
                        price: 120,
                        amount: 120,
                        manageAmount: 20,
                        id: '3'
                    }, {
                        patient: 2,
                        price: 110,
                        amount: 110,
                        manageAmount: 10,
                        id: '4'
                    }]
                }]
            }, {
                id: '2',
                areaName: '二号楼',
                report: [{
                    id: '21',
                    areaName: '2楼',
                    patient: 3,
                    worker: 3,
                    areaReport: [{
                        patient: 1,
                        price: 100,
                        amount: 100,
                        manageAmount: 10,
                        id: '5'
                    }, {
                        patient: 1,
                        price: 100,
                        amount: 100,
                        manageAmount: 10,
                        id: '6'
                    }, {
                        patient: 1,
                        price: 100,
                        amount: 100,
                        manageAmount: 10,
                        id: '7'
                    }]
                }, {
                    id: '22',
                    areaName: '1楼',
                    patient: 1,
                    worker: 1,
                    areaReport: [{
                        patient: 1,
                        price: 100,
                        amount: 100,
                        manageAmount: 10,
                        id: '8'
                    }]
                }]
            }]
            let pageData = []
            data.forEach(i => {
                if (i.report && i.report.length) {
                    i.report.forEach(j => {
                        if (j.areaReport && j.areaReport.length) {
                            j.areaReport.forEach(k => {
                                let obj = {
                                    id: i.id,
                                    building: i.areaName,
                                    id1: j.id,
                                    ward: j.areaName,
                                    patientsum: j.patient,
                                    workerNum: j.worker,
                                    patients: k.patient,
                                    price: k.price,
                                    amount: k.amount,
                                    manageAmount: k.manageAmount,
                                    id2: k.id
                                }
                                pageData.push(obj)
                            })
                        }
                    })
                }
            })
            let item = {}
            let item2 = {}
            pageData.forEach(i => {
                item[i.id] = item[i.id] || []
                item[i.id].push(i)
                item2[i.id1] = item2[i.id1] || []
                item2[i.id1].push(i)
            })
            for (let i in item) {
                item[i].forEach((j, index) => {
                    j.rowSpan = index === 0 ? item[i].length : 0
                })
            }
            for (let i in item2) {
                item2[i].forEach((j, index) => {
                    j.rowSpan2 = index === 0 ? item2[i].length : 0
                })
            }
            this.tableData = pageData
        }
    },
    created () {
        this.loadData()
    }
}
</script>
