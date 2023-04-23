import instance from '../../instance'

const getAllSubscriptions = async () => {
  const resp = await instance.get('/subscription')
  return resp
}

export default getAllSubscriptions
