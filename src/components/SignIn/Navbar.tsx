import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { postRequestMessage, postVerify } from '../../api/axios'
import logo from '../../assets/logo.png'

function Navbar() {
  const navigate = useNavigate()

  const { connectAsync } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const { isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync()
    }
    // enabling the web3 provider metamask
    const { account, chain } = await connectAsync({
      connector: new InjectedConnector(),
    })

    const userData = { address: account, chain: chain.id, network: 'evm' }
    // making a post request to our 'request-message' endpoint
    // signing the received message via metamask
    const { data } = await postRequestMessage(userData)
    const { message } = data
    const signature = await signMessageAsync({ message })
    await postVerify({ message, signature })
    navigate('/user/home')
  }
  return (
    <div className="sticky top-0 z-50 flex flex-row items-center justify-between bg-white/20 px-[7rem] py-4 backdrop-blur-lg">
      <div className="flex flex-row items-center">
        <img alt="" src={logo} className="h-[3rem] p-2" />
        <h2>CryptoCares</h2>
      </div>

      <div className="flex flex-row items-center ">
        {/* <h3 >Web3 Authentication</h3> */}
        <button
          className="mb-2 ml-2 rounded bg-yellow-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300"
          type="button"
          onClick={() => handleAuth()}
        >
          Sign In with MetaMask
        </button>

        <a href="https://metamask.io/" target="_blank" rel="noreferrer">
          <button
            className="mb-2 ml-2 rounded bg-yellow-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300"
            type="button"
          >
            Get Started with MetaMask
          </button>
        </a>
      </div>
    </div>
  )
}

export default Navbar