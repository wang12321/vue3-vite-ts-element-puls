<script lang="ts">
  import { h, VNode, RendererNode, RendererElement } from 'vue'
  import SvgIcon from '@/components/SvgIcon.vue'

  type propsType = {
    title?: string
    icon?: string
  }
  const MenuItem = (
    props: propsType,
    ctx: any
  ): VNode<RendererNode, RendererElement, { [p: string]: any }> => {
    const html = []
    if (props.icon) {
      if (props.icon.includes('el-icon')) {
        html.push(
          h(
            `i`,
            {
              className: props.icon
            },
            ''
          )
        )
      } else {
        html.push(
          h(
            SvgIcon,
            {
              color: '#ffffff',
              name: props.icon
            },
            ''
          )
        )
      }
    }
    if (props.title) {
      html.push(h(`span`, {}, props.title))
    }

    return h(`div`, ctx.attrs, html)
  }
  export default MenuItem
</script>
