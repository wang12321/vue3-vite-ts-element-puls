const users = {
  'superadmin-token': {
    permission: [1],
    introduction: 'I am a super admin',
    name: '超级管理员'
  },
  'admin-token': {
    permission: [2],
    introduction: 'I am an admin',
    name: '管理员'
  },
  'employees-token': {
    permission: [3],
    introduction: 'I am an employees',
    name: '普通员工'
  }
}

const tokens = {
  superadmin: {
    token: 'superadmin-token'
  },
  admin: {
    token: 'admin-token'
  },
  employees: {
    token: 'employees-token'
  }
}
interface keyType {
  [key: string]: any
}
interface returnType {
  errno?: string
  msg?: string
  data: keyType
}

function fhcode(data: keyType, errno?: string, msg?: string): returnType {
  return {
    errno: errno || '0',
    msg: msg || '操作成功！',
    data: data || {}
  }
}

export default [
  {
    url: '/user/login',
    method: 'post',
    response: (body: keyType): returnType => {
      console.log('body>>>>>>>>', body)
      const { username } = body.body
      const data = (<keyType>tokens)[username]
      return fhcode(data)
    }
  },
  {
    url: '/user/info',
    method: 'post',
    response: (body: keyType): returnType => {
      console.log('body>>>>>>>>', body)
      const { token } = body.body
      const data = (<keyType>users)[token]
      return fhcode(data)
    }
  }
]
