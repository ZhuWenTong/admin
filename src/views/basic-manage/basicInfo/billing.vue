<template>
    <div class="billing">
        <a-form-model ref="ruleForm" :model="model" :rules="rules" labelAlign="right" style="max-width: 800px;">
            <a-row :gutter="[40, 10]">
                <a-col :span="24">
                    <p class="sub-tit">计费时间点设置
                        <a-popover title="计费时间点设置说明：" trigger="hover" overlayClassName="billing-pop">
                            <template slot="content">
                                <div class="detail">
                                    <p>“计费时间点”表示每天结算截止的时间节点，超过此时间节点需要额外支付费用。</p>
                                    <p>“计费天数”表示计算多少天的服务周期。</p>
                                    <p>例：设置“计费时间点1”为9:00，“计费天数”为0.5天，“计费时间点2”为12:00，“计费天数”为1天，则表示9点之前结算无需支付当天费用，9点到12点结算需支付当天0.5天的费用，12点之后结算需支付当天1天的费用。</p>
                                </div>
                            </template>
                            <a-icon type="question-circle" />
                        </a-popover>
                    </p>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="计费时间点1" prop="timePoint1">
                        <my-time v-model="model.timePoint1" format="HH:mm" style="width: 100%;" />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="计费天数1" prop="days1">
                        <a-input disabled v-model="model.days1" />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="计费时间点2" prop="timePoint2">
                        <my-time v-model="model.timePoint2" format="HH:mm" style="width: 100%;" />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="计费天数2" prop="days2">
                        <a-input disabled v-model="model.days2" />
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row :gutter="[40, 10]">
                <a-col :span="24">
                    <p class="sub-tit">提醒时间点设置
                        <a-popover title="提醒时间点设置说明：" trigger="hover" overlayClassName="billing-pop">
                            <template slot="content">
                                <div class="detail">
                                    <p>设置“提醒时间点”后，系统将会在该时间点向患者和管理老师推送服务到期提醒。</p>
                                    <p>例：设置“提醒时间点”为9:00</p>
                                    <p>如果用户预约结束时间为5月20日(服务实际将在21日上午结束)，则系统会在5月20日9:00向患者和管理老师推送服务到期提醒。</p>
                                </div>
                            </template>
                            <a-icon type="question-circle" />
                        </a-popover>
                    </p>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="提醒时间" prop="remindTime">
                        <my-time v-model="model.remindTime" format="HH:mm" style="width: 100%;" />
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row :gutter="[40, 10]">
                <a-col :span="24">
                    <p class="sub-tit">费用减免设置
                        <a-popover title="费用减免设置说明：" trigger="hover" overlayClassName="billing-pop">
                            <template slot="content">
                                <div class="detail">
                                    <p>开启“到期自动结算”，则订单到达预约结束日期时系统将自动结算该订单。</p>
                                    <p>“最大减免时间”表示可减免的最大天数。</p>
                                    <p>例：若开启“到期自动结算”，且设置“计费时间点1”为9:00，用户预约结束时间为5月20日，则系统会在5月21日9:00自动结算该订单。</p>
                                </div>
                            </template>
                            <a-icon type="question-circle" />
                        </a-popover>
                    </p>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="可减免时间段" prop="canBreak">
                        <a-select placeholder="请选择可减免时间段" allowClear v-model="model.canBreak">
                            <a-select-option v-for="item in breakOptions" :key="item.label" :value="item.label">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="最大减免时间" prop="maxBreak">
                        <a-select placeholder="请选择最大减免时间" allowClear v-model="model.maxBreak">
                            <a-select-option v-for="item in maxOptions" :key="item.label" :value="item.label">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row :gutter="[40, 10]">
                <a-col :span="24">
                    <p class="sub-tit">自动结算设置
                        <a-popover title="自动结算设置说明：" trigger="hover" overlayClassName="billing-pop">
                            <template slot="content">
                                <div class="detail">
                                    <p>开启“到期自动结算”，则订单到达预约结束日期时系统将自动结算该订单。</p>
                                    <p>自动结算时间为“计费时间点1”所设置的时间点。</p>
                                    <p>例：若开启“到期自动结算”，且设置“计费时间点1”为9:00，用户预约结束时间为5月20日，则系统会在5月21日9:00自动结算该订单。</p>
                                </div>
                            </template>
                            <a-icon type="question-circle" />
                        </a-popover>
                    </p>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="结算" prop="settlement">
                        <a-switch v-model="model.settlement" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <a-form-model-item :wrapper-col="{span: 14, offset: 4}">
                        <a-button type="primary" @click="save" style="margin-right: 10px;">保存</a-button>
                        <a-button @click="cancel">取消</a-button>
                    </a-form-model-item>
                </a-col>
            </a-row>
        </a-form-model>
    </div>
</template>
<script>
import myTime from '@/views/components/myTime/index'
export default {
    data () {
        return {
            model: {
                timePoint1: '',
                days1: '0.5',
                timePoint2: '',
                days2: '1',
                remindTime: '',
                canBreak: undefined,
                maxBreak: undefined,
                settlement: false
            },
            breakOptions: [{
                label: '0'
            }, {
                label: '30'
            }, {
                label: '60'
            }],
            maxOptions: [{
                label: '0'
            }, {
                label: '0.5'
            }, {
                label: '1'
            }],
            rules: {

            }
        }
    },
    components: {
        myTime
    },
    methods: {
        save () {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    console.log(this.model)
                }
            })
        },
        cancel () {
            this.$confirm({
                title: '提示',
                content: '取消操作将不会保存当前页面所有填写内容，确定要取消吗？',
                onOk () {
                    console.log('Ok')
                },
                onCancel () {
                    console.log('Cancel')
                }
            })
        }
    }
}
</script>
<style lang="less">
.billing {
    .ant-form-item {
        display: flex;
        flex-direction: row;
        .ant-form-item-label {
            width: 120px;
        }
        .ant-form-item-control-wrapper {
            flex: 1;
        }
    }
    .sub-tit {
        font-size: 20px;
        margin-bottom: 10px;
        text-indent: 30px;
    }
}
.billing-pop {
    .detail {
        width: 460px;
        p {
            margin-bottom: 0;
            line-height: 24px;
            &:nth-of-type(2) {
                margin: 20px 0;
            }
        }
    }
}
</style>
