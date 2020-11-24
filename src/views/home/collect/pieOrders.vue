<template>
    <a-card title="各医院订单数" :bordered="false" class="pie-orders">
        <a-radio-group slot="extra" button-style="solid" v-model="params.type" @change="changeType">
            <a-radio-button v-for="item in typeList" :key="item.value" :value="item.value">{{item.label}}</a-radio-button>
        </a-radio-group>
        <div class="charts">
            <chart :options="options" :autoresize="true" style="width: 100%;height: 100%;"></chart>
        </div>
    </a-card>
</template>
<script>
export default {
    data () {
        return {
            params: {
                type: '1'
            },
            typeList: [{
                label: '服务中',
                value: '1'
            }, {
                label: '总订单',
                value: '2'
            }],
            options: {
                color: ['#25a3ff', '#97d450', '#ff508a', '#ffa61c'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 10,
                    data: ['浙江省人民医院', '常州第一人民医院', '武进中医院', '安徽省中医院'],
                    show: false
                },
                series: {
                    name: '订单数',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '12'
                        }
                    },
                    label: {
                        formatter: '{b}: {c}笔 ({d}%)'
                    },
                    labelLine: {
                        show: true,
                        length: 10,
                        length2: 10
                    },
                    data: [
                        {value: 123, name: '浙江省人民医院'},
                        {value: 134, name: '常州第一人民医院'},
                        {value: 321, name: '武进中医院'},
                        {value: 342, name: '安徽省中医院'}
                    ]
                }
            }
        }
    },
    methods: {
        changeType (val) {
            console.log(val)
        }
    }
}
</script>
<style lang="less">
.pie-orders {
    .ant-card-extra {
        padding: 12px 0;
    }
    .charts {
        height: 280px;
    }
}
</style>
