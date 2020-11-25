<template>
    <page-container>
        <a-tabs v-model="activeTab">
            <a-tab-pane v-for="item in tabOptions" :key="item.value" :tab="item.label"></a-tab-pane>
        </a-tabs>
        <basic v-show="activeTab === '1'" />
        <message v-show="activeTab === '2'" />
        <agreement v-show="activeTab === '3'" />
        <billing v-show="activeTab === '4'" />
    </page-container>
</template>
<script>
import pageContainer from '@/views/components/page-container/index'
export default {
    data () {
        return {
            tabOptions: [{
                label: '基本信息',
                value: '1'
            }, {
                label: '短信设置',
                value: '2'
            }, {
                label: '服务协议设置',
                value: '3'
            }, {
                label: '计费设置',
                value: '4'
            }],
            activeTab: '1'
        }
    },
    components: {
        pageContainer,
        basic: () => import('./basic'),
        message: () => import('./message'),
        agreement: () => import('./agreement'),
        billing: () => import('./billing')
    },
    methods: {
        
    }
}
</script>
