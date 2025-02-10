import request from '../utils/request';

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  };
  return request({
    url: '/login',
    headers: {
      isToken: false,
      repeatSubmit: false
    },
    method: 'post',
    data: data
  });
}

// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  });
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  });
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  });
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  });
}
// 忘记密码
export function forgotPassword(data) {
  return request({
    url: '/forgotPassword',
    method: 'post',
    data:data
  });
}
// 重置密码
export function resetPassword(data) {
  return request({
    url: '/resetPasswordByUrl',
    method: 'post',
    data:data
  });
}


// 绑定账号
export function authBinding(source) {
  return request({
    url: '/system/auth/binding/' + source,
    method: 'get'
  });
}

// 解绑账号
export function authUnlock(authId) {
  return request({
    url: '/system/auth/unlock/' + authId,
    method: 'delete'
  });
}
// 第三方平台登录
export function socialLogin(source, code, state) {
  const data = {
    code,
    state
  };
  return request({
    url: '/system/auth/socialLogin/' + source,
    method: 'get',
    params: data
  });
}
// 第三方平台授权绑定
export function socialLock(data) {
  return request({
    url: '/system/auth/socialLock',
    method: 'post',
    data: data
  });
}
// 第三方平台注册补全信息
export function socialRegister(data) {
  return request({
    url: '/system/auth/socialRegister',
    method: 'post',
    data: data
  });
}