<template>
    <div class="my-cascader-panel">
        <div class="panel-main">
            <div v-for="item in data" :key="item.value" class="panel-parent">
                <div class="panel-content" @click="handleClick(item)" :class="{'active': item.value === activeId}">
                    <span>{{item.label}}</span>
                    <span>》</span>
                </div>
                <div v-if="item.children && item.children.length && item.value === activeId" class="panel-son">
                    <cascaderPanel :data="item.children" @change="change" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import cascaderPanel from './index'
export default {
    name: 'cascaderPanel',
    props: {
        data: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            activeId: ''
        }
    },
    components: {
        cascaderPanel
    },
    methods: {
        handleClick (item) {
            this.activeId = item.value
            this.change(item)
        },
        change (data) {
            this.$emit('change', data)
        }
    }
}
</script>
<style lang="less">
.flex(@direction: row, @justify: flex-start, @align: center) {
    display: flex;
    flex-direction: @direction;
    justify-content: @justify;
    align-items: @align;
}
.my-cascader-panel {
    .panel-main {
        position: relative;
        width: 300px;
        border: 1px solid #e6e6e6;
        padding: 4px 6px;
        box-sizing: border-box;
        .panel-parent {
            .panel-content {
                height: 30px;
                padding: 0 10px;
                box-sizing: border-box;
                .flex(row, space-between, center);
                cursor: pointer;
                border: 1px solid transparent;
                &.active {
                    border: 1px solid #bce8f1;
                    background: #d9edf7;
                }
            }
            .panel-son {
                position: absolute;
                left: 100%;
                top: 0;
                transform: translate(20px, -1px);
            }
        }
    }
}
</style>
