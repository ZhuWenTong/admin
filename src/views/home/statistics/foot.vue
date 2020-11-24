<template>
    <a-row :gutter="[10, 10]" class="footer">
        <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <a-row class="left">
                <a-col :span="6">
                    <div class="item nusring">
                        <p>上岗护工</p>
                        <p>20</p>
                    </div>
                </a-col>
                <a-col :span="6">
                    <div class="item patient">
                        <p>平台订单</p>
                        <p>20</p>
                    </div>
                </a-col>
                <a-col :span="6">
                    <div class="item user">
                        <p>服务患者</p>
                        <p>20</p>
                    </div>
                </a-col>
                <a-col :span="6">
                    <div class="item teacher">
                        <p>管理老师</p>
                        <p>20</p>
                    </div>
                </a-col>
            </a-row>
        </a-col>
        <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <a-row class="right">
                <a-col :span="8">
                    <a-card hoverable :bordered="false">
                        <div class="item item-1" @click="toComplaints">
                            <a-badge count="12">
                                <i class="iconfont icon-complaints"></i>
                            </a-badge>
                            <div>
                                <p>投诉</p>
                                <p>您有12条投诉待处理</p>
                            </div>
                        </div>
                    </a-card>
                </a-col>
                <a-col :span="8">
                    <a-card hoverable :bordered="false">
                        <div class="item item-2" @click="toComments">
                            <a-badge count="22">
                                <i class="iconfont icon-comments"></i>
                            </a-badge>
                            <div>
                                <p>评论</p>
                                <p>您有22条评论待处理</p>
                            </div>
                        </div>
                    </a-card>
                </a-col>
                <a-col :span="8">
                    <a-card hoverable :bordered="false">
                        <div class="item item-3" @click="toOrder">
                            <a-badge count="34">
                                <i class="iconfont icon-order-list"></i>
                            </a-badge>
                            <div>
                                <p>订单</p>
                                <p>您有34条投诉待处理</p>
                            </div>
                        </div>
                    </a-card>
                </a-col>
            </a-row>
        </a-col>
    </a-row>
</template>
<script>
export default {
    data () {
        return {}
    },
    methods: {
        toComplaints () {
            this.$router.push('/orderManage/complaints')
        },
        toComments () {
            this.$router.push('/orderManage/comments')
        },
        toOrder () {
            this.$router.push('/orderManage/orderList')
        }
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
.footer {
    .left,
    .right {
        background: @white;
        border-radius: 4px;
        height: 100px;
        border-radius: 4px;
        padding: 10px 20px;
        box-sizing: border-box;
    }
    .left {
        .flex;
        .item {
            padding-left: 10px;
            p {
                margin-bottom: 0;
                font-size: 16px;
                color: @font;
                &:last-child {
                    font-size: 20px;
                    font-weight: bold;
                }
            }
            &.nusring {
                border-left: 4px solid @yellow;
            }
            &.patient {
                border-left: 4px solid @red;
            }
            &.user {
                border-left: 4px solid @green;
            }
            &.teacher {
                border-left: 4px solid @blue;
            }
        }
    }
    .right {
        padding: 0;
        .ant-col {
            height: 100%;
        }
        .ant-card {
            height: 100%;
            .ant-card-body {
                padding: 0;
                height: 100%;
            }
        }
        .ant-card-hoverable:hover {
            z-index: 1;
        }
        .item {
            height: 100%;
            .flex(row, flex-start, center);
            padding: 10px 30px;
            @media screen and (max-width: 1025px) {
                .flex(column, flex-start, center);
                padding: 10px 0;
                div {
                    margin-left: 0 !important;
                    p {
                        text-align: center;
                    }
                }
            }
            .iconfont {
                font-size: 40px;
            }
            div {
                margin-left: 20px;
                p {
                    margin-bottom: 0;
                    font-size: 12px;
                    color: #999999;
                    &:first-child {
                        font-size: 16px;
                        color: @font;
                        font-weight: bold;
                    }
                }
            }
            &-1 {
                i {
                    color: #ff8760;
                }
            }
            &-2 {
                i {
                    color: @green;
                }
            }
            &-3 {
                i {
                    color: @blue;
                }
            }
        }
    }
}
</style>