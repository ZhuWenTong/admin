<template>
    <div class="basic-info-page">
        <a-tabs v-model="activeTab">
            <a-tab-pane v-for="item in tabOptions" :key="item.value" :tab="item.label"></a-tab-pane>
        </a-tabs>
        <basic v-show="activeTab === '1'" />
        <message v-show="activeTab === '2'" />
        <agreement v-show="activeTab === '3'" />
        <billing v-show="activeTab === '4'" />
    </div>
</template>
<script>
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
        basic: () => import('./basic'),
        message: () => import('./message'),
        agreement: () => import('./agreement'),
        billing: () => import('./billing')
    },
    methods: {
        
    }
}
</script>
<style lang="less">
.basic-info-page {
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 0 10px 10px 10px;
}
</style>