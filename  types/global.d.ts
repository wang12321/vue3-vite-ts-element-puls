declare type Recordable<T = any> = Record<string, T>

interface ImportMetaEnv extends ViteEnv {
  __: unknown
}

declare interface keyType {
  [key: string]: any
}

// declare type axiosType = AxiosInstance
