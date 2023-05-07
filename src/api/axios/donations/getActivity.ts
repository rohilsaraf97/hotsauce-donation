import instance from '../../instance'

const getActivity = async () => {
  const resp = await instance.get('/donation/activity')
  return resp
}

export default getActivity
