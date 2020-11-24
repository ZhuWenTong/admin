<template>
    <a-modal v-model="visible" title="组员变动" ok-text="确定" cancel-text="取消" @cancel="cancel" @ok="ok" width="800px" wrapClassName="group-dialog">
        <a-form-model ref="ruleForm" :model="model" :rules="rules" labelAlign="right">
            <a-row :gutter="[40, 10]">
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="所属医院" prop="hospital">
                        <a-input disabled v-model="model.hospital" />
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
                <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                    <a-form-model-item has-feedback label="生效时间" prop="effectTime">
                        <my-date show-time placeholder="请选择生效时间" v-model="model.effectTime" format="YYYY-MM-DD HH:mm" style="width: 100%;" />
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
import myDate from '@/views/components/myDate/index'
export default {
    props: {
        dialogVisible: Boolean,
        data: Object
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
                groupStatus: 1,
                effectTime: null
            },
            rules: {
                groupName: [
                    {required: true, message: '请输入小组名称', trigger: 'blur'}
                ],
                member: [
                    {required: true, message: '请选择小组成员', trigger: 'change'}
                ],
                effectTime: [
                    {required: true, message: '请选择生效时间', trigger: 'change'}
                ]
            },
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
            allService: [],
            selectPoint: [],
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
            selectMember: []
        }
    },
    components: {
        myDate
    },
    methods: {
        init () {
            this.initData()
            this.initService()
            this.initMember()
        },
        initData () {
            let data = JSON.parse(JSON.stringify(this.data))
            for (let i in data) {
                for (let j in this.model) {
                    if (i === j) {
                        this.model[i] = data[i]
                    }
                }
            }
        },
        initService () {
            this.selectPoint = this.model.servicePoint.map(i => i.value)
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
        initMember () {
            this.selectMember = this.model.member.map(i => i.id)
        },
        cancel () {
            this.$emit('update:dialogVisible', false)
        },
        ok () {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.$emit('change', this.model)
                    this.$emit('update:dialogVisible', false)
                }
            })
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

