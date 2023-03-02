import axios from 'axios'
import { parseEther } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { FiExternalLink } from 'react-icons/fi'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import {
  useNetwork,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'

function DonateModal() {
  const navigate = useNavigate()
  const location = useLocation()
  const { chain } = useNetwork()
  const [amount, setAmount] = useState(0)
  const [debouncedAmount] = useDebounce(amount.toString(), 500)
  // const balance = useBalance({ address: session?.address })

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
        await axios.post(
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
      }
      donation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.hash, isSuccess])

  async function handleDonate() {
    sendTransaction?.()
    // if (balance.data) {
    //   if (parseFloat(balance.data.formatted) >= amount) {

    //   }
    // }
  }

  if (!location.state) return <Navigate to="/user/campaigns" state={{}} />

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
        {isSuccess ? (
          <div className="flex flex-col gap-4">
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
          </div>
        ) : (
          <div>
            <h3 className="normal-case">
              You are about to help {campaignInfo.title}
            </h3>
            <input
              type="number"
              value={amount === 0 ? undefined : amount}
              max="0.4"
              step="0.001"
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="my-2 w-full rounded-md bg-gray-100 px-3 py-4 text-xl"
              placeholder="0.04 MATIC"
            />
            <button
              type="button"
              onClick={handleDonate}
              className="self-end rounded-md bg-pink-600 px-2 py-2 text-sm text-white"
            >
              Donate
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DonateModal
