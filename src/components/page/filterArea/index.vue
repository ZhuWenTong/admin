<template>
    <div class="filter-area">
        <div class="wrap-content">
            <div class="content">
                <slot></slot>
                <p class="btn" v-if="$slots.more" @click="visible = !visible">
                    <span>{{visible ? $t('close') : $t('open')}}</span>
                    <a-icon :type="visible ? 'up' : 'down'" />
                </p>
                <template v-if="showSearchBtn">
                    <a-button type="primary" @click="$emit('search')">{{$t('search')}}</a-button>
                    <a-button @click="$emit('clear')">{{$t('reset')}}</a-button>
                </template>
            </div>
            <transition name="slide-fade">
                <div class="more-filter" v-show="visible">
                    <slot v-if="$slots.more" name="more">
                        
                    </slot>
                </div>
            </transition>
        </div>
        <div class="action" v-if="$slots.action">
            <slot name="action"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        showSearchBtn: {
            type: Boolean,
            default: true
        }
    },
    i18n: {
        messages: {
            CN: {
                search: '查询',
                reset: '重置',
                close: '收起',
                open: '展开'
            },
            HK: {
                search: '查詢',
                reset: '重置',
                close: '收起',
                open: '展開'
            },
            US: {
                search: 'Search',
                reset: 'Reset',
                close: 'Close',
                open: 'Open'
            }
        }
    },
    data () {
        return {
            visible: false
        }
    }
}
</script>
<style lang="less">
.filter-area {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .content,
    .more-filter {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        &>div {
            &>span {
                &:first-of-type {
                    display: inline-block;
                    width: 100px;
                    text-align: right;
                }
            }
        }
    }
    .content {
        .btn {
            color: @primary-color;
            margin: 0 20px 0 0;
            cursor: pointer;
            span {
                margin-right: 2px;
            }
        }
    }
    .more-filter {
        margin-top: 20px;
    }
    .ant-input,
    .ant-select {
        width: 200px;
        margin-right: 20px;
    }
    .ant-calendar-picker-input {
        width: 100%;
    }
    .ant-input-affix-wrapper {
        width: 200px;
        margin-right: 20px;
        .ant-input {
            margin-right: 0;
        }
    }
    .ant-calendar-picker {
        margin-right: 20px;
        .ant-input {
            margin-right: 0;
        }
    }
    .ant-btn {
        &:not(:last-child) {
            margin-right: 20px;
        }
    }
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
