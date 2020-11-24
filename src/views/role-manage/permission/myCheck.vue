<template>
    <div class="my-check">
        <a-checkbox class="parent-check" :indeterminate="data.indeterminate" :checked="data.checkAll" @change="checkAll">{{data.title}}</a-checkbox>
        <a-checkbox-group :options="data.children" v-model="data.checked" @change="selectRole">
            <span slot="label" slot-scope="{title}">{{title}}</span>
        </a-checkbox-group>
    </div>
</template>
<script>
export default {
    props: {
        data: Object
    },
    methods: {
        selectRole (selectList) {
            this.data.indeterminate = !!selectList.length && selectList.length < this.data.children.length
            this.data.checkAll = selectList.length === this.data.children.length
            this.$emit('change', selectList)
        },
        checkAll (e) {
            let list = this.data.children.map(i => i.value)
            Object.assign(this.data, {
                checked: e.target.checked ? list : [],
                indeterminate: false,
                checkAll: e.target.checked
            })
            this.$emit('change', this.data.checked)
        }
    }
}
</script>
<style lang="less">
.my-check {
    padding: 10px 0;
    &:not(:last-child) {
        border-bottom: 1px dashed #e7e7e7;
    }
    .ant-checkbox-wrapper {
        min-width: 100px;
    }
    .parent-check {
        width: 150px;
        margin-right: 100px;
        .ant-checkbox-wrapper {
            width: 120px;
        }
    }
}
</style>
