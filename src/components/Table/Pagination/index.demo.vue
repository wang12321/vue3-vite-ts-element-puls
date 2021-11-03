<template>
  <Pagination
    :page-data="pageData"
    :backPosition="backPosition"
    v-on:update:page="pageData.page = $event"
    @reloadData="reloadData"
  />
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'

  export default defineComponent({
    name: 'PaginationViews',
    setup() {
      const backPosition = ref(100)
      const pageData = reactive({ total: 100, page: 1, rows: 20 })
      const reloadData = () => {
        console.log(pageData)
      }
      return {
        reloadData,
        backPosition,
        pageData
      }
    }
  })
</script>

<style>
  .van-doc-content ol li,
  .van-doc-content ul li {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .el-pager ul li {
    list-style-type: none !important;
  }
  .van-doc-content ol li:before,
  .van-doc-content ul li:before {
    height: 0 !important;
    border: 0 solid #666 !important;
  }
</style>
