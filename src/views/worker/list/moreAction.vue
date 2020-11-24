<template>
    <a-dropdown>
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        更多<a-icon type="down" />
        </a>
        <a-menu slot="overlay" @click="handleMore">
            <a-menu-item key="a">完善信息</a-menu-item>
            <a-menu-item key="b">请假</a-menu-item>
            <a-menu-item key="c">离职</a-menu-item>
        </a-menu>
    </a-dropdown>
</template>
<script>
export default {
    props: {
        data: Object
    },
    methods: {
        handleMore ({key}) {
            this.$emit('change', key, this.data)
        }
    }
}
</script>