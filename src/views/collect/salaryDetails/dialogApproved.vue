<template>
    <a-modal v-model="visible" title="提示" ok-text="确定" cancel-text="取消" @cancel="cancel" @ok="ok" width="400px">
        <template v-if="type === 1">
            <p>本次审核通过1条工资记录!</p>
            <p>当期营收30元，护工工资24元，公司收入元</p>
        </template>
        <template v-if="type === 2">
            <p>本次审核不通过!</p>
            <a-textarea :auto-size="{minRows: 3}" v-model="model.remark" placeholder="请输入备注信息" />
        </template>
    </a-modal>
</template>
<script>
export default {
    props: {
        dialogVisible: Boolean,
        type: [String, Number] // 1通过 2不通过
    },
    data () {
        return {
            visible: false,
            model: {
                remark: ''
            }
        }
    },
    methods: {
        cancel () {
            this.$emit('update:dialogVisible', false)
        },
        ok () {
            this.$emit('update:dialogVisible', false)
        }
    },
    watch: {
        dialogVisible: {
            handler (val) {
                this.visible = val
            },
            immediate: true
        }
    }
}
</script>
