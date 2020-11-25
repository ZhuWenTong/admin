<template>
    <page-container>
        <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="职业信息">
                <professional />
            </a-tab-pane>
            <a-tab-pane key="2" tab="工作经历">
                <work-experiences />
            </a-tab-pane>
        </a-tabs>
    </page-container>
</template>
<script>
import pageContainer from '@/views/components/page-container/index'
export default {
    data () {
        return {
            
        }
    },
    components: {
        pageContainer,
        professional: () => import('./professional'),
        'work-experiences': () => import('./work-experiences')
    },
    methods: {
        
    }
}
</script>
