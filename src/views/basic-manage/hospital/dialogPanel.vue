<template>
    <a-modal v-model="visible" :title="title" ok-text="确定" cancel-text="取消" @cancel="cancel" @ok="ok" width="850px" wrapClassName="hospital-panel">
        <a-form-model ref="ruleForm" :model="model" :rules="rules"  labelAlign="right">
            <a-row :gutter="[40, 10]">
                <a-col :span="24">
                    <p class="sub-tit">基本信息</p>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="医院名称" prop="hospital">
                        <a-input placeholder="请输入医院名称" v-model="model.hospital" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="医院地址" prop="address">
                        <a-input placeholder="请输入医院地址（最长255字符）" :maxLength="255" v-model="model.address" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="经度" prop="longitude">
                        <a-input placeholder="请输入经度" v-model="model.longitude" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="纬度" prop="latitude">
                        <a-input placeholder="请输入纬度" v-model="model.latitude" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="排序" prop="sort">
                        <a-input placeholder="" v-model="model.sort" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="快捷天数设置" prop="fastDayId">
                        <a-select placeholder="最多选择三个" allowClear @change="selectFastDay" v-model="model.fastDayId" mode="multiple">
                            <a-select-option v-for="item in dayOptions" :key="item.value" :value="item.value" :disabled="item.disabled">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <a-form-model-item has-feedback label="简介" prop="abstract">
                        <a-textarea :auto-size="{minRows: 3}" placeholder="请输入医院简介（不超过500字符）" :maxLength="500" v-model="model.abstract" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <a-form-model-item has-feedback label="医院logo" prop="logo"></a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <a-form-model-item has-feedback label="轮播图（多张）" prop="swiper"></a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <p class="sub-tit">金融比例</p>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="护工费比例" prop="nursingRate">
                        <a-input placeholder="" type="number" v-model="model.nursingRate" autocomplete="off" allowClear>
                            <span slot="suffix">%</span>
                        </a-input>
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="管理费比例" prop="manageRate">
                        <a-input placeholder="" type="number" v-model="model.manageRate" autocomplete="off" allowClear>
                            <span slot="suffix">%</span>
                        </a-input>
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="院方管理费比例" prop="hospitalManageRate">
                        <a-input placeholder="" type="number" v-model="model.hospitalManageRate" autocomplete="off" allowClear>
                            <span slot="suffix">%</span>
                        </a-input>
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="平台比例" prop="platformRate">
                        <a-input placeholder="" type="number" disabled v-model="model.platformRate" autocomplete="off" allowClear>
                            <span slot="suffix">%</span>
                        </a-input>
                    </a-form-model-item>
                </a-col>
            </a-row>
        </a-form-model>
    </a-modal>
</template>
<script>
export default {
    props: {
        type: {
            type: String, // add edit
            default: 'add'
        },
        dialogVisible: Boolean,
        data: Object
    },
    data () {
        return {
            visible: false,
            model: {
                hospital: '',
                address: '',
                longitude: '',
                latitude: '',
                sort: '',
                fastDayId: undefined,
                fastDay: '',
                abstract: '',
                logo: [],
                swiper: [],
                nursingRate: '',
                manageRate: '',
                hospitalManageRate: '',
                platformRate: ''
            },
            rules: {
                hospital: [
                    {required: true, message: '请输入医院名称', trigger: 'blur'}
                ],
                nursingRate: [
                    {required: true, message: '请输入护工费比例', trigger: 'blur'}
                ],
                manageRate: [
                    {required: true, message: '请输入管理费比例', trigger: 'blur'}
                ],
                hospitalManageRate: [
                    {required: true, message: '请输入院方管理费比例', trigger: 'blur'}
                ]
            },
            dayOptions: [{
                label: '3天',
                value: '3'
            }, {
                label: '4天',
                value: '4'
            }, {
                label: '6天',
                value: '6'
            }, {
                label: '7天',
                value: '7'
            }, {
                label: '15天',
                value: '15'
            }, {
                label: '30天',
                value: '30'
            }]
        }
    },
    computed: {
        title () {
            return this.type === 'add' ? '添加医院' : '编辑医院'
        }
    },
    components: {},
    methods: {
        init () {
            if (this.type === 'edit') {
                console.log('edit')
            }
        },
        cancel () {
            this.$emit('update:dialogVisible', false)
        },
        ok () {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    console.log(this.model)
                    this.$emit('update:dialogVisible', false)
                }
            })
        },
        selectFastDay (val) {
            if (val.length === 3) {
                this.dayOptions.forEach(i => {
                    this.$set(i, 'disabled', false)
                    if (val.indexOf(i.value) === -1) {
                        this.$set(i, 'disabled', true)
                    }
                })
            } else {
                this.dayOptions.forEach(i => {
                    this.$set(i, 'disabled', false)
                })
            }
            let data = []
            val.forEach(i => {
                let obj = this.dayOptions.find(j => j.value === i)
                data.push(obj.label)
            })
            this.model.fastDay = data.join(',')
        }
    },
    watch: {
        dialogVisible: {
            handler (val) {
                this.visible = val
            },
            immediate: true
        }
    },
    created () {
        this.init()
    }
}
</script>
<style lang="less">
.hospital-panel {
    .sub-tit {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
        text-align: center;
    }
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
}
</style>
