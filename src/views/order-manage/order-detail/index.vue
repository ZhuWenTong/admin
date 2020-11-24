<template>
    <div class="order-detail">
        <a-table :columns="columns" :data-source="goodList" bordered>
            <template slot="photo" slot-scope="text, props">
                <img :src="props.photo" style="height: 50px;" />
            </template>
        </a-table>
        <a-collapse v-model="activeKey">
            <a-collapse-panel key="1" header="基本信息">
                <div class="wrap-item">
                    <div class="item" title="下单信息">
                        <div class="sub-item">
                            <p>
                                <span>订单号：</span>
                                <span>20201029000001</span>
                            </p>
                            <p>
                                <span>下单时间：</span>
                                <span>2020-11-04 09:40</span>
                            </p>
                            <p>
                                <span>联系人：</span>
                                <span>xxx</span>
                            </p>
                            <p>
                                <span>联系电话：</span>
                                <span>16666666666</span>
                            </p>
                            <p>
                                <span>住院地址：</span>
                                <span>一号楼-1楼-1号床</span>
                            </p>
                            <p>
                                <span>预约时间：</span>
                                <span>2020-11-05 09:00 - 2020-11-05 17:00</span>
                            </p>
                            <p>
                                <span>预约天数：</span>
                                <span>1 天</span>
                            </p>
                            <p>
                                <span>实际天数：</span>
                                <span>0 天</span>
                            </p>
                        </div>
                        <div class="order-status">
                            <a-icon type="check" />
                            <span>订单状态：确认待补</span>
                        </div>
                    </div>
                    <div class="item" title="支付信息">
                        <div class="sub-item">
                            <p>
                                <span>商品总价：</span>
                                <span>￥100.00</span>
                            </p>
                            <p>
                                <span>优惠金额：</span>
                                <span>￥10.00</span>
                            </p>
                            <p>
                                <span>订单总价：</span>
                                <span>￥90.00</span>
                            </p>
                            <p>
                                <span>减免金额：</span>
                                <span>￥0.00</span>
                            </p>
                            <p>
                                <span>已付金额：</span>
                                <span>￥0.00</span>
                            </p>
                            <p>
                                <span>待付金额：</span>
                                <span>￥90.00</span>
                            </p>
                        </div>
                    </div>
                </div>
                
            </a-collapse-panel>
            <a-collapse-panel key="2" header="更多信息">

            </a-collapse-panel>
            <a-collapse-panel key="3" header="预付信息">
                <div class="wrap-item">
                    <div class="item" title="预付信息">
                        <div class="sub-item">
                            <p>
                                <span>支付方式：</span>
                                <span>全额付款</span>
                            </p>
                            <p>
                                <span>支付额：</span>
                                <span>￥90.00</span>
                            </p>
                            <p>
                                <span>折扣额：</span>
                                <span>￥0.00</span>
                            </p>
                        </div>
                    </div>
                </div>
            </a-collapse-panel>
            <a-collapse-panel key="4" header="付款记录">
                <div class="wrap-item">
                    <div class="item" title="付款记录">
                        <div class="sub-item">
                            <p>
                                <span>付款方式：</span>
                                <span>线上</span>
                            </p>
                            <p>
                                <span>付款渠道：</span>
                                <span>微信</span>
                            </p>
                            <p>
                                <span>付款时间：</span>
                                <span>2020-11-04 10:15</span>
                            </p>
                            <p>
                                <span>付款金额：</span>
                                <span>￥90.00</span>
                            </p>
                            <p>
                                <span>付款结果：</span>
                                <span>支付成功</span>
                            </p>
                            <p>
                                <span>备注：</span>
                                <span>待补款</span>
                            </p>
                        </div>
                    </div>
                    <div class="item">
                        <div class="sub-item">
                            <p>
                                <span>付款方式：</span>
                                <span>线上</span>
                            </p>
                            <p>
                                <span>付款渠道：</span>
                                <span>微信</span>
                            </p>
                            <p>
                                <span>付款时间：</span>
                                <span>2020-11-04 10:15</span>
                            </p>
                            <p>
                                <span>付款金额：</span>
                                <span>￥90.00</span>
                            </p>
                            <p>
                                <span>付款结果：</span>
                                <span>支付成功</span>
                            </p>
                            <p>
                                <span>备注：</span>
                                <span>与支付全部</span>
                            </p>
                        </div>
                    </div>
                </div>
            </a-collapse-panel>
            <a-collapse-panel key="5" header="管理老师确认信息">
                <div class="wrap-item">
                    <div class="item" title="管理老师确认信息">
                        <div class="sub-item">
                            <p>
                                <span>确认老师：</span>
                                <span>xxx</span>
                            </p>
                            <p>
                                <span>时间：</span>
                                <span>2020-11-04 10:09</span>
                            </p>
                        </div>
                    </div>
                </div>
            </a-collapse-panel>
            <a-collapse-panel key="6" header="护工安排信息">
                <div class="wrap-item">
                    <div class="item" title="护工安排信息">
                        <div class="sub-item">
                            <p>
                                <span>护工姓名：</span>
                                <span>xxx</span>
                            </p>
                            <p>
                                <span>星级：</span>
                                <span>普通护工</span>
                            </p>
                            <p>
                                <span>手机号码：</span>
                                <span>16666666666</span>
                            </p>
                            <p>
                                <span>服务时间：</span>
                                <span>2020-08-12 13:00:00--2020-08-13 15:05:00</span>
                            </p>
                            <p>
                                <span>服务时长：</span>
                                <span>服务中</span>
                            </p>
                            <p>
                                <span>服务价格：</span>
                                <span>￥50.00</span>
                            </p>
                            <p>
                                <span>安排老师：</span>
                                <span>xxx</span>
                            </p>
                            <p>
                                <span>时间：</span>
                                <span>2020-11-04 10:20</span>
                            </p>
                        </div>
                    </div>
                </div>
            </a-collapse-panel>
            <a-collapse-panel key="7" header="退款信息">
                <div class="wrap-item">
                    <div class="item" title="退款信息">
                        <div class="sub-item">
                            <p>
                                <span>申请时间：</span>
                                <span>2020-11-04 10:09</span>
                            </p>
                            <p>
                                <span>退款金额：</span>
                                <span>￥90.00</span>
                            </p>
                            <p>
                                <span>状态：</span>
                                <span>退款成功</span>
                            </p>
                            <p>
                                <span>退款原因：</span>
                                <span>结算退款</span>
                            </p>
                            <p>
                                <span>退款时间：</span>
                                <span>2020-11-04 10:09</span>
                            </p>
                            <p>
                                <span>操作人员：</span>
                                <span>xxx</span>
                            </p>
                        </div>
                    </div>
                </div>
            </a-collapse-panel>
            <a-collapse-panel key="8" header="结算信息">
                <div class="wrap-item">
                    <div class="item" title="结算信息">
                        <div class="sub-item">
                            <p>
                                <span>结算老师：</span>
                                <span>xxx</span>
                            </p>
                            <p>
                                <span>结算时间：</span>
                                <span>2020-11-04 10:09</span>
                            </p>
                            <p>
                                <span>退款状态：</span>
                                <span>无退款</span>
                            </p>
                            <p>
                                <span>订单金额：</span>
                                <span>￥90.00</span>
                            </p>
                            <p>
                                <span>已付金额：</span>
                                <span>￥90.00</span>
                            </p>
                            <p>
                                <span>退款金额：</span>
                                <span>￥0.00</span>
                            </p>
                            <p>
                                <span>补缴金额：</span>
                                <span>￥0.00</span>
                            </p>
                        </div>
                    </div>
                </div>
            </a-collapse-panel>
            <a-collapse-panel key="9" header="评论信息">
                <div class="wrap-item">
                    <div class="item" title="评论信息">
                        <div class="sub-item">
                            <p>
                                <span>服务评价：</span>
                                <span>非常满意</span>
                            </p>
                            <p>
                                <span>评论时间：</span>
                                <span>2020-11-04 10:09</span>
                            </p>
                            <p>
                                <span>评论内容</span>
                                <span>非常满意</span>
                            </p>
                        </div>
                    </div>
                </div>
            </a-collapse-panel>
            <a-collapse-panel key="10" header="投诉信息">

            </a-collapse-panel>
        </a-collapse>
    </div>
</template>
<script>
export default {
    data () {
        return {
            activeKey: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            goodList: [{
                photo: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
                goodName: '院内陪护服务',
                price: '100',
                num: '1',
                total: '100'
            }],
            columns: [{
                title: '商品列表',
                dataIndex: 'photo',
                scopedSlots: { customRender: 'photo' }
            }, {
                title: '商品名称',
                dataIndex: 'goodName'
            }, {
                title: '单价（元）',
                dataIndex: 'price'
            }, {
                title: '数量',
                dataIndex: 'num'
            }, {
                title: '小计',
                dataIndex: 'total'
            }]
        }
    }
}
</script>
<style lang="less">
.order-detail {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 10px 10px 20px 10px;
    .wrap-item {
        .item {
            &:not(:last-child) {
                border-bottom: 1px dashed #e5e5e5;
            }
            padding: 0 50px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .sub-item {
                p {
                    margin-bottom: 0;
                    line-height: 30px;
                    span {
                        color: #333333;
                        &:first-child {
                            font-weight: bold;
                            display: inline-block;
                            width: 80px;
                            text-align: right;
                            color: #888888;
                        }
                    }
                }
            }
            .order-status {
                height: 40px;
                font-size: 20px;
                line-height: 40px;
                border-bottom: 1px solid #e5e5e5;
                i {
                    color: #5cb85c;
                    margin-right: 4px;
                }
            }
        }
    }
}
</style>
