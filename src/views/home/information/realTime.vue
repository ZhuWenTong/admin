<template>
    <a-card title="实时信息" :bordered="false" class="real-time">
        <div class="no-data">暂无信息</div>
    </a-card>
</template>
<script>
export default {
    data () {
        return {}
    }
}
</script>
<style lang="less">
.real-time {
    .no-data {
        line-height: 280px;
        text-align: center;
        color: #cccccc;
    }
}
</style>
