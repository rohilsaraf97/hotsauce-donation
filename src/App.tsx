import axios from 'axios'
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from 'react-router-dom'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { polygonMumbai, sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

import DonateModal from './components/DonateModal'
import Campaign from './pages/Campaign'
import ErrorPage from './pages/ErrorPage'
import SignIn from './pages/Signin'
import User from './pages/User'

const { provider, webSocketProvider } = configureChains(
  [sepolia, polygonMumbai],
  [publicProvider()]
)

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
})

const checkSignedIn = async (pathname?: string) => {
  let auth
  let session
  try {
    const resp = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/auth/authenticate`,
      {
        withCredentials: true,
      }
    )
    const { iat, ...authData } = resp.data
    auth = true
    session = authData
  } catch (error) {
    auth = false
  }

  if (auth && pathname === 'signin') return redirect('/user')
  if (!auth && pathname === 'signin') return null
  if (!auth) return redirect('/signin')
  return session
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/signin" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/user',
    loader: () => checkSignedIn(),
    element: <User />,
    children: [
      {
        path: 'campaigns',
        element: <Campaign />,
        loader: async () => {
          try {
            const resp = await axios.get(
              `${import.meta.env.VITE_SERVER_URL}/campaign`,
              {
                withCredentials: true,
              }
            )
            return resp.data
          } catch (error) {
            console.log(error)
          }
          return null
        },
        children: [
          {
            path: 'donatemodal',
            element: <DonateModal />,
          },
        ],
      },
    ],
  },
  {
    path: '/signin',
    loader: () => checkSignedIn('signin'),
    element: <SignIn />,
  },
])

function App() {
  return (
    <WagmiConfig client={client}>
      <RouterProvider router={router} />
    </WagmiConfig>
  )
}

export default App
