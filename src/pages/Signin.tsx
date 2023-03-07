import { useNavigate } from 'react-router-dom'
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { postRequestMessage, postVerify } from '../api/axios'
import logo from '../assets/logo.png'
import Heading from '../components/Heading'
import InfoBox from '../components/InfoBox'

function SignIn() {
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

    navigate('/user')
  }

  return (
    <div>
      <div className="h-13 flex flex-row items-center justify-between p-5  shadow-lg">
        <div className="flex flex-row items-center">
          <img alt="" src={logo} className="h-12 w-12 p-2 " />
          <h2>CryptoCares</h2>
        </div>

        <div className="flex flex-row items-center ">
          {/* <h3 >Web3 Authentication</h3> */}
          <button
            className="mb-2 rounded-full bg-sky-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            type="button"
            onClick={() => handleAuth()}
          >
            Sign In with Metamask
          </button>
        </div>
      </div>
      <Heading
        text="CryptoCares: A different approach to donations"
        headingStyle="bg-gradient-to-r from-yellow-300 to-sky-600 bg-clip-text p-4 text-center text-5xl font-bold text-transparent"
      />
      <div>
        <div className="flex flex-col items-center justify-center bg-sky-500 pt-5 pb-5">
          <h1 className="text-3xl text-yellow-300">The Misson</h1>
          <div className="flex w-full flex-row items-center justify-evenly">
            <img alt="" src={logo} />

            <p className="font-xl w-6/12 text-white">
              Our goal is to enable charities and NGOs to provide help and
              support to those in need. We aim to use blockchain technology to
              ensure secure and transparent transactions. Donate MATIC using our
              portal and help us spread the awareness and importance of
              donations using Cryptocurrency.
            </p>
            <img alt="" src={logo} />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-evenly">
        <InfoBox
          heading="What is Polygon?"
          text="Polygon is a “layer two” or “sidechain” scaling solution that runs alongside the Ethereum blockchain allowing for speedy transactions and low fees. MATIC is the network’s native cryptocurrency, which is used for fees, staking, and more. You can buy or sell MATIC via exchanges like Coinbase."
        />

        <InfoBox
          heading="What is MATIC?"
          text=" MATIC is Polygon's native cryptocurrency. It is an ERC-20 token, a token created on the Ethereum blockchain. This token is used to govern and secure the Polygon network and pay the network's transaction fees."
        />
      </div>
    </div>
  )
}

export default SignIn
