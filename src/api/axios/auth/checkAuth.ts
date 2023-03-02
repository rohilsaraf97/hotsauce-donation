import instance from '../../instance'

const checkAuth = async () => {
  const resp = await instance.get('/auth/authenticate')
  return resp
}

export default checkAuth
