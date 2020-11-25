<template>
    <page-container>
        <p>{{$t('title')}}</p>
        <p>{{$t('test')}}</p>
    </page-container>
</template>
<script>
import pageContainer from '@/views/components/page-container/index'
export default {
    i18n: require('./i18n'),
    data () {
        return {}
    },
    components: {
        pageContainer
    }
}
</script>
