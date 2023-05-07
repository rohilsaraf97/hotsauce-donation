/* eslint-disable jsx-a11y/control-has-associated-label */
import { QueryClient, useQuery } from '@tanstack/react-query'
import React from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { useLoaderData } from 'react-router-dom'

import { getActivityQuery } from '../api/tanstack'

export const activityLoader = (queryClient: QueryClient) => async () => {
  const query = getActivityQuery()
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}

function Activity() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof activityLoader>>
  >
  const activityQueryResult = useQuery({
    ...getActivityQuery(),
    initialData,
  })

  let content

  if (activityQueryResult.isLoading) content = <div>Loading</div>
  else if (
    activityQueryResult.isSuccess &&
    activityQueryResult.data.donations.length === 0 &&
    activityQueryResult.data.subscriptions.length === 0
  )
    content = (
      <div className="w-full rounded-md bg-yellow-500/50 px-16 py-8 text-center text-4xl font-extrabold">
        No activity on your campaigns yet! Tune in later!
      </div>
    )
  else if (activityQueryResult.isSuccess)
    content = (
      <>
        <span className="font bold text-2xl">Donations</span>
        <table className="w-full text-left text-sm">
          <thead className=" bg-gray-200 text-xs uppercase">
            <tr>
              <th scope="col" className=" px-6 py-3  ">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                To
              </th>
              <th scope="col" className="px-6 py-3">
                By
              </th>
              <th scope="col" className="px-6 py-3">
                Token URI
              </th>
              <th scope="col" className="px-6 py-3">
                NFT Transaction
              </th>
              <th scope="col" className="px-6 py-3">
                Donation Transaction
              </th>
            </tr>
          </thead>
          <tbody className="h-2 overflow-hidden bg-yellow-100">
            {activityQueryResult?.data.donations
              .reverse()
              .map((obj: any, index: number) => {
                return (
                  <tr
                    className="text-md border-b border-yellow-400 font-bold text-black "
                    // eslint-disable-next-line no-underscore-dangle
                    key={obj._id}
                  >
                    <td
                      // eslint-disable-next-line jsx-a11y/scope
                      className="px-6 py-4"
                    >
                      {obj.amount}
                    </td>
                    <td className="px-6 py-4">{obj.campaign.title}</td>
                    <td className="px-6 py-4">
                      {obj.donor.address.substring(0, 20)}...
                    </td>

                    <td className="px-6 py-4">
                      <a
                        className="text-md text-blue-500 underline"
                        href={obj.tokenURI}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="flex items-center gap-2">
                          JSON
                          <FiExternalLink />
                        </span>
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        className="text-md text-blue-500 underline"
                        href={`https://mumbai.polygonscan.com/tx/${obj.txHash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="flex items-center gap-2">
                          {obj.txHash ? obj.txHash.slice(0, 10) : ''}...
                          <FiExternalLink />
                        </span>
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        className="text-md text-blue-500 underline"
                        href={`https://mumbai.polygonscan.com/tx/${obj.NFTtxHash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="flex items-center gap-2">
                          {obj.NFTtxHash ? obj.NFTtxHash.slice(0, 10) : ''}...
                          <FiExternalLink />
                        </span>
                      </a>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
        <span className="font bold text-2xl">Subscriptions</span>
        <table className="w-full text-left text-sm">
          <thead className=" bg-gray-200 text-xs uppercase">
            <tr>
              <th scope="col" className=" px-6 py-3  ">
                Amount/month
              </th>
              <th scope="col" className="px-6 py-3">
                To
              </th>
              <th scope="col" className="px-6 py-3">
                By
              </th>
              <th scope="col" className="px-6 py-3">
                Token URI
              </th>
              <th scope="col" className="px-6 py-3">
                NFT Transaction
              </th>
              <th scope="col" className="px-6 py-3">
                Donation Transaction
              </th>
            </tr>
          </thead>
          <tbody className="h-2 overflow-hidden bg-yellow-100">
            {activityQueryResult?.data.subscriptions
              .reverse()
              .map((obj: any, index: number) => {
                return (
                  <tr
                    className="text-md border-b border-yellow-400 font-bold text-black "
                    // eslint-disable-next-line no-underscore-dangle
                    key={obj._id}
                  >
                    <td
                      // eslint-disable-next-line jsx-a11y/scope
                      className="px-6 py-4"
                    >
                      {obj.amount}
                    </td>
                    <td className="px-6 py-4">{obj.campaign.title}</td>
                    <td className="px-6 py-4">
                      {obj.donor.address.substring(0, 20)}...
                    </td>
                    <td className="px-6 py-4">
                      <a
                        className="text-md text-blue-500 underline"
                        href={obj.tokenURI}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="flex items-center gap-2">
                          JSON
                          <FiExternalLink />
                        </span>
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        className="text-md text-blue-500 underline"
                        href={`https://mumbai.polygonscan.com/tx/${obj.txHash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="flex items-center gap-2">
                          {obj.txHash ? obj.txHash.slice(0, 10) : ''}...
                          <FiExternalLink />
                        </span>
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        className="text-md text-blue-500 underline"
                        href={`https://mumbai.polygonscan.com/tx/${obj.NFTtxHash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="flex items-center gap-2">
                          {obj.NFTtxHash ? obj.NFTtxHash.slice(0, 10) : ''}...
                          <FiExternalLink />
                        </span>
                      </a>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </>
    )

  return (
    <div className="mx-[7rem] my-8 flex flex-col gap-8">
      <span className="text-3xl font-extrabold">Activity</span>
      {content}
    </div>
  )
}

export default Activity
