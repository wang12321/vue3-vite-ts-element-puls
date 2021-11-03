<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import variables from '../../styles/variables.module.scss'

  export default defineComponent({
    name: 'SvgIcon',
    props: {
      // 前缀
      prefix: {
        type: String,
        default: 'icon'
      },
      // 名称
      name: {
        type: String,
        required: true
      },
      // 颜色
      color: {
        type: String,
        default: variables.navbarColor || '#333'
      }
    },
    setup(props, ctx) {
      console.log(123123, ctx)
      const symbolId = computed(() => `#${props.prefix}-${props.name}`)
      return { symbolId }
    }
  })
</script>

<style scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
  }
</style>
