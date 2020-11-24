<template>
    <a-row :gutter="[10, 10]" class="information">
        <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <real-time />
        </a-col>
        <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <pay />
        </a-col>
    </a-row>
</template>
<script>
import realTime from './realTime'
import pay from './pay'
export default {
    data () {
        return {}
    },
    components: {
        realTime,
        pay
    }
}
</script>
<style lang="less">
.information {
    .ant-card {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
    }
}
</style>
