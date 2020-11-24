<template>
    <div class="header-full">
        <a-tooltip placement="top" :title="isFull ? '退出全屏' : '全屏'">
            <a-icon :type="isFull ? 'fullscreen-exit' : 'fullscreen'" @click="handleFullScreen" />
        </a-tooltip>
    </div>
</template>
<script>
import screenfull from 'screenfull'
export default {
    data () {
        return {
            isFull: false
        }
    },
    methods: {
        handleFullScreen () {
            if (!screenfull.isEnabled) {
                this.$message('您的浏览器不支持全屏')
                return
            }
            screenfull.toggle()
            this.isFull = !this.isFull
        }
    }
}
</script>
<style lang="less">
.header-full {
    padding: 0 10px;
    .anticon {
        font-size: 20px;
        cursor: pointer;
    }
}
</style>
