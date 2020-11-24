<template>
    <a-modal v-model="visible" title="添加" ok-text="确定" cancel-text="取消" @cancel="cancel" @ok="ok" width="400px">

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
