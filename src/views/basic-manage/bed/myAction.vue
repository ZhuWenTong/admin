<template>
    <a-dropdown>
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            操作 <a-icon type="down" />
        </a>
        <a-menu slot="overlay" @click="handleClick">
            <a-menu-item v-for="item in menuOptions" :key="item.value">{{item.label}}</a-menu-item>
        </a-menu>
    </a-dropdown>
</template>
<script>
export default {
    props: {
        data: Object
    },
    data () {
        return {
            menuOptions: []
        }
    },
    methods: {
        init () {
            if (this.data.depth === 1) {
                this.menuOptions = [{
                    label: '新建楼栋',
                    value: 'add'
                }]
            }
            if (this.data.depth === 2) {
                this.menuOptions = [{
                    label: '编辑',
                    value: 'edit'
                }, {
                    label: '删除',
                    value: 'delete'
                }, {
                    label: '新建病区/楼层',
                    value: 'add'
                }]
            }
            if (this.data.depth === 3) {
                this.menuOptions = [{
                    label: '编辑',
                    value: 'edit'
                }, {
                    label: '删除',
                    value: 'delete'
                }, {
                    label: '新建病房',
                    value: 'add'
                }]
            }
            if (this.data.depth === 4) {
                this.menuOptions = [{
                    label: '编辑',
                    value: 'edit'
                }, {
                    label: '删除',
                    value: 'delete'
                }, {
                    label: '新建床位',
                    value: 'add'
                }]
            }
            if (this.data.depth === 5) {
                this.menuOptions = [{
                    label: '编辑',
                    value: 'edit'
                }, {
                    label: '删除',
                    value: 'delete'
                }]
            }
        },
        handleClick (data) {
            this.$emit('change', data.key, this.data)
        },
    },
    created () {
        this.init()
    }
}
</script>
