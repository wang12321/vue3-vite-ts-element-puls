declare type Recordable<T = any> = Record<string, T>

interface ImportMetaEnv extends ViteEnv {
  __: unknown
}

declare interface userStore1 {
  VITE_GLOB_APP_TITLE: string
}
