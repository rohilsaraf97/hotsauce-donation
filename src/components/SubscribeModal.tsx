import { Framework } from '@superfluid-finance/sdk-core'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { FiExternalLink } from 'react-icons/fi'
import {
  Navigate,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { useBalance, useNetwork } from 'wagmi'

import { getAllSubscriptionsQuery } from '../api/tanstack'
import Conf from './Confetti'

const loadingTextArray = [
  'Processing your subscription',
  'Your subscription will help many lives',
  'Minting your NFTs',
  'You are making the world a better place!',
  'Automating your monthly donations...',
]

function SubscribeModal() {
  const queryClient = useQueryClient()
  const session: any = useLoaderData()
  const navigate = useNavigate()
  const location = useLocation()
  const [amount, setAmount] = useState<number>(0.001)
  const balance = useBalance({ address: session?.address })
  const { chain } = useNetwork()
  const subscriptionsQueryResult = useQuery(getAllSubscriptionsQuery())

  const campaignInfo = location?.state?.cpnData || undefined

  const [nftLoading, setNftLoading] = useState<boolean>(false)
  const [loadingText, setLoadingText] = useState<string>('Loading')
  const [subscriptionData, setSubscriptionData] = useState<any>()

  let currentAmount: number

  if (subscriptionsQueryResult.isSuccess) {
    currentAmount = subscriptionsQueryResult.data?.reduce((acc, currVal) => {
      if (
        campaignInfo.owner.address.toUpperCase() ===
        currVal.campaign.owner.address.toUpperCase()
      )
        return acc + currVal.amount
      return acc
    }, 0)
  }

  const upgradeTokens = async (amt: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const chainId = await window.ethereum!.request({ method: 'eth_chainId' })
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider,
    })
    const superSigner = sf.createSigner({ signer })
    console.log(await superSigner.getAddress())
    const maticx = await sf.loadSuperToken('MATICx')

    try {
      const upgradeOperation = maticx.upgrade({
        amount: amt,
      })
      await upgradeOperation.exec(signer)
      console.log(
        `Congrats - you've just upgraded your tokens to an Index!
         Network: Mumbai
         Super Token: MATICx
         Amount: ${amt}
      `
      )
    } catch (error) {
      console.log('Error in conversion')
      console.log(error)
    }
  }

  const createNewFlow = async (flowRate: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum!)
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
      const createFlowOperation = maticx.createFlow({
        sender: await superSigner.getAddress(),
        receiver: campaignInfo ? campaignInfo.owner.address : undefined,
        flowRate,
      })
      const result = await createFlowOperation.exec(superSigner)
      console.log("Congrats - you've just created a money stream!")
      return result
    } catch (error) {
      console.log('Error in flow')
      console.error(error)
    }
    return false
  }

  async function updateExistingFlow(flowRate: string) {
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
        receiver: campaignInfo ? campaignInfo.owner.address : undefined,
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

  const calculateFlowRate = (amountInEther: number) => {
    if (typeof Number(amountInEther) === 'number') {
      const monthlyAmount = ethers.utils.parseEther(amountInEther.toString())
      const calculatedFlowRate = Math.floor(monthlyAmount / 3600 / 24 / 30)
      return calculatedFlowRate.toString()
    }
    return '38580246913'
  }

  useEffect(() => {
    let timer: any
    if (nftLoading) {
      timer = setInterval(
        () =>
          setLoadingText(
            loadingTextArray[
              Math.floor(Math.random() * loadingTextArray.length)
            ]
          ),
        2000
      )
    }
    return () => clearInterval(timer)
  }, [subscriptionData, nftLoading])

  const handleSubscribe = async () => {
    setNftLoading(true)
    const totalAmount = amount * 3
    const amountInWei = ethers.utils
      .parseEther(totalAmount.toString())
      .toString()
    if (parseFloat(balance.data!.formatted) >= amount) {
      await upgradeTokens(amountInWei)
      let txDetails
      if (currentAmount > 0) {
        const calculatedFlowRate = calculateFlowRate(amount + currentAmount)
        txDetails = await updateExistingFlow(calculatedFlowRate)
      } else {
        const calculatedFlowRate = calculateFlowRate(amount)
        txDetails = await createNewFlow(calculatedFlowRate)
      }
      if (txDetails) {
        const resp = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/subscription/add`,
          {
            amount,
            txHash: txDetails?.hash,
            // eslint-disable-next-line no-underscore-dangle
            campaign_id: campaignInfo._id,
            months: 3,
          },
          {
            withCredentials: true,
          }
        )
        setSubscriptionData(resp.data)
        setNftLoading(false)
        queryClient.invalidateQueries({ queryKey: ['subscriptions'] })
      }
    }
  }

  if (!location.state) return <Navigate to="/user/campaigns" state={{}} />

  let content

  if (!nftLoading && !subscriptionData)
    content = (
      <div>
        <h3 className="normal-case">
          You are about to Subscribe to a donation to {campaignInfo.title}
        </h3>
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={amount === 0 ? undefined : amount}
            min="0.001"
            max={balance.data ? balance.data!.formatted : 1}
            step="0.001"
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="my-2 w-full rounded-md bg-gray-100 px-3 py-4 text-xl"
            placeholder="0.04 MATIC"
            name="amount"
          />
          <span className="font-bold italic text-purple-500">MATIC/month</span>
        </div>

        <button
          type="button"
          onClick={handleSubscribe}
          className="self-end rounded-md bg-yellow-600 px-2 py-2 text-sm text-white disabled:opacity-40"
          disabled={
            balance.data ? amount > parseFloat(balance.data!.formatted) : true
          }
        >
          Subscribe
        </button>
      </div>
    )
  else if (!nftLoading && subscriptionData)
    content = (
      <div className="flex flex-col gap-4">
        <Conf />
        <span className="flex items-center gap-4 text-xl">
          <AiFillCheckCircle className="text-4xl text-green-700" />
          Transaction Successful
        </span>
        <span>
          Successfully subscribed with {amount}
          {chain?.nativeCurrency.symbol}/month to{' '}
          {campaignInfo.owner.address.slice(0, 8)}...
          {campaignInfo.owner.address.slice(-6)} 💜💜💜💜
        </span>
        <span className="flex gap-4">
          See your Transaction here!
          <a
            className="text-xl text-blue-500 underline"
            href={`${chain?.blockExplorers?.default.url}/tx/${subscriptionData?.txHash}`}
            target="_blank"
            rel="noreferrer"
          >
            <span className="flex items-center gap-2">
              {subscriptionData?.txHash.slice(0, 20)}...
              {subscriptionData?.txHash.slice(-6)}
              <FiExternalLink />
            </span>
          </a>
        </span>
        <span className="flex gap-4">
          See your Minted NFT here!
          <a
            className="text-xl text-blue-500 underline"
            href={`${chain?.blockExplorers?.default.url}/tx/${subscriptionData.NFTtxHash}`}
            target="_blank"
            rel="noreferrer"
          >
            <span className="flex items-center gap-2">
              {subscriptionData.NFTtxHash
                ? `${subscriptionData?.NFTtxHash.slice(
                    0,
                    20
                  )}...${subscriptionData?.NFTtxHash.slice(-6)}`
                : ''}
              <FiExternalLink />
            </span>
          </a>
        </span>
        <span className="flex gap-4">
          See NFT Metadata on IPFS!
          <a
            className="text-xl text-blue-500 underline"
            href={subscriptionData.tokenURI}
            target="_blank"
            rel="noreferrer"
          >
            <span className="flex items-center gap-2">
              NFT JSON
              <FiExternalLink />
            </span>
          </a>
        </span>
      </div>
    )
  else if (nftLoading)
    content = (
      <div className="flex flex-col items-center justify-center gap-3">
        <svg
          className="m-3 h-10 w-10 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent"
          viewBox="0 0 24 24"
        />
        <span>{loadingText}</span>
      </div>
    )
  return (
    <div
      className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-40"
      onClick={() => navigate('/user/campaigns', { state: {} })}
      aria-hidden="true"
    >
      <div
        className="w-[50%] rounded-lg bg-white p-5 shadow-md"
        onClick={(e) => {
          e.stopPropagation()
        }}
        aria-hidden="true"
      >
        {content}
      </div>
    </div>
  )
}

export default SubscribeModal
