import { QueryClient, useQuery } from '@tanstack/react-query'
import React from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { useLoaderData } from 'react-router-dom'

import { getAllDonationsQuery } from '../api/tanstack'

export const donationLoader = (queryClient: QueryClient) => async () => {
  const query = getAllDonationsQuery()
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}

function Donations() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof donationLoader>>
  >
  const donationsQueryResult = useQuery({
    ...getAllDonationsQuery(),
    initialData,
  })

  let content

  if (donationsQueryResult.isLoading) content = <div>Loading</div>
  else if (donationsQueryResult.isSuccess)
    content = (
      <table className="w-full border-separate text-left text-sm">
        <thead className=" bg-gray-200 text-xs uppercase">
          <tr>
            <th scope="col" className="bg-yellow-400 px-6 py-3  ">
              Amount
            </th>
            <th scope="col" className="bg-yellow-400 px-6 py-3">
              To
            </th>
            <th scope="col" className=" bg-yellow-400 px-6 py-3">
              Token URI
            </th>
            <th scope="col" className=" bg-yellow-400 px-6 py-3">
              NFT Transaction
            </th>
            <th scope="col" className="bg-yellow-400 px-6 py-3">
              Donation Transaction
            </th>
          </tr>
        </thead>
        <tbody className="h-2 overflow-hidden bg-yellow-100">
          {donationsQueryResult?.data
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
    )

  return (
    <div className="mx-[7rem] my-8 flex flex-col gap-8">
      <span className="text-3xl font-extrabold">Donations</span>
      {content}
    </div>
  )
}

export default Donations
