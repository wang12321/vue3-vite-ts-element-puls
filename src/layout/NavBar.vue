<template>
  <div class="navbar" :style="{ 'background-color': navbarBackground }">
    <div class="logo">
      <SidebarLogo />
    </div>
    <div class="navbarLogo">
      <Hamburger
        :is-active="isCollapse"
        class="hamburger-container"
        @toggle-click="toggleSideBar"
        :style="{ color: navbarColor }"
        style="top: 2px; position: relative"
      />
      <div class="right-menu">
        <template v-if="device !== '0'">
          <screenfull
            id="screenfull"
            class="right-menu-item hover-effect"
            :style="{ color: navbarColor }"
          />
        </template>
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper" :style="{ color: navbarColor }">
            <span>{{ name }}</span>
            <i class="el-icon-caret-bottom" style="margin-top: -5px" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">
                <span style="display: block"> 退出登入 </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
  import SidebarLogo from './sidebar/Logo.vue'
  import { defineComponent, reactive, toRefs, computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import variables from '@/styles/variables.module.scss'

  export default defineComponent({
    name: 'NavBar',
    components: {
      SidebarLogo
    },
    setup() {
      const store = useStore()
      const router = useRouter()
      const device = computed(() => {
        return store.state.app.device.toString()
      })
      const name = computed(() => {
        return store.state.user.name
      })

      const isCollapse = computed(() => {
        return store.state.app.sidebar.opened
      })
      const navbarBackground = computed(() => {
        return variables.navbarBackground
      })
      const navbarColor = computed(() => {
        return variables.navbarColor
      })
      const state = reactive({
        toggleSideBar: () => {
          store.dispatch('app/toggleSideBar')
        },
        logout: async () => {
          await store.dispatch('user/logout')
          router.push('/login').catch((err) => {
            console.warn(err)
          })
        }
      })
      return {
        isCollapse,
        device,
        name,
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
    .logo {
      width: $sideBarWidth;
      height: 50px;
      position: absolute;
      background-color: #0c202b;
    }
    .hamburger-container {
      color: #ffffff;
      line-height: 46px;
      height: 100%;
      float: left;
      padding: 0 0;
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
      margin-right: 20px;
      float: right;
      height: 100%;
      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        float: left;
        margin-top: 15px;
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
          font-size: 18px;
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
