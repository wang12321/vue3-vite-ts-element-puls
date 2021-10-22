import { Plugin } from 'vite'
import fg from 'fast-glob' // 读取文件目录
import fs from 'fs'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import prettier from 'prettier' // 处理文件格式

interface routerType extends Array<routerType> {
  index: number
  path: string
  name: string
  component?: any
  redirect?: string
  meta?: string
  children?: []
}

export function autoRouter(pages: string, importPrefix: string, routePath: string): Plugin {
  const { routes } = parsePagesDirectory(pages, importPrefix, routePath)
  const virtualFileId = routePath as string | '@virtual-router'
  return {
    name: 'auto-router', // 必须的，将会在 warning 和 error 中显示
    resolveId(id: string) {
      if (id === virtualFileId) {
        return virtualFileId
      }
    },
    configureServer(server) {
      async function hello(req: any, res: any, next: any) {
        // const { routes } = parsePagesDirectory(pages, importPrefix, routePath)
        if (req.url.indexOf(virtualFileId) > -1) {
          // res.setHeader('Content-type', 'application/json')
          // res.end(
          //   prettier.format(
          //     `
          //         import Layout from '@/layout/index.vue'
          //   export const routers = [${routes}]
          // `,
          //     {
          //       parser: 'babel',
          //       semi: false,
          //       singleQuote: true,
          //       trailingComma: 'none' // 处理最后一行不加，的问题
          //     }
          //   )
          // )
          await next() //执行下一个中间件
        } else {
          await next() //执行下一个中间件
        }
      }
      server.middlewares.use(hello)
    },
    load(id: string) {
      if (id === virtualFileId) {
        console.log('调用了')
        return prettier.format(
          `
            import Layout from '@/layout/index.vue'
      export const routers = [${routes}]
    `,
          {
            parser: 'babel',
            semi: false,
            singleQuote: true,
            trailingComma: 'none' // 处理最后一行不加，的问题
          }
        )
      }
    }
  }
}

function parsePagesDirectory(
  pages: string,
  importPrefix: string,
  routePath: string,
  layout = '_layout.vue',
  common = 'common'
) {
  const patterns = ['**/*.vue', `!**/${layout}`, `!**/${common}/*.vue`, `!**/${common}/**/*.vue`]
  // 获取所有layout的文件路径
  const layoutPaths = fg.sync(`**/${layout}`, {
    cwd: pages,
    onlyFiles: true
  })

  // 获取所有需要路由配置的文件路径
  const paths = fg.sync(patterns, {
    cwd: pages,
    onlyFiles: true
  })
  const pathsArr = paths.map((p) => p.split('/'))
  const layoutPathsArr = layoutPaths.map((p) => p.split('/'))

  // 生成嵌套目录
  const map = {
    children: ''
  }
  layoutPathsArr.forEach((path: string[]) => {
    const dir = path.slice(0, path.length - 1)
    dir.unshift('rootPathLayoutName')
    setToMap(map, pathToMapPath(path.slice(0, path.length - 1)), path)
  })
  pathsArr.forEach((path: string[]) => {
    let dir = path
    if (path.indexOf('index.vue') > -1) {
      dir = path.slice(0, path.length - 1)
    }
    setToMap(map, pathToMapPath(dir), path)
  })
  //  将目录匹配生成路由json
  const routerJson: routerType = pathMapToMeta(map.children, [], pages, importPrefix)
  const routes = createRoutes(routerJson)
  return { routes }
}

/**
 * 将目录生成嵌套树 将每个目录生成key:{value:[],childer:[]}
 * @param map {}
 * @param paths 不带.vue的路径
 * @param value 所有解析处理的层级目录数组
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function setToMap(map: {}, paths: any[], value: string[]) {
  const target = paths.reduce((item, key) => {
    if (!item.children) {
      item.children = new Map()
    }
    let child = item.children.get(key)
    if (!child) {
      child = {}
      item.children.set(key, child)
    }
    return child
  }, map)
  target.value = value
}

/**
 * 将路径数组 最后一个带有.vue的路径去除
 * @param segments
 * @returns {*}
 */
function pathToMapPath(segments: string[]) {
  const last = segments[segments.length - 1]
  return segments.slice(0, -1).concat(basename(last))
}

/**
 * 正则匹配 将.后面的字符串替换为空字符串
 * @param filename
 * @returns {*}
 */
function basename(filename: string) {
  return filename.replace(/\.[^.]+$/g, '')
}

/**
 *
 * @param children 嵌套目录
 * @param routers 路由
 * @param pages 需要自动生成文件的目录
 * @param importPrefix import 引入页面文件的前缀目录
 * @returns {*[]}
 */
function pathMapToMeta(
  children: any,
  routers: any = [],
  pages: string,
  importPrefix: string
): routerType {
  Array.from(children.keys()).forEach((row: any) => {
    const item = children.get(row)
    // 配置参数
    const router = {
      name: row,
      path:
        row.indexOf('_id') > -1
          ? row.indexOf('_id') === 0
            ? row.replace('_', ':')
            : row.replace('_', '/:')
          : row,
      component: '',
      redirect: '',
      index: 99,
      meta: `{ title: "${row}", icon: "form"}`,
      children: []
    }

    // 如果value有值，说明可以根据文件路径取meta信息
    if (item.value) {
      router.component = importPrefix + '/' + item.value.join('/')
      const file = fs.readFileSync(pages + '/' + item.value.join('/'), 'utf8')
      const metaArr = file.match(/meta: {[^{]+\}/g) || file.match(/meta:{[^{]+\}/g)
      if (metaArr) {
        const metaStr = metaArr[0]
        // 匹配meta信息
        let meta = ''
        if (metaStr.indexOf('meta') > -1) {
          meta = metaStr.substring(metaStr.indexOf('{'), metaStr.indexOf('}') + 1)
        }
        router.meta = meta
        // 匹配排序
        if (metaStr.indexOf('sortIndex') > -1) {
          const sortIndexAll = metaStr.substring(metaStr.indexOf('sortIndex'), metaStr.indexOf('}'))
          const sortIndex = sortIndexAll.substring(
            sortIndexAll.indexOf(':') + 1,
            sortIndexAll.indexOf(',') > -1 ? sortIndexAll.indexOf(',') : sortIndexAll.length - 1
          )
          router.index = Number(sortIndex) * 10
        }
        if (metaStr.indexOf('redirect') > -1) {
          const redirectALL = metaStr.substring(metaStr.indexOf('redirect'), metaStr.indexOf('}'))
          router.redirect = redirectALL.substring(
            redirectALL.indexOf(':') + 1,
            redirectALL.indexOf(',') > -1 ? redirectALL.indexOf(',') : redirectALL.length - 1
          )
        }
      }
    }
    // 如果有children 需要遍历循环匹配
    if (item.children) {
      router.children = pathMapToMeta(item.children, router.children, pages, importPrefix) as any
    }
    routers.push(router)
  })
  return routers
}
/**
 * 将路由json格式化成字符串
 * @param routers 路由json
 * @returns {*}
 */
function createRoutes(routers: routerType) {
  return routers.map(createRoute)
}

/**
 * 一级路由转换 第一级的时候需要把component换成Layout 如果没有子节点，则需要将父节点复制一份成为子节点，component指向文件路径
 * @param map
 * @param children
 * @returns {string}
 */
function createRoute(map: routerType, children = {}) {
  if (map.children && map.children.length !== 0) {
    children = map.children.map(createRouteZJ)
    if (map.redirect && map.redirect.length > 0) {
      return `\n{
      path:'/${map.path}',
      name:'${map.name}p',
      meta:${map.meta},
      index:${map.index},
      redirect: ${map.redirect},
      alwaysShow: false,
      component: Layout,
      children:[${children}]
    }`
    }
    return `\n{
      path:'/${map.path}',
      name:'${map.name}',
      meta:${map.meta},
      index:${map.index},
      alwaysShow: false,
      component: Layout,
      children:[${children}]
    }`
  } else {
    // 如果只有一级目录，需要单独处理name 不然会报警告name相同
    children = `\n{
      path:'${map.path}',
      name:'${map.name}',
      meta:${map.meta},
      index:${map.index},
      alwaysShow: false,
      component:() => import('${map.component}')
    }`
    if (map.redirect && map.redirect.length > 0) {
      return `\n{
      path:'/${map.path}',
      name:'${map.name}p',
      meta:${map.meta},
      index:${map.index},
      redirect: ${map.redirect},
      alwaysShow: false,
      component: Layout,
      children:[${children}]
    }`
    }
    return `\n{
      path:'/${map.path}',
      name:'${map.name}p',
      meta:${map.meta},
      index:${map.index},
      alwaysShow: false,
      component: Layout,
      children:[${children}]
    }`
  }
}

/**
 * 二级及以上路由转换
 * @param map json里面的children  子节点里面的path不需要'/'
 * @param children
 * @returns {string}
 */
function createRouteZJ(map: routerType, children = {}) {
  if (map.children) {
    children = map.children.map(createRouteZJ)
  }
  if (map.component && map.component.length > 0) {
    return `\n{
    path:'${map.path}',
    name:'${map.name}',
    meta:${map.meta},
    index:${map.index},
    component:() => import('${map.component}'),
    children:[${children}]
    }`
  } else {
    return children
  }
}
