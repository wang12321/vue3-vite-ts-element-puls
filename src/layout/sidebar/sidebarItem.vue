<template>
  <div v-if="!item.meta || !item.meta.hidden">
    <template
      v-if="
        !alwaysShowRootMenu &&
        theOnlyOneChild &&
        (!theOnlyOneChild.children ||
          (theOnlyOneChild.children && theOnlyOneChild.children.length === 0))
      "
    >
      <SidebarItemLink v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item
          :index="theOnlyOneChild.name"
          :class="{ 'submenu-title-noDropdown': isFirstLevel }"
        >
          <menu-item
            v-if="theOnlyOneChild.meta"
            :icon="theOnlyOneChild.meta && theOnlyOneChild.meta.icon"
            :title="theOnlyOneChild.meta.title"
          ></menu-item>
        </el-menu-item>
      </SidebarItemLink>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <menu-item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        ></menu-item>
      </template>
      <template v-if="item.children && item.children.length !== 0">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue'
  import { RouteRecordRaw } from 'vue-router'
  import { isExternal } from '@/utils/validate'
  import SidebarItemLink from './Link.vue'
  import MenuItem from './item.vue'

  export default defineComponent({
    name: 'SidebarItem',
    props: {
      item: {
        type: Object as PropType<RouteRecordRaw>,
        required: true
      },
      isCollapse: {
        type: Boolean,
        required: false
      },
      isFirstLevel: {
        type: Boolean,
        required: false
      },
      basePath: {
        type: String,
        required: true
      }
    },
    components: {
      SidebarItemLink,
      MenuItem
    },
    setup(props) {
      const alwaysShowRootMenu = computed(() => {
        console.log(99999, props.item)
        if (props.item.meta && props.item.meta.alwaysShow) {
          return true
        } else {
          return false
        }
      })

      const showingChildNumber = computed(() => {
        if (props.item.children && props.item.children.length !== 0) {
          const showingChildren = props.item.children.filter((item) => {
            if (item.meta && item.meta.hidden) {
              return false
            } else {
              return true
            }
          })
          return showingChildren.length
        }
        return 0
      })

      const theOnlyOneChild = computed(() => {
        if (showingChildNumber.value > 1) {
          return null
        }
        if (props.item.children) {
          for (const child of props.item.children) {
            if (!child.meta || !child.meta.hidden) {
              return child
            }
          }
        }
        console.log(888888, { ...props.item, path: '' })
        // If there is no children, return itself with path removed,
        // because this.basePath already conatins item's path information
        return { ...props.item, path: '' }
      })

      const resolvePath = (routePath: string) => {
        if (isExternal(routePath)) {
          return routePath
        }
        if (isExternal(props.basePath)) {
          return props.basePath
        }
        if (props.basePath === '/') {
          return `${props.basePath}${routePath}`
        }
        return `${props.basePath}/${routePath}`
      }
      return {
        alwaysShowRootMenu,
        showingChildNumber,
        theOnlyOneChild,
        resolvePath
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import '../../styles/variables.module.scss';

  ::v-deep(.el-submenu__title) {
    font-size: 13px !important;
  }
  .el-submenu.is-active > .el-submenu__title {
    color: $subMenuActiveText !important;
  }

  .full-mode {
    .nest-menu .el-submenu > .el-submenu__title,
    .el-submenu .el-menu-item {
      min-width: $sideBarWidth !important;
      background-color: $subMenuBg !important;

      &:hover {
        background-color: $subMenuHover !important;
      }
    }
    .el-menu-item {
      & > span {
        display: inline-block;
      }
    }
    ::v-deep(.el-submenu) {
      overflow: hidden !important;
      & > .el-submenu__title {
        .el-submenu__icon-arrow {
          display: none !important;
        }
      }
    }
  }

  .simple-mode {
    &.first-level {
      .submenu-title-noDropdown {
        padding: 0 !important;
        position: relative;

        .el-tooltip {
          padding: 0 !important;
        }
      }

      .el-submenu {
        overflow: hidden;

        & > .el-submenu__title {
          padding: 0px !important;

          .el-submenu__icon-arrow {
            display: none;
          }

          & > span {
            visibility: hidden;
          }
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  svg {
    margin-right: 20px;
  }

  .simple-mode {
    svg {
      margin-left: 0px;
    }
  }
</style>
