/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Framework } from '@superfluid-finance/sdk-core'
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { ethers } from 'ethers'
import React, { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FiExternalLink } from 'react-icons/fi'
import { useLoaderData } from 'react-router-dom'

import { getAllSubscriptionsQuery } from '../api/tanstack'

export const subscriptionLoader = (queryClient: QueryClient) => async () => {
  const query = getAllSubscriptionsQuery()
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}

function Subscriptions() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof subscriptionLoader>>
  >
  const subscriptionsQueryResult = useQuery({
    ...getAllSubscriptionsQuery(),
    initialData,
  })

  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)

  async function updateExistingFlow(flowRate: string, recipient: string) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const chainId = await window.ethereum!.request({ method: 'eth_chainId' })
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider,
    })
    const superSigner = sf.createSigner({ signer })
    await superSigner.getAddress()
    const maticx = await sf.loadSuperToken('MATICx')
    try {
      const updateFlowOperation = maticx.updateFlow({
        sender: await superSigner.getAddress(),
        receiver: recipient,
        flowRate,
      })
      const result = await updateFlowOperation.exec(superSigner)
      console.log("Congrats - you've just updated a money stream!")
      return result
    } catch (error) {
      console.log('Error in update flow')
      console.error(error)
    }
    return false
  }

  async function deleteFlow(recipient: string) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const chainId = await window.ethereum!.request({ method: 'eth_chainId' })
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider,
    })
    const superSigner = sf.createSigner({ signer })
    const maticx = await sf.loadSuperToken('MATICx')
    try {
      const deleteFlowOperation = maticx.deleteFlow({
        sender: await signer.getAddress(),
        receiver: recipient,
      })
      await deleteFlowOperation.exec(superSigner)
      console.log(
        `Congrats - you've just deleted a money stream!
    `
      )
    } catch (error) {
      console.log('Error in Delete flow')
      console.error(error)
    }
  }

  const calculateFlowRate = (amountInEther: number) => {
    if (typeof Number(amountInEther) === 'number') {
      const monthlyAmount = ethers.utils.parseEther(amountInEther.toString())
      const calculatedFlowRate = Math.floor(monthlyAmount / 3600 / 24 / 30)
      return calculatedFlowRate.toString()
    }
    return '38580246913'
  }

  const getSubs = (selectedCampaign: any) => {
    let currentAmount
    if (subscriptionsQueryResult.isSuccess) {
      currentAmount = subscriptionsQueryResult.data?.reduce((acc, currVal) => {
        if (
          selectedCampaign.campaign.owner.address.toUpperCase() ===
          currVal.campaign.owner.address.toUpperCase()
        )
          return acc + 1
        return acc
      }, 0)
    }
    return currentAmount
  }

  const getAmount = (selectedCampaign: any) => {
    let currentAmount
    if (subscriptionsQueryResult.isSuccess) {
      currentAmount = subscriptionsQueryResult.data?.reduce((acc, currVal) => {
        if (
          selectedCampaign.campaign.owner.address.toUpperCase() ===
          currVal.campaign.owner.address.toUpperCase()
        )
          return acc + currVal.amount
        return acc
      }, 0)
    }
    return currentAmount
  }

  const handleDelete = async (cpnObj: any) => {
    setLoading(true)
    let txDetails
    const currentSubs = getSubs(cpnObj)
    const currentAmount = getAmount(cpnObj)
    try {
      if (currentSubs > 1) {
        const calculatedFlowRate = calculateFlowRate(
          currentAmount - cpnObj.amount
        )
        txDetails = await updateExistingFlow(
          calculatedFlowRate,
          cpnObj.campaign.owner.address
        )
      } else {
        txDetails = await deleteFlow(cpnObj.campaign.owner.address)
      }
      const resp = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/subscription/delete`,
        {
          data: cpnObj,
          withCredentials: true,
        }
      )
      setLoading(false)
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] })
    } catch (err) {
      console.log('error', err)
    }
  }

  let content

  if (subscriptionsQueryResult.isLoading) content = <div>Loading</div>
  else if (subscriptionsQueryResult.isSuccess)
    content = (
      <table className="w-full border-separate text-left text-sm">
        <thead className=" bg-gray-200 text-xs uppercase">
          <tr>
            <th scope="col" className="bg-yellow-400 px-6 py-3  ">
              Amount/month
            </th>
            <th scope="col" className="bg-yellow-400 px-6 py-3">
              To
            </th>
            <th scope="col" className="bg-yellow-400 px-6 py-3">
              Token URI
            </th>
            <th scope="col" className="bg-yellow-400 px-6 py-3">
              NFT Transaction
            </th>
            <th scope="col" className="bg-yellow-400 px-6 py-3">
              Donation Transaction
            </th>
            <th scope="col" className="bg-yellow-400 px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="h-2 overflow-hidden bg-yellow-100">
          {subscriptionsQueryResult?.data
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
                  <td className="text-center" onClick={() => handleDelete(obj)}>
                    {loading ? (
                      'deleteing'
                    ) : (
                      <AiFillCloseCircle className="cursor-pointer text-xl text-red-500 hover:scale-[1.15]" />
                    )}
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    )

  return (
    <div className="mx-[7rem] my-8 flex flex-col gap-8">
      <span className="text-3xl font-extrabold">Subscriptions</span>
      {content}
    </div>
  )
}

export default Subscriptions
