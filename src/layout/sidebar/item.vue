<script lang="ts">
  import { h, VNode, RendererNode, RendererElement } from 'vue'
  import SvgIcon from '@/components/SvgIcon/index.vue'

  type propsType = {
    title?: string | unknown
    icon?: string | unknown
  }
  const MenuItem = (
    props: propsType,
    ctx: any
  ): VNode<RendererNode, RendererElement, { [p: string]: any }> => {
    const html = []
    if (props.icon) {
      if ((props.icon as string).includes('el-icon')) {
        html.push(
          h(
            `i`,
            {
              style: {
                'margin-right': '16px',
                'margin-left': '-5px'
              },
              className: props.icon as string
            },
            ''
          )
        )
      } else {
        html.push(
          h(
            SvgIcon,
            {
              style: {
                'margin-right': '22px'
              },
              color: '#ffffff',
              name: props.icon as string
            },
            ''
          )
        )
      }
    }
    if (props.title) {
      html.push(h('span', {}, props.title as string))
    }

    return h(`div`, ctx.attrs, html)
  }
  export default MenuItem
</script>
