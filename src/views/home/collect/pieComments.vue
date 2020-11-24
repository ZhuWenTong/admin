<template>
    <a-card title="评价" :bordered="false" class="pie-comments">
        <div class="charts">
            <chart :options="options" :autoresize="true" style="width: 100%;height: 100%;"></chart>
            <p class="rate">100%</p>
        </div>
        <div class="footer">好评率</div>
    </a-card>
</template>
<script>
export default {
    data () {
        return {
            options: {
                color: ['#703fc9'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c}%'
                },
                legend: {
                    orient: 'vertical',
                    left: 10,
                    data: ['好评率'],
                    show: false
                },
                series: {
                    name: '评价',
                    type: 'pie',
                    radius: ['50%', '80%'],
                    center: ['50%', '100%'],
                    avoidLabelOverlap: false,
                    startAngle: 180,
                    top: '-200',
                    label: {
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: false
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: 100, name: '好评率'},
                    ]
                }
            }
        }
    }
}
</script>
<style lang="less">
.pie-comments {
    .charts {
        height: 220px;
        position: relative;
        .rate {
            width: 100%;
            text-align: center;
            position: absolute;
            bottom: 0;
            line-height: 20px;
            margin-bottom: 0;
            font-size: 14px;
            color: #333333;
        }
    }
    .footer {
        line-height: 60px;
        font-size: 16px;
        text-align: center;
    }
}
</style>
