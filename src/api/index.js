import request from '@/utils/ajax'

// github api
export const getApi = () => {
  return request('', 'GET')
}

// 搜索 用户名
export const getSearchUser = params => {
  return request('/search/users', 'GET', params)
}

// 搜索 仓库名
export const getSearchRepo = params => {
  return request('/search/repositories', 'GET', params)
}

// 获取用户个人信息
export const getUserInfo = params => {
  return request(`/users/${params}`, 'GET')
}

// 获取repo列表
export const getUserRepo = params => {
  return request(`/users/${params}/repos`, 'GET')
}

// 获取followers列表
export const getUserFollowers= params => {
  return request(`/users/${params}/followers`, 'GET')
}

// 获取following列表
export const getUserFollowing= params => {
  return request(`/users/${params}/following`, 'GET')
}

// 获取gists列表
export const getUserGists= user => {
  return request(`/users/${user}/gists`, 'GET')
}

// 获取单个gist详情
export const getGistDetail= url => {
  return request(`${url}`, 'GET')
}

// // 登录github账号
// export const login= (username) => {
//   return request(`/users/${username}`, 'GET')
// }
