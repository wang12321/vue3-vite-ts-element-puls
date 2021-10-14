import type { Plugin } from 'vite'
import SvgIconsPlugin from 'vite-plugin-svg-icons'
import path from 'path'

export function configSvgIconsPlugin(isBuild: boolean): Plugin {
  return SvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/icons')],
    svgoOptions: isBuild,
    // default
    symbolId: 'icon-[dir]-[name]'
  })
}
