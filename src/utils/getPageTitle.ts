export const title = 'vue3+vite'
export const logo = 'component'

export default function getPageTitle(pageTitle: string): string {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
