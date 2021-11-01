<template>
  <Hamburger
    :is-active="false"
    @toggle-click="toggleSideBar"
    :style="{ color: '#000' }"
    style="background-color: #2c3e50"
/></template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  export default defineComponent({
    name: 'Hamburger.demo',
    setup() {
      const state = reactive({
        toggleSideBar: () => {
          console.log('点击了')
        }
      })
      return {
        ...toRefs(state)
      }
    }
  })
</script>

<style scoped></style>
