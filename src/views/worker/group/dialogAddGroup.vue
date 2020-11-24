<template>
    <a-modal v-model="visible" title="添加小组" ok-text="确定" cancel-text="取消" @cancel="cancel" @ok="ok" width="800px" wrapClassName="group-dialog">
        <a-form-model ref="ruleForm" :model="model" :rules="rules" labelAlign="right">
            <a-row :gutter="[40, 10]">
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="所属医院" prop="hospital">
                        <a-select placeholder="请选择医院" allowClear @change="selectHospital" v-model="model.hospitalId">
                            <a-select-option v-for="item in hospitalList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="小组名称" prop="groupName">
                        <a-input placeholder="请输入小组名称" v-model="model.groupName" autocomplete="off" allowClear />
                    </a-form-model-item>
                </a-col>
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="服务点" prop="servicePoint">
                        <a-cascader :options="serviceOption" placeholder="请选择服务点" @change="selectService" v-model="selectPoint" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <a-form-model-item label="小组成员" prop="member">
                        <a-transfer
                            :data-source="memberData"
                            show-search
                            :filter-option="filterOption"
                            :target-keys="selectMember"
                            :render="item => item.label"
                            @change="handleChange"
                            @search="handleSearch"
                            :rowKey="record => record.id"
                            :titles="['全部护工', '已选护工']"
                        />
                    </a-form-model-item>
                </a-col>
            </a-row>
        </a-form-model>
    </a-modal>
</template>
<script>
export default {
    props: {
        dialogVisible: Boolean
    },
    data () {
        return {
            visible: false,
            model: {
                hospitalId: undefined,
                hospital: '',
                groupName: '',
                servicePoint: [],
                member: [],
                groupStatus: 1
            },
            rules: {
                hospital: [
                    {required: true, message: '请选择所属医院', trigger: 'blur'}
                ],
                groupName: [
                    {required: true, message: '请输入小组名称', trigger: 'blur'}
                ],
                member: [
                    {required: true, message: '请选择小组成员', trigger: 'change'}
                ]
            },
            hospitalList: [{
                label: '浙江省人民医院',
                value: '1'
            }, {
                label: '安徽省中医院',
                value: '2'
            }],
            serviceOption: [{
                label: '一号楼',
                value: '1',
                children: [{
                    label: '1楼',
                    value: '1-1'
                }, {
                    label: '2楼',
                    value: '1-2'
                }]
            }, {
                label: '二号楼',
                value: '2',
                children: [{
                    label: '1楼',
                    value: '2-1'
                }, {
                    label: '2楼',
                    value: '2-2'
                }]
            }],
            memberData: [{
                label: '张三',
                id: '1',
                key: '1',
                title: '张三'
            }, {
                label: '李四',
                id: '2',
                key: '2',
                title: '李四'
            }, {
                label: '王五',
                id: '3',
                key: '3',
                title: '王五'
            }],
            allService: [],
            selectPoint: [],
            selectMember: []
        }
    },
    methods: {
        init () {
            this.initService()
        },
        initService () {
            let data = []
            this.serviceOption.forEach(i => {
                data.push({
                    label: i.label,
                    value: i.value
                })
                if (i.children && i.children.length) {
                    i.children.forEach(j => {
                        data.push({
                            label: j.label,
                            value: j.value
                        })
                    })
                }
            })
            this.allService = data
        },
        cancel () {
            this.$emit('update:dialogVisible', false)
        },
        ok () {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.$emit('submit', this.model)
                    this.$emit('update:dialogVisible', false)
                }
            })
        },
        selectHospital (val) {
            let obj = this.hospitalList.find(i => i.value === val)
            this.model.hospital = obj ? obj.label : ''
        },
        selectService (val) {
            let data = []
            val.forEach(i => {
                this.allService.forEach(j => {
                    if (i === j.value) {
                        data.push({
                            label: j.label,
                            value: j.value
                        })
                    }
                })
            })
            this.model.servicePoint = data
        },
        filterOption (inputValue, option) {
            console.log(inputValue, option)
            return option.label.indexOf(inputValue) > -1
        },
        handleChange(targetKeys) {
            let data = []
            this.selectMember = targetKeys
            if (targetKeys.length) {
                targetKeys.forEach(i => {
                    this.memberData.forEach(j => {
                        if (i === j.id) {
                            data.push({
                                name: j.label,
                                id: j.id
                            })
                        }
                    })
                })
            }
            this.model.member = data
        },
        handleSearch(dir, value) {
            console.log('search:', dir, value)
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
.group-dialog {
    .ant-form-item {
        display: flex;
        flex-direction: row;
        .ant-form-item-label {
            width: 100px;
        }
        .ant-form-item-control-wrapper {
            flex: 1;
        }
    }
}
</style>
