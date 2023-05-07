import { QueryClient, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link, Outlet, useLoaderData, useLocation } from 'react-router-dom'

import { checkAuth } from '../api/axios'
import { getAllCampaignsQuery } from '../api/tanstack'
import config from '../config'

export const campaignLoader = (queryClient: QueryClient) => async () => {
  const query = getAllCampaignsQuery()
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}

function Campaign() {
  const location = useLocation()
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof campaignLoader>>
  >
  const campaignsQueryResult = useQuery({
    ...getAllCampaignsQuery(),
    initialData,
  })

  const [selectedAddress, setSelectedAddress] = useState('')

  useEffect(() => {
    const getAddress = async () => {
      const resp = await checkAuth()
      const { iat, ...authData } = resp.data
      const session = authData
      setSelectedAddress(session.address)
    }
    getAddress()
  }, [])

  let content

  if (campaignsQueryResult.isLoading) content = <div>Loading</div>
  else if (campaignsQueryResult.isSuccess)
    content = (
      <div className="flex w-[100%] flex-col gap-6">
        {campaignsQueryResult.data.reverse().map((cpn: any) => {
          return (
            <div // eslint-disable-next-line no-underscore-dangle
              key={cpn._id}
              className="flex justify-center"
            >
              <div className="flex w-full flex-col rounded-lg border border-gray-300 bg-gray-50 shadow-lg lg:flex-row">
                <img
                  className="object-fit h-[15rem] w-full rounded-t-lg lg:h-[12rem] lg:w-[12rem] lg:rounded-none lg:rounded-l-lg"
                  src={`${config.SERVER_URL}/images/${cpn.thumbnailId}`}
                  alt=""
                />
                <div className="flex w-full flex-col justify-start p-6">
                  <div className="flex flex-col justify-between lg:flex-row">
                    <h5 className="mb-2 text-xl font-medium text-neutral-800">
                      {cpn.title}
                    </h5>
                    <h5 className='"mb-2 text-xl font-medium text-neutral-800'>
                      By {cpn.owner.address}
                    </h5>
                  </div>
                  <p className="mb-4 text-base text-neutral-600">
                    {cpn.description}
                  </p>
                  {cpn.owner.address.toUpperCase() !==
                    selectedAddress.toUpperCase() && (
                    <div className="flex gap-4 ">
                      <Link
                        to="donatemodal"
                        state={{ background: location, cpnData: cpn }}
                        className="rounded-md bg-yellow-600 px-2 py-2 text-center text-sm text-white"
                      >
                        Donate
                      </Link>
                      <Link
                        to="subscribemodal"
                        state={{ background: location, cpnData: cpn }}
                        className="rounded-md bg-yellow-600 px-2 py-2 text-center text-sm text-white"
                      >
                        Subscribe
                      </Link>
                    </div>
                  )}
                  {cpn.owner.address.toUpperCase() ===
                    selectedAddress.toUpperCase() && (
                    <div>
                      <Link
                        to="update"
                        state={{ background: location, cpnData: cpn }}
                        className="mb-2 mr-2 rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                      >
                        Edit
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  return (
    <>
      <div className="mx-4 my-8 flex flex-col gap-8 lg:mx-[7rem]">
        <span className="text-3xl font-extrabold">Campaigns</span>
        {content}
      </div>
      <Outlet />
    </>
  )
}

export default Campaign
