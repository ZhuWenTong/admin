<template>
    <a-modal v-model="visible" title="提示" ok-text="确定" cancel-text="取消" @cancel="cancel" @ok="ok" width="400px">
        <p>本次发放1条工资！</p>
        <p>当期营收1050.12元，护工工资840.1元，公司收入元</p>
    </a-modal>
</template>
<script>
export default {
    props: {
        dialogVisible: Boolean
    },
    data () {
        return {
            visible: false
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
