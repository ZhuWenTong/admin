<template>
    <div class="perfectly">
        <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="职业信息">
                <professional />
            </a-tab-pane>
            <a-tab-pane key="2" tab="工作经历">
                <work-experiences />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
export default {
    data () {
        return {
            
        }
    },
    components: {
        professional: () => import('./professional'),
        'work-experiences': () => import('./work-experiences')
    },
    methods: {
        
    }
}
</script>
<style lang="less">
.perfectly {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 0 10px;
}
</style>
