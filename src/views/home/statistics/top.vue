<template>
    <a-row :gutter="[10, 10]" class="top">
        <a-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
            <div class="item order">
                <div>
                    <p>今日下单</p>
                    <p>6</p>
                </div>
                <i class="iconfont icon-order"></i>
            </div>
        </a-col>
        <a-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
            <div class="item collection">
                <div>
                    <p>今日收款</p>
                    <p>6666.00</p>
                </div>
                <i class="iconfont icon-collection"></i>
            </div>
        </a-col>
        <a-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
            <div class="item refund">
                <div>
                    <p>今日退款</p>
                    <p>0.00</p>
                </div>
                <i class="iconfont icon-refund"></i>
            </div>
        </a-col>
        <a-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
            <div class="item earnings">
                <div>
                    <p>今日收益</p>
                    <p>666.00</p>
                </div>
                <i class="iconfont icon-earnings"></i>
            </div>
        </a-col>
    </a-row>
</template>
<script>
export default {
    data () {
        return {}
    }
}
</script>
<style lang="less">
@yellow: #FDC023;
@red: #F5497E;
@green: #8AC149;
@blue: #2AA0FF;
@white: #ffffff;
@font: #333;
.flex(@direction: row, @justify: flex-start, @align: center) {
    display: flex;
    flex-direction: @direction;
    justify-content: @justify;
    align-items: @align;
}
.top {
    .item {
        padding: 10px 20px;
        height: 100px;
        box-sizing: border-box;
        border-radius: 4px;
        .flex(row, space-between, center);
        div {
            p {
                margin-bottom: 0;
                font-size: 16px;
                color: @white;
                &:last-child {
                    font-weight: bold;
                    font-size: 20px;
                }
            }
        }
        .iconfont {
            color: @white;
            font-size: 50px;
            opacity: 0.6;
        }
        &.order {
            background: @yellow;
        }
        &.collection {
            background: @red;
        }
        &.refund {
            background: @green;
        }
        &.earnings {
            background: @blue;
        }
    }
}
</style>
