<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <div v-else @click="push">
    <slot />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { isExternal } from '@/utils/validate'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  export default defineComponent({
    name: 'SidebarItemLink',
    props: {
      to: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const router = useRouter()
      const store = useStore()

      const push = () => {
        router.push(props.to).catch((err) => {
          console.log(err)
        })
        if (store.state.app.device.toString() === '0') {
          store.dispatch('app/closeSideBar', false)
        }
      }
      return {
        push,
        isExternal
      }
    }
  })
</script>
