/**
 * @author ff
 * @date 2021/10/28
 * @Description:apiURL配置
 * @update by:
 */

const development = {
  UnifiedLogin: 'http://login.xq5.com',
  user: '' // 这里是域名（http://apics/） 使用mock数据才这样表述
}
const production = {
  UnifiedLogin: 'http://login.xq5.com',
  user: ''
}

const productionDev = development

export default {
  productionDev,
  development,
  production
}
