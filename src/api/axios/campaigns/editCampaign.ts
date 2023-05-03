import instance from '../../instance'

const editCampaign = async (campaignDetails: {
  title: string
  description: string
  image: any
  campaignId: string
}) => {
  const resp = await instance.put('/campaign/edit', campaignDetails, {
    headers: { 'content-type': 'multipart/form-data' },
  })
  return resp
}

export default editCampaign
