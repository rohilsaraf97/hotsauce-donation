import { useNavigate } from 'react-router-dom'
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { postRequestMessage, postVerify } from '../api/axios'
import logo from '../assets/logo.png'
import ElevatedCard from '../components/ElevatedCard'
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

    navigate('/user/home')
  }

  return (
    <div>
      <div className="h-13 sticky top-0 z-50 flex flex-row items-center justify-between bg-white p-5  shadow-xl">
        <div className="flex flex-row items-center">
          <img alt="" src={logo} className="h-12 w-12 p-2 " />
          <h2>CryptoCares</h2>
        </div>

        <div className="flex flex-row items-center ">
          {/* <h3 >Web3 Authentication</h3> */}
          <button
            className="ml-2 mb-2 rounded-full bg-sky-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            type="button"
            onClick={() => handleAuth()}
          >
            Sign In with MetaMask
          </button>

          <a href="https://metamask.io/" target="_blank" rel="noreferrer">
            <button
              className="ml-2 mb-2 rounded-full bg-sky-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              type="button"
            >
              Get Started with MetaMask
            </button>
          </a>
        </div>
      </div>
      <Heading
        text="CryptoCares: A different approach to donations"
        headingStyle="text-yellow-300 p-10 text-center text-5xl font-bold "
      />
      <div>
        <div className="flex flex-col items-center justify-center bg-sky-500 p-10">
          <h1 className="text-3xl text-yellow-300">The Misson</h1>
          <div className="flex w-full flex-row items-center justify-evenly">
            <img alt="" src={logo} />

            <p className="font-xl w-6/12  text-xl text-white">
              Our goal is to enable charities and NGOs to provide help and
              support to those in need. We aim to use blockchain technology to
              ensure secure and transparent transactions. Donate MATIC using our
              portal and help us spread the awareness and importance of
              donations using Cryptocurrency.
            </p>
            <img alt="" src={logo} />
          </div>
          <div className="mt-5 mb-5 flex w-full flex-row items-center justify-evenly ">
            <ElevatedCard
              heading="Secure"
              text="In blockchains,the data is structured into blocks and each block contains a transaction or bundle of transactions. Each new block connects to all the blocks before it in a cryptographic chain in such a way that it's nearly impossible to tamper with."
            />
            <ElevatedCard
              heading="Transparent"
              text="Transparency is arguably the blockchain's best quality. This is due to the fact that, in theory, the technology enables transactions that are traceable and immutable, allowing parties to trade in total confidence without the use of a middleman."
            />
            <ElevatedCard
              heading="Traceable"
              text="Users' retail networks can develop in a completely transparent and manageable way. Users can join, highlight, and track items or assets to make sure they are not applied incorrectly or sent back during the process, making it perfect for donations."
            />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-between bg-yellow-300 p-10">
        <InfoBox
          heading="What is Polygon?"
          text="Polygon is a “layer two” or “sidechain” scaling solution that runs alongside the Ethereum blockchain allowing for speedy transactions and low fees. MATIC is the network’s native cryptocurrency, which is used for fees, staking, and more. You can buy or sell MATIC via exchanges like Coinbase."
        />
        <InfoBox
          heading="What is MATIC?"
          text=" MATIC is Polygon's native cryptocurrency. It is an ERC-20 token, a token created on the Ethereum blockchain. This token is used to govern and secure the Polygon network and pay the network's transaction fees. MATIC has low transaction fees and extremely fast transactions per second."
        />
      </div>
      <div className="flex flex-col bg-sky-500 pt-5 pb-5">
        <Heading
          text="What is MetaMask?"
          headingStyle="text-yellow-300 p-10 text-left text-5xl font-bold "
        />

        <p className="font-xl w-6/12  w-full p-10 text-justify text-xl text-white">
          In essence, the Metamask wallet is a cryptocurrency wallet that
          supports ETH-based tokens such the ERC-721 and ERC-20 tokens. It may
          be installed just like any other browser extension because it is
          available as a plugin for your browser. Curiously, after installing
          the Metamask Chrome extension or Firefox extension, you can experience
          a seamless connection to any Ethereum-based decentralized app. With
          the wallet, you may quickly access any decentralized application, such
          as yield farming protocols and NFT marketplaces.
        </p>
        <p className="font-xl w-6/12  w-full p-10 text-justify text-xl text-white">
          You can use MetaMask conveniently thanks to the option of web browser
          integration in the form of plugins. This is likely one of the main
          causes of its swiftly rising adoption rates. MetaMask can act as a
          portal for you into a new world of exciting potential with dApps, web
          browsing, DeFi, and blockchain technology as the need for a
          decentralized web starts to pick up steam.
        </p>
      </div>
    </div>
  )
}

export default SignIn
