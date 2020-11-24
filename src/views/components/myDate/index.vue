<template>
    <a-date-picker
        :show-time="showTime"
        @change="change"
        :placeholder="placeholder"
        :disabled="disabled"
        v-model="dateTime"
        allowClear
        :format="format"
        :style="{width: '200px'}"
    />
</template>
<script>
export default {
    props: {
        value: [String, Object],
        placeholder: {
            type: String,
            defalut: '请选择日期'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        showTime: {
            type: Boolean,
            default: false
        },
        format: String
    },
    data () {
        return {
            dateTime: null
        }
    },
    methods: {
        change (date, dateString) {
            this.$emit('input', dateString)
            this.$emit('change', date, dateString)
        }
    },
    watch: {
        value: {
            handler (val) {
                this.dateTime = val
            },
            immediate: true
        }
    }
}
</script>
