<template>
    <a-time-picker
        @change="change"
        :placeholder="placeholder"
        :disabled="disabled"
        v-model="dateTime"
        allowClear
        :format="format"
    />
</template>
<script>
import moment from 'moment'
export default {
    props: {
        value: [String, Object],
        placeholder: {
            type: String,
            defalut: '请选择时间'
        },
        disabled: {
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
        moment,
        change (date, dateString) {
            console.log(date, dateString)
            this.$emit('input', dateString)
            this.$emit('change', date, dateString)
        }
    },
    watch: {
        value: {
            handler (val) {
                this.dateTime = val ? this.moment(val, 'HH:mm') : null
            },
            immediate: true
        }
    }
}
</script>
