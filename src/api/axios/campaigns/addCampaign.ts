import instance from '../../instance'

const addCampaign = async (campaignDetails: {
  title: string
  description: string
}) => {
  const resp = await instance.post('/campaign/add', campaignDetails)
  return resp
}

export default addCampaign
