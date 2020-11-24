<template>
    <a-card title="投诉" :bordered="false" class="pie-complaints">
        <div class="charts">
            <chart :options="options" :autoresize="true" style="width: 100%;height: 100%;"></chart>
            <p class="rate">1%</p>
        </div>
        <div class="footer">投诉率</div>
    </a-card>
</template>
<script>
export default {
    data () {
        return {
            options: {
                color: ['#bebebe'],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c}%'
                },
                legend: {
                    orient: 'vertical',
                    left: 10,
                    data: ['投诉率'],
                    show: false
                },
                series: {
                    name: '投诉',
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
                        {value: 1, name: '投诉率'},
                    ]
                }
            }
        }
    }
}
</script>
<style lang="less">
.pie-complaints {
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
