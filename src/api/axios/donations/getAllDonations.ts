import instance from '../../instance'

const getAllDonations = async () => {
  const resp = await instance.get('/donation')
  return resp
}

export default getAllDonations
