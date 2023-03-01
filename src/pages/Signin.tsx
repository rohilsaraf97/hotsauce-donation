import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function SignIn() {
  const navigate = useNavigate()

  const { connectAsync } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const { isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const handleAuth = async () => {
    // disconnects the web3 provider if it's already active
    if (isConnected) {
      await disconnectAsync()
    }
    // enabling the web3 provider metamask
    const { account, chain } = await connectAsync({
      connector: new InjectedConnector(),
    })

    const userData = { address: account, chain: chain.id, network: 'evm' }
    // making a post request to our 'request-message' endpoint
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/auth/request-message`,
      userData,
      {
        withCredentials: true,
        headers: {
          'content-type': 'application/json',
        },
      }
    )
    const { message } = data
    // signing the received message via metamask
    const signature = await signMessageAsync({ message })

    await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/auth/verify`,
      {
        message,
        signature,
      },
      { withCredentials: true } // set cookie from Express server
    )

    // redirect to /user
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
