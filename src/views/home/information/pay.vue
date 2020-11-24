<template>
    <a-card title="支付信息" :bordered="false" class="pay-info">
        <div class="charts">
            <chart :options="options" :autoresize="true" style="width: 100%;height: 100%;"></chart>
        </div>
    </a-card>
</template>
<script>
export default {
    data () {
        return {
            options: {
                color: ['#25a3ff', '#97d450', '#ff508a', '#ffa61c'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 10,
                    data: ['支付宝', '微信', '现金', 'POS机'],
                    show: false
                },
                series: {
                    name: '支付信息',
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
                        {value: 335, name: '支付宝'},
                        {value: 310, name: '微信'},
                        {value: 234, name: '现金'},
                        {value: 135, name: 'POS机'}
                    ]
                }
            }
        }
    }
}
</script>
<style lang="less">
.pay-info {
    .charts {
        height: 280px;
    }
}
</style>
