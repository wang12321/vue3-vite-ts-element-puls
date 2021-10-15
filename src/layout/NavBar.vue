<template>
  <div class="navbar" :style="{ 'background-color': navbarBackground }">
    <!--    <div class="logo">-->
    <!--&lt;!&ndash;      <logo />&ndash;&gt;-->
    <!--    </div>-->
    <!--    <div class="navbarLogo">-->
    <!--      &lt;!&ndash;      <hamburger&ndash;&gt;-->
    <!--      &lt;!&ndash;        :is-active="sidebar.opened"&ndash;&gt;-->
    <!--      &lt;!&ndash;        class="hamburger-container"&ndash;&gt;-->
    <!--      &lt;!&ndash;        @toggleClick="toggleSideBar"&ndash;&gt;-->
    <!--      &lt;!&ndash;      />&ndash;&gt;-->
    <!--      <div class="right-menu">-->
    <!--        <template v-if="device !== 'mobile'">-->
    <!--          &lt;!&ndash;          <screenfull&ndash;&gt;-->
    <!--          &lt;!&ndash;            id="screenfull"&ndash;&gt;-->
    <!--          &lt;!&ndash;            class="right-menu-item hover-effect"&ndash;&gt;-->
    <!--          &lt;!&ndash;            :style="{ color: navbarColor }"&ndash;&gt;-->
    <!--          &lt;!&ndash;          />&ndash;&gt;-->
    <!--        </template>-->
    <!--        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">-->
    <!--          <div class="avatar-wrapper" :style="{ color: navbarColor }">-->
    <!--            <span>{{ name }}</span>-->
    <!--            <i class="el-icon-caret-bottom" />-->
    <!--          </div>-->
    <!--          <template #dropdown>-->
    <!--            <el-dropdown-menu>-->
    <!--              <el-dropdown-item @click="logout">-->
    <!--                <span style="display: block"> 退出登入 </span>-->
    <!--              </el-dropdown-item>-->
    <!--            </el-dropdown-menu>-->
    <!--          </template>-->
    <!--        </el-dropdown>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
  // import SidebarLogo from './sidebar/Logo.vue'
  import { defineComponent, reactive, toRefs, computed, ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import variables from '@/styles/variables.module.scss'

  export default defineComponent({
    name: 'NavBar',
    components: {
      // SidebarLogo
    },
    setup() {
      const store = useStore()
      const router = useRouter()

      const device = computed(() => {
        return store.state.app.device.toString()
      })
      const name = computed(() => {
        return store.getters.name.toString()
      })
      const breadcrumb = computed(() => {
        return store.state.settings.breadcrumb
      })
      const IsSearch = computed(() => {
        return store.state.settings.IsSearch
      })
      const showLogo = computed(() => {
        return store.state.settings.sidebarLogo
      })
      const isCollapse = computed(() => {
        return store.state.app.sidebar.opened
      })
      const isLayout = computed(() => {
        return store.state.settings.Layout
      })
      const LayoutClass = computed(() => {
        return !isLayout.value && showLogo.value && device.value !== '0' ? 'navbarLogo' : ''
      })
      const navbarBackground = computed(() => {
        console.log(111, variables)
        return variables.navbarBackground
      })
      const navbarColor = computed(() => {
        console.log(variables.navbarColor)
        return variables.navbarColor
      })
      const isSwitchEnvironment = computed(() => {
        return store.state.settings.isSwitchEnvironment
      })

      const state = reactive({
        toggleSideBar: () => {
          store.dispatch('app/ToggleSideBar')
        },
        logout: async () => {
          await store.dispatch('user/logout')
          router.push('/login').catch((err) => {
            console.warn(err)
          })
        },
        switchAction() {
          if (process.env.NODE_ENV.indexOf('development') > -1) {
            window.location.reload()
          }
        }
      })
      return {
        variables,
        isSwitchEnvironment,
        showLogo,
        isCollapse,
        isLayout,
        device,
        name,
        breadcrumb,
        IsSearch,
        LayoutClass,
        navbarBackground,
        navbarColor,
        ...toRefs(state)
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import '../styles/variables.module.scss';
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .navbarLogo {
      padding-left: $sideBarWidth;
    }
    .logo_l {
      width: $sideBarWidth;
      height: 50px;
      position: absolute;
      background-color: #0c202b;
    }
    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      padding: 0 15px;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        //vertical-align: text-bottom;
        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        .avatar-wrapper {
          float: right;
          height: 45px;
          line-height: 45px;
          margin-top: 5px;
          margin-right: 16px;
          margin-left: 16px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
