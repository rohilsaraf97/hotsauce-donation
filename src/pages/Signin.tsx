import { useNavigate } from 'react-router-dom'
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { postRequestMessage, postVerify } from '../api/axios'

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
      <h3>Web3 Authentication</h3>
      <button type="button" onClick={() => handleAuth()}>
        Authenticate via MetaMask
      </button>
    </div>
  )
}

export default SignIn
