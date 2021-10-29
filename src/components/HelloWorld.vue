<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Docs </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="inCrement">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>
<script lang="ts">
  import { useStore } from 'vuex'
  import { defineComponent, computed } from 'vue'
  export default defineComponent({
    name: 'HellowWorld',
    props: {
      // 信息
      msg: {
        type: String,
        required: true
      }
    },
    setup() {
      const store = useStore()
      // eslint-disable-next-line no-undef
      // const count = computed(() => store.state.user.count)
      const count = computed(() => store.getters['user/count'])

      // const inCrement = () => store.commit('user/increment')
      const inCrement = () => store.dispatch('user/incrementA')
      return { count, inCrement }
    }
  })
</script>
<style scoped>
  a {
    color: #42b983;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }
</style>
