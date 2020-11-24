<template>
    <div class="hospital-line">
        <a-tabs style="width: 100%;" v-model="params.lineType" @change="changeLineType">
            <a-tab-pane v-for="item in lineTypes" :key="item.value" :tab="item.label"></a-tab-pane>
            <a-radio-group slot="tabBarExtraContent" button-style="solid" v-model="params.timeType" @change="changeTimeType">
                <a-radio-button v-for="item in timeTypes" :key="item.value" :value="item.value">{{item.label}}</a-radio-button>
            </a-radio-group>
        </a-tabs>
        <div class="charts">
            <chart :options="options" :autoresize="true" style="width: 100%;height: 100%;"></chart>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            lineTypes: [{
                label: '下单统计',
                value: '1'
            }, {
                label: '收款统计',
                value: '2'
            }, {
                label: '收益统计',
                value: '3'
            }],
            timeTypes: [{
                label: '日试图',
                value: '1'
            }, {
                label: '周视图',
                value: '2'
            }, {
                label: '月视图',
                value: '3'
            }],
            params: {
                lineType: '1',
                timeType: '1'
            },
            options: {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['浙江省人民医院', '四川大学华西医院', '上海中山医院', '北京大学第一医院', '北京大学人民医院']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['10-23', '10-24', '10-25', '10-26', '10-27', '10-28', '10-29']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '浙江省人民医院',
                        type: 'line',
                        stack: '总量',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '四川大学华西医院',
                        type: 'line',
                        stack: '总量',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '上海中山医院',
                        type: 'line',
                        stack: '总量',
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '北京大学第一医院',
                        type: 'line',
                        stack: '总量',
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '北京大学人民医院',
                        type: 'line',
                        stack: '总量',
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            }
        }
    },
    methods: {
        changeLineType (val) {
            console.log(val)
        },
        changeTimeType (val) {
            console.log(val)
        }
    }
}
</script>
<style lang="less">
.hospital-line {
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
    padding: 10px;
    .charts {
        height: 350px;
    }
}
</style>
