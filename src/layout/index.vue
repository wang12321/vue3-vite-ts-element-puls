<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <el-header style="height: 50px">
      <div class="fixed-header-layout">
        <navbar />
      </div>
    </el-header>
    <div>
      <sidebar class="sidebar-container" style="margin-top: 50px" />
      <div class="main-container">
        <section class="app-main-layout">
          <router-view v-slot="{ Component }">
            <transition name="router-fade" mode="out-in">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </section>
      </div>
    </div>
  </div>
</template>

<script type="ts">
  import sidebar from './sidebar/index.vue'
  import navbar from './NavBar.vue'
  import { useStore } from 'vuex'
  import FixiOSBug from './ResizeHandler'
  import { DeviceType } from '@/store/modules/app'

  import {
    defineComponent,
    computed,
    onMounted,
    onBeforeMount,
    onBeforeUnmount,
    toRefs,
    reactive
  } from 'vue'
  import {useRoute} from "vue-router";

  export default defineComponent({
    name: 'Layout',
    components: {
      sidebar,
      navbar
    },
    setup() {
      const store = useStore()
      const route = useRoute()

      const {
        device,
        resizeMounted,
        watchRouter,
        addEventListenerOnResize,
        removeEventListenerResize
      } = FixiOSBug()
      const classObj = computed(() => {
        return {
          hideSidebar: !store.state.app.sidebar.opened,
          openSidebar: store.state.app.sidebar.opened,
          withoutAnimation: store.state.app.sidebar.withoutAnimation,
          mobile: device.value === DeviceType.Mobile
        }
      })
      const sidebar = computed(() => {
        return store.state.app.sidebar
      })
      const key = computed(() => {
        return route.path
      })
      const state = reactive({
        handleClickOutside: () => {
          store.dispatch('app/closeSideBar', false)
        }
      })
      watchRouter()
      onBeforeMount(() => {
        addEventListenerOnResize()
      })

      onMounted(() => {
        resizeMounted()
      })

      onBeforeUnmount(() => {
        removeEventListenerResize()
      })
      return {
        classObj,
        sidebar,
        device,
        key,
        ...toRefs(state)
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  @import '../styles/variables.module.scss';
  .app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: left;

    @include clearfix;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    position: absolute;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .fixed-header-layout {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: 100%;
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px);
  }

  .mobile .fixed-header {
    width: 100%;
  }

  .hasTagsView {
    .app-main {
      min-height: calc(100vh - 100px);
    }

    .fixed-header + .app-main {
      padding-top: 100px;
    }
  }
  .app-main-layout {
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
    text-align: left;
  }
  .fixed-header + .app-main-layout {
    padding-top: 90px;
  }

  .app-main {
    /*50 = navbar  */
    min-height: calc(100vh);
    width: 100%;
    position: relative;
    overflow: hidden;
    text-align: left;
  }
  .fixed-header + .app-main {
    padding-top: 90px;
  }
</style>
