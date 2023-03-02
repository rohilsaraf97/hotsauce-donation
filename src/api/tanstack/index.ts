import { getAllCampaigns } from '../axios'

// eslint-disable-next-line import/prefer-default-export
export const getAllCampaignsQuery = () => ({
  queryKey: ['campaigns'],
  queryFn: getAllCampaigns,
  select: (data: any) => {
    const allCampaigns = data.data
    return allCampaigns
  },
})
