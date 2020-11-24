<template>
    <a-modal v-model="visible" title="收入明细" :footer="null" @cancel="cancel" width="800px">
        <a-empty />
    </a-modal>
</template>
<script>
export default {
    props: {
        dialogVisible: Boolean,
        data: Object
    },
    data () {
        return {
            visible: false
        }
    },
    methods: {
        cancel () {
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
