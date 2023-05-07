import { getAllCampaigns, getAllDonations, getAllSubscriptions } from '../axios'
import getActivity from '../axios/donations/getActivity'

// eslint-disable-next-line import/prefer-default-export
export const getAllCampaignsQuery = () => ({
  queryKey: ['campaigns'],
  queryFn: getAllCampaigns,
  select: (data: any) => {
    const allCampaigns = data.data
    return allCampaigns
  },
})

export const getAllDonationsQuery = () => ({
  queryKey: ['donations'],
  queryFn: getAllDonations,
  select: (data: any) => {
    const allCampaigns = data.data
    return allCampaigns
  },
})

export const getAllSubscriptionsQuery = () => ({
  queryKey: ['subscripitons'],
  queryFn: getAllSubscriptions,
  select: (data: any) => {
    const allCampaigns = data.data
    return allCampaigns
  },
})

export const getActivityQuery = () => ({
  queryKey: ['activity'],
  queryFn: getActivity,
  select: (data: any) => {
    const allCampaigns = data.data
    return allCampaigns
  },
})
