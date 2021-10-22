<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import variables from '@/styles/variables.module.scss'
  // import SidebarLogo from './Logo.vue'
  import { defineComponent, computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import SidebarItem from './sidebarItem.vue'
  export default defineComponent({
    name: 'Index',
    components: {
      SidebarItem
    },
    setup() {
      const store = useStore()
      const route = useRoute()
      const routes = computed(() => {
        console.log('路由', store.state.permission.routes)
        return store.state.permission.routes
      })
      const isCollapse = computed(() => {
        return !store.state.app.sidebar.opened
      })
      const activeMenu = computed(() => {
        const { meta, name } = route
        if (meta !== null || meta !== undefined) {
          if (meta.activeMenu) {
            return meta.activeMenu
          }
        }
        return name
      })
      return {
        variables,
        isCollapse,
        routes,
        activeMenu
      }
    }
  })
</script>

<style lang="scss">
  .sidebar-container {
    // reset element-ui css
    .horizontal-collapse-transition {
      transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
    }

    .scrollbar-wrapper {
      overflow-x: hidden !important;
    }

    .el-scrollbar__view {
      height: 100%;
    }

    .el-scrollbar__bar {
      &.is-vertical {
        right: 0px;
      }

      &.is-horizontal {
        display: none;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .el-scrollbar {
    height: 100%;
  }

  .has-logo {
    .el-scrollbar {
      height: calc(100% - 50px);
    }
  }

  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }

  ::v-deep(.el-menu-item) {
    font-size: 14px !important;
    height: 65px !important;
    line-height: 65px !important;
    &:hover {
      background-color: rgba(52, 78, 104, 0.5) !important;
    }
    &.is-active {
      //border-left: 4px solid #39cedd !important;
    }
  }

  ::v-deep(.el-sub-menu__title) {
    height: 65px !important;
    line-height: 65px !important;
    font-size: 15px !important;
    &:hover {
      background-color: rgba(52, 78, 104, 0.5) !important;
    }
  }

  ::v-deep(.el-sub-menu .el-menu-item) {
    height: 60px !important;
    line-height: 60px !important;
  }
</style>
