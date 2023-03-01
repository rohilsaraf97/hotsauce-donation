import axios from 'axios'
import { parseEther } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'
import { Link, Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import {
  useBalance,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'

export default function User() {
  const session = useLoaderData()
  const navigate = useNavigate()

  const balance = useBalance({ address: session?.address })
  // const { chain } = useNetwork()
  const [amount] = useState(0)
  const [debouncedAmount] = useDebounce(amount.toString(), 500)

  const { config } = usePrepareSendTransaction({
    request: {
      to: '0x2A0e48522876DbD8B414E938cbE4e05FD6A23811',
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
        const resp = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/donation/add`,
          {
            amount,
            txHash: data?.hash,
            campaign_id: '63fbbe8ccc940a2a0d756ff6',
          },
          {
            withCredentials: true,
          }
        )
        console.log('resp of ad donarion', resp)
      }
      donation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.hash, isSuccess])

  // async function signOut() {
  //   await axios(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, {
  //     withCredentials: true,
  //   })

  //   navigate('/signin')
  // }

  // async function handleAddCampaign() {
  //   const resp = await axios.post(
  //     `${import.meta.env.VITE_SERVER_URL}/campaign/add`,
  //     {
  //       title: 'Save monkey poop 🙏',
  //       description: 'Monkey poop is super important omg',
  //     },
  //     {
  //       withCredentials: true,
  //     }
  //   )
  //   console.log('resp of ad', resp)
  // }

  // async function handleDonate() {
  //   if (balance.data) {
  //     if (parseFloat(balance.data.formatted) >= amount) {
  //       sendTransaction?.()
  //     }
  //   }
  // }

  return (
    <div className="flex flex-col font-poppins text-lg">
      <div className=" flex justify-between bg-pink-600 px-10 py-3 text-white">
        <div>Fund3</div>
        <div className="flex gap-4">
          <Link to="/user/campaigns">Campaigns</Link>
          <Link to="/user/campaigns">Campaigns</Link>
          <Link to="/user/campaigns">Campaigns</Link>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

// <h3>User session:</h3>
//       <pre>{JSON.stringify(session, null, 2)}</pre>
//       <button type="button" onClick={signOut}>
//         Sign out
//       </button>
//       <p className="text-xl text-blue-500">
//         Dev is very poor donate some money to dev
//       </p>
//       <input
//         type="number"
//         value={amount}
//         max="0.4"
//         step="0.001"
//         onChange={(e) => setAmount(parseFloat(e.target.value))}
//       />
//       <button type="button" onClick={handleDonate}>
//         Donate
//       </button>
//       <button type="button" onClick={handleAddCampaign}>
//         Add
//       </button>
//       {isSuccess && (
//         <div>
//           Successfully sent {amount} {chain?.nativeCurrency.symbol} to
//           0x2A0e48522876DbD8B414E938cbE4e05FD6A23811
//           <div>
//             <a
//               className="text-xl text-blue-500 underline"
//               href={`${chain?.blockExplorers?.default.url}/tx/${data?.hash}`}
//             >
//               Mumbai polygon scan
//             </a>
//           </div>
//         </div>
//       )}
