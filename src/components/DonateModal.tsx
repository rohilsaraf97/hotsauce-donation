import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { parseEther } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { FiExternalLink } from 'react-icons/fi'
import {
  Navigate,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import {
  useBalance,
  useNetwork,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'

import Conf from './Confetti'

const loadingTextArray = [
  'Processing your transaction',
  'Your donation will help many lives',
  'Minting your NFTs',
  'You are making the world a better place!',
]

function DonateModal() {
  const queryClient = useQueryClient()
  const session: any = useLoaderData()
  const navigate = useNavigate()
  const location = useLocation()
  const { chain } = useNetwork()
  const [amount, setAmount] = useState<number>(0.001)

  const [nftLoading, setNftLoading] = useState<boolean>(false)
  const [loadingText, setLoadingText] = useState<string>('Loading')
  const [donationData, setDonationData] = useState<any>({})

  const [debouncedAmount] = useDebounce(amount.toString(), 500)
  const balance = useBalance({ address: session?.address })

  const campaignInfo = location?.state?.cpnData || undefined

  const { config } = usePrepareSendTransaction({
    request: {
      to: campaignInfo ? campaignInfo.owner.address : undefined,
      value: debouncedAmount ? parseEther(debouncedAmount) : undefined,
    },
  })
  const { data, sendTransaction } = useSendTransaction(config)
  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  useEffect(() => {
    if (isSuccess) {
      const donation = async () => {
        setNftLoading(true)
        const resp = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/donation/add`,
          {
            amount,
            txHash: data?.hash,
            // eslint-disable-next-line no-underscore-dangle
            campaign_id: campaignInfo._id,
          },
          {
            withCredentials: true,
          }
        )
        setDonationData(resp.data)
        setNftLoading(false)
        queryClient.invalidateQueries({ queryKey: ['donations'] })
      }
      donation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.hash, isSuccess])

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
  }, [isSuccess, nftLoading])

  async function handleDonate() {
    if (balance.data) {
      if (parseFloat(balance.data!.formatted) >= amount) {
        setNftLoading(true)
        sendTransaction?.()
      }
    }
  }

  if (!location.state) return <Navigate to="/user/campaigns" state={{}} />

  let content
  if (!isSuccess && !nftLoading)
    content = (
      <div>
        <h3 className="normal-case">
          You are about to help {campaignInfo.title}
        </h3>
        <input
          type="number"
          value={amount === 0 ? undefined : amount}
          min="0.001"
          max={balance.data ? balance.data!.formatted : 1}
          step="0.001"
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="my-2 w-full rounded-md bg-gray-100 px-3 py-4 text-xl"
          placeholder="0.04 MATIC"
        />
        <button
          type="button"
          onClick={handleDonate}
          className="self-end rounded-md bg-yellow-600 px-2 py-2 text-sm text-white disabled:opacity-40"
          disabled={
            balance.data ? amount > parseFloat(balance.data!.formatted) : true
          }
        >
          Donate
        </button>
      </div>
    )
  else if (!isSuccess)
    content = (
      <div className="flex flex-col items-center justify-center gap-3">
        <svg
          className="m-3 h-10 w-10 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent"
          viewBox="0 0 24 24"
        />
        <span>{loadingText}</span>
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
  else
    content = (
      <div className="flex flex-col gap-4">
        <Conf />
        <span className="flex items-center gap-4 text-xl">
          <AiFillCheckCircle className="text-4xl text-green-700" />
          Transaction Successful
        </span>
        <span>
          Successfully sent {amount} {chain?.nativeCurrency.symbol} to{' '}
          {campaignInfo.owner.address.slice(0, 8)}...
          {campaignInfo.owner.address.slice(-6)} 💜💜💜💜
        </span>
        <span className="flex gap-4">
          See your Transaction here!
          <a
            className="text-xl text-blue-500 underline"
            href={`${chain?.blockExplorers?.default.url}/tx/${data?.hash}`}
            target="_blank"
            rel="noreferrer"
          >
            <span className="flex items-center gap-2">
              {data?.hash.slice(0, 20)}...
              {data?.hash.slice(-6)}
              <FiExternalLink />
            </span>
          </a>
        </span>
        <span className="flex gap-4">
          See your Minted NFT here!
          <a
            className="text-xl text-blue-500 underline"
            href={`${chain?.blockExplorers?.default.url}/tx/${donationData.NFTtxHash}`}
            target="_blank"
            rel="noreferrer"
          >
            <span className="flex items-center gap-2">
              {donationData.NFTtxHash
                ? `${donationData?.NFTtxHash.slice(
                    0,
                    20
                  )}...${donationData?.NFTtxHash.slice(-6)}`
                : ''}
              <FiExternalLink />
            </span>
          </a>
        </span>
        <span className="flex gap-4">
          See NFT Metadata on IPFS!
          <a
            className="text-xl text-blue-500 underline"
            href={donationData.tokenURI}
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

export default DonateModal
