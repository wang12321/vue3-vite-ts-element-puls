<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[isCollapse ? 'full-mode' : 'simple-mode', { 'first-level': isFirstLevel }]"
  >
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
        return !!(props.item.meta && props.item.meta.alwaysShow)
      })

      const showingChildNumber = computed(() => {
        if (props.item.children && props.item.children.length !== 0) {
          const showingChildren = props.item.children.filter((item) => {
            return !(item.meta && item.meta.hidden)
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

  .el-sub-menu.is-active > .el-sub-menu__title {
    color: $subMenuActiveText !important;
  }

  .full-mode {
    .nest-menu .el-sub-menu > .el-sub-menu__title,
    .el-sub-menu .el-menu-item {
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
    ::v-deep(.el-sub-menu) {
      overflow: hidden !important;
      & > .el-sub-menu__title {
        .el-sub-menu__icon-arrow {
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

      .el-sub-menu {
        overflow: hidden;

        & > .el-sub-menu__title {
          padding: 0 !important;

          .el-sub-menu__icon-arrow {
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
      margin-left: 0;
    }
  }
</style>
