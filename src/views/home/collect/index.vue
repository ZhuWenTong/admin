<template>
    <a-row :gutter="[10, 10]" class="collect">
        <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <pie-orders />
        </a-col>
        <a-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
            <pie-comments />
        </a-col>
        <a-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
            <pie-complaints />
        </a-col>
    </a-row>
</template>
<script>
import pieOrders from './pieOrders'
import pieComments from './pieComments'
import pieComplaints from './pieComplaints'
export default {
    data () {
        return {}
    },
    components: {
        pieOrders,
        pieComments,
        pieComplaints
    }
}
</script>
<style lang="less">
.collect {
    .ant-card {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
    }
}
</style>
