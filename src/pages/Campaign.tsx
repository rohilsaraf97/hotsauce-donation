import { QueryClient, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link, Outlet, useLoaderData, useLocation } from 'react-router-dom'

import { checkAuth } from '../api/axios'
import { getAllCampaignsQuery } from '../api/tanstack'

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
  console.log(campaignsQueryResult.data)

  if (campaignsQueryResult.isLoading) content = <div>Loading</div>
  else if (campaignsQueryResult.isSuccess)
    content = (
      <div className="mx-auto my-10 flex w-[80%] flex-col gap-6">
        {campaignsQueryResult.data.reverse().map((cpn: any) => {
          console.log(
            'asdfg',
            cpn.owner.address.toUpperCase(),
            selectedAddress.toUpperCase()
          )
          return (
            <div // eslint-disable-next-line no-underscore-dangle
              key={cpn._id}
              className="flex justify-center"
            >
              <div className="flex w-full flex-col rounded-lg bg-white shadow-lg dark:bg-neutral-700  md:flex-row">
                <img
                  className="h-60 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src="https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"
                  alt=""
                />
                <div className="flex w-full flex-col justify-start p-6">
                  <div className="flex flex-row justify-between">
                    <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                      {cpn.title}
                    </h5>
                    <h5 className='"mb-2 dark:text-neutral-50" pl-1 text-xl font-medium text-neutral-800'>
                      By {cpn.owner.address}
                    </h5>
                  </div>
                  <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    {cpn.description}
                  </p>
                  {cpn.owner.address.toUpperCase() !==
                    selectedAddress.toUpperCase() && (
                    <div className="flex gap-4 ">
                      <Link
                        to="donatemodal"
                        state={{ background: location, cpnData: cpn }}
                        className="w-1/12 rounded-md bg-yellow-600 px-2 py-2 text-center text-sm text-white"
                      >
                        Donate
                      </Link>
                      <Link
                        to="subscribemodal"
                        state={{ background: location, cpnData: cpn }}
                        className="w-1/12 rounded-md bg-yellow-600 px-2 py-2 text-center text-sm text-white"
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
                        className="mr-2 mb-2 rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
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
      <Outlet />
      {content}
    </>
  )
}

export default Campaign
