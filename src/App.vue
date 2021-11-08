<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  const store = useStore()
  const router = useRouter()
  const isDoc = computed(() => store.getters['user/isDoc'])
  const goback = () => {
    console.log('goback')
    router.push('/').catch((err) => {
      console.warn(err)
    })
  }
</script>

<template>
  <router-view />
  <div v-if="isDoc" @click="goback" class="div_fix">返回组件</div>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .div_fix {
    background: #1a59b7;
    color: #ffffff;
    overflow: hidden;
    z-index: 9999;
    position: fixed;
    padding: 5px;
    text-align: center;
    width: 175px;
    height: 40px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    right: 10px;
    top: 10px;
  }
</style>
