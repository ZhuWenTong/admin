<template>
    <a-modal v-model="visible" :title="title" ok-text="确定" cancel-text="取消" @cancel="cancel" @ok="ok" width="800px">
        <a-form-model ref="ruleForm" :model="model" :rules="rules" :label-col="{span: 8}" :wrapper-col="{span: 16}" labelAlign="right">
            <a-row :gutter="[40, 10]">
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="护工姓名" prop="workerName">
                        <a-input placeholder="请输入护工姓名" v-model="model.workerName" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="所属医院" prop="hospital">
                        <a-select placeholder="请选择医院" allowClear @change="selectHospital" v-model="model.hospitalId">
                            <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="手机号码" prop="phone">
                        <a-input placeholder="请输入手机号码" v-model="model.phone" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="身份证号" prop="IDNum">
                        <a-input placeholder="请输入身份证号" v-model="model.IDNum" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="民族" prop="national">
                        <a-input placeholder="请输入民族" v-model="model.national" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="性别" prop="sex">
                        <a-select placeholder="请选择性别" allowClear @change="selectSex" v-model="model.sexId">
                            <a-select-option v-for="item in sexOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="出生日期" prop="birthday">
                        <my-date placeholder="请选择出生日期" v-model="model.birthday" style="width: 100%;" />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="籍贯" prop="birthPlace">
                        <a-input placeholder="请输入籍贯" v-model="model.birthPlace" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="户籍地址" prop="address">
                        <a-input placeholder="请输入户籍地址" v-model="model.address" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="家庭地址" prop="homeAddress">
                        <a-input placeholder="请输入家庭地址" v-model="model.homeAddress" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="星级" prop="starId">
                        <a-select placeholder="请选择星级" allowClear @change="selectStar" v-model="model.starId">
                            <a-select-option v-for="item in starOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="是否保险" prop="hasInsuranceId">
                        <a-select placeholder="请选择是否保险" allowClear @change="selectInsure" v-model="model.hasInsuranceId">
                            <a-select-option v-for="item in insureOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="文化程度" prop="educationId">
                        <a-select placeholder="请选择文化程度" allowClear @change="selectEdu" v-model="model.educationId">
                            <a-select-option v-for="item in eduOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="婚姻状况" prop="maritalId">
                        <a-select placeholder="请选择婚姻状况" allowClear @change="selectMarital" v-model="model.maritalId">
                            <a-select-option v-for="item in maritalOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="语言能力" prop="languageId">
                        <a-select placeholder="请选择语言能力" allowClear @change="selectLang" v-model="model.languageId">
                            <a-select-option v-for="item in langOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="入职日期" prop="entryTime">
                        <my-date placeholder="请选择入职日期" v-model="model.entryTime" style="width: 100%;" />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="紧急联系人" prop="contactName">
                        <a-input placeholder="请输入紧急联系人" v-model="model.contactName" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="紧急联系人电话" prop="contactPhone">
                        <a-input placeholder="请输入紧急联系人电话" v-model="model.contactPhone" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <!-- 身份证照片 -->
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="开户行名称" prop="bankName">
                        <a-input placeholder="请输入开户行名称" v-model="model.bankName" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="开户行代码" prop="bankCode">
                        <a-input disabled v-model="model.bankCode" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="银行卡号" prop="bankNum">
                        <a-input placeholder="请输入银行卡号" v-model="model.bankNum" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="账户类型" prop="accountTypeId">
                        <a-select placeholder="请选择账户类型" allowClear @change="selectAccount" v-model="model.accountTypeId">
                            <a-select-option v-for="item in accountOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="开户证件类型" prop="certificateId">
                        <a-select placeholder="请选择开户证件类型" allowClear @change="selectCert" v-model="model.certificateId">
                            <a-select-option v-for="item in certOption" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="账户名" prop="screeName">
                        <a-input placeholder="请输入账户名" v-model="model.screeName" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="证件号" prop="certificateNo">
                        <a-input placeholder="请输入证件号" v-model="model.certificateNo" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="银行预留号码" prop="bankPhone">
                        <a-input placeholder="请输入银行预留号码" v-model="model.bankPhone" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
            </a-row>
        </a-form-model>
    </a-modal>
</template>
<script>
import myDate from '@/views/components/myDate/index'
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
                workerName: '',
                hospital: '',
                hospitalId: undefined,
                phone: '',
                IDNum: '',
                national: '',
                sex: '',
                sexId: undefined,
                birthday: null,
                birthPlace: '',
                address: '',
                homeAddress: '',
                star: '',
                starId: undefined,
                hasInsurance: '',
                hasInsuranceId: undefined,
                education: '',
                educationId: undefined,
                marital: '',
                maritalId: undefined,
                language: '',
                languageId: undefined,
                entryTime: null,
                contactName: '',
                contactPhone: '',
                bankName: '',
                bankCode: '',
                bankNum: '',
                accountType: '',
                accountTypeId: undefined,
                certificate: '',
                certificateId: undefined,
                screeName: '',
                certificateNo: '',
                bankPhone: ''
            },
            rules: {
                workerName: [
                    {required: true, message: '请输入护工姓名', trigger: 'blur'}
                ],
                hospital: [
                    {required: true, message: '请选择所属医院', trigger: 'blur'}
                ],
                phone: [
                    {required: true, message: '请输入手机号码', trigger: 'blur'}
                ],
                IDNum: [
                    {required: true, message: '请输入身份证号', trigger: 'blur'}
                ],
                entryTime: [
                    {required: true, message: '请选择入职日期', trigger: 'change'}
                ]
            },
            hospitalList: [{
                label: '浙江省人民医院',
                value: '1'
            }, {
                label: '安徽省中医院',
                value: '2'
            }],
            sexOption: [{
                label: '男',
                value: '1'
            }, {
                label: '女',
                value: '2'
            }],
            starOption: [{
                label: '普通护工',
                value: '1'
            }, {
                label: '三星护工',
                value: '2'
            }, {
                label: '五星护工',
                value: '3'
            }],
            insureOption: [{
                label: '是',
                value: '1'
            }, {
                label: '否',
                value: '2'
            }],
            eduOption: [{
                label: '无',
                value: '1'
            }, {
                label: '小学',
                value: '2'
            }],
            maritalOption: [{
                label: '未婚',
                value: '1'
            }, {
                label: '已婚',
                value: '2'
            }],
            langOption: [{
                label: '普通话一般',
                value: '1'
            }, {
                label: '普通话流利',
                value: '2'
            }],
            accountOption: [{
                label: '银行卡',
                value: '1'
            }, {
                label: '存折',
                value: '2'
            }],
            certOption: [{
                label: '身份证',
                value: '1'
            }, {
                label: '户口簿',
                value: '2'
            }]
        }
    },
    computed: {
        title () {
            return this.type === 'add' ? '添加护工' : '编辑护工'
        }
    },
    components: {
        myDate
    },
    methods: {
        init () {
            if (this.type === 'edit') {
                for (let i in this.data) {
                    for (let j in this.model) {
                        if (i === j) {
                            this.model[i] = this.data[i]
                        }
                    }
                }
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
        selectHospital (val) {
            let obj = this.hospitalList.find(i => i.value === val)
            this.model.hospital = obj ? obj.label : ''
        },
        selectSex (val) {
            let obj = this.sexOption.find(i => i.value === val)
            this.model.sex = obj ? obj.label : ''
        },
        selectStar (val) {
            let obj = this.starOption.find(i => i.value === val)
            this.model.star = obj ? obj.label : ''
        },
        selectInsure (val) {
            let obj = this.insureOption.find(i => i.value === val)
            this.model.hasInsurance = obj ? obj.label : ''
        },
        selectEdu (val) {
            let obj = this.eduOption.find(i => i.value === val)
            this.model.education = obj ? obj.label : ''
        },
        selectMarital (val) {
            let obj = this.maritalOption.find(i => i.value === val)
            this.model.marital = obj ? obj.label : ''
        },
        selectLang (val) {
            let obj = this.langOption.find(i => i.value === val)
            this.model.language = obj ? obj.label : ''
        },
        selectAccount (val) {
            let obj = this.accountOption.find(i => i.value === val)
            this.model.accountType = obj ? obj.label : ''
        },
        selectCert (val) {
            let obj = this.certOption.find(i => i.value === val)
            this.model.certificate = obj ? obj.label : ''
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
