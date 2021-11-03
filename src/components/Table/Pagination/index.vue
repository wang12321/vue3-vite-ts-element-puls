<template>
  <el-pagination
    v-if="show"
    v-bind="$attrs"
    :current-page="pageData.page"
    :page-size="pageData.rows"
    :page-sizes="[20, 30, 40, 50]"
    :prev-text="prevText"
    :next-text="nextText"
    :layout="layout"
    :total="pageData.total"
    class="pagination"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>

<script lang="ts">
  import { defineComponent, onBeforeUnmount, ref } from 'vue'
  export default defineComponent({
    name: 'Pagination',
    inheritAttrs: false,
    emits: ['reloadData', 'update:rows', 'update:page'],
    props: {
      show: {
        type: Boolean,
        default: true
      },
      layout: {
        type: String,
        default: 'total, prev, pager, next, jumper'
      },
      prevText: {
        type: String,
        default: '上一页'
      },
      nextText: {
        type: String,
        default: '下一页'
      },
      pageData: {
        type: Object,
        required: true
      },
      backPosition: {
        type: Number,
        default: 0,
        required: false
      }
    },
    setup(props, { emit }) {
      const interval = ref()
      // const state = reactive({
      const handleSizeChange = (val: number) => {
        emit('update:rows', val)
        emit('reloadData')
      }
      const handleCurrentChange = (val: number) => {
        emit('update:page', val)
        emit('reloadData')
        scrollToTop()
      }
      const scrollToTop = () => {
        const start = window.pageYOffset
        let i = 0
        interval.value = setInterval(() => {
          const next = Math.floor(easeInOutQuad(10 * i, start, -start, 500))
          if (next <= props.backPosition) {
            window.scrollTo(0, props.backPosition)
            clearInterval(interval.value)
          } else {
            window.scrollTo(0, next)
          }
          // eslint-disable-next-line no-plusplus
          i++
        }, 16.7)
      }
      /**
       * 计算滑动递减的高度
       * @param t 递减的幅度
       * @param b 正页面偏移高度
       * @param c 负页面偏移高度
       * @param d 页面基准高度
       * @returns {*}
       */
      const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
        // eslint-disable-next-line no-cond-assign,no-param-reassign,no-mixed-operators
        if ((t /= d / 2) < 1) return (c / 2) * t * t + b
        // eslint-disable-next-line no-mixed-operators,no-param-reassign,no-plusplus
        return (-c / 2) * (--t * (t - 2) - 1) + b
      }
      // })
      onBeforeUnmount(() => {
        if (interval.value) {
          clearInterval(interval.value)
        }
      })
      return {
        interval,
        handleSizeChange,
        handleCurrentChange
      }
    }
  })
</script>

<style scoped>
  .pagination {
    text-align: center;
    margin-top: 15px;
  }
</style>
