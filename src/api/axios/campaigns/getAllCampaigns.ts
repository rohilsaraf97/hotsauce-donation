import instance from '../../instance'

const getAllCampaigns = async () => {
  const resp = await instance.get('/campaign')
  return resp
}

export default getAllCampaigns
