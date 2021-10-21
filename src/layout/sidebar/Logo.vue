<template>
  <div
    class="sidebar-logo-container"
    :class="{ collapse: collapse }"
    :style="{ background: navbarBackground }"
  >
    <transition name="sidebarLogoFade">
      <router-link class="sidebar-logo-link" to="/">
        <svg-icon
          v-if="logo"
          :icon-class="logo"
          class="sidebar-logo sidebar-logo-collapse"
          :style="{ color: navbarColor }"
        />
        <h1 class="sidebar-title" :style="{ color: navbarColor }">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import SvgIcon from '@/components/SvgIcon.vue'
  import { title, logo } from '@/utils/getPageTitle'
  import variables from '@/styles/variables.module.scss'

  export default defineComponent({
    name: 'SidebarLogo',
    components: {
      SvgIcon
    },
    props: {
      collapse: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    setup() {
      const navbarBackground = computed(() => {
        return variables.navbarBackground
      })
      const navbarColor = computed(() => {
        return variables.navbarColor
      })

      return {
        logo,
        title,
        navbarBackground,
        navbarColor
      }
    }
  })
</script>

<style lang="scss" scoped>
  .sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #0c202b;
    text-align: center;
    overflow: hidden;

    .sidebar-logo {
      display: none;
    }

    & .sidebar-logo-link {
      height: 100%;
      width: 100%;
      padding-top: 10px;

      & .sidebar-logo-text {
        width: 205px;
        vertical-align: middle;
      }

      & .sidebar-title {
        display: inline-block;
        padding-left: 10px;
        margin: 0;
        color: #fff;
        font-weight: 600;
        line-height: 50px;
        font-size: 20px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        vertical-align: middle;
      }
    }

    &.collapse {
      .sidebar-logo-link {
        text-align: left;
        padding-left: 30px;
        padding-top: 0px;
      }
      .sidebar-logo {
        width: 22px;
        height: 22px;
        vertical-align: middle;
        margin-right: 0;
        display: inline-block;
      }
      .sidebar-logo-text {
        display: none;
      }
    }
  }
</style>
