<template>
    <div class="home-page">
        <statistics />
        <hospital-line style="margin-top: 10px;" />
        <information style="margin-top: 10px;" />
        <collect style="margin-top: 10px;" />
    </div>
</template>
<script>
import statistics from './statistics/index'
import hospitalLine from './hospitalLine'
import information from './information/index'
import collect from './collect/index'
export default {
    data () {
        return {}
    },
    components: {
        statistics,
        hospitalLine,
        information,
        collect
    }
}
</script>
