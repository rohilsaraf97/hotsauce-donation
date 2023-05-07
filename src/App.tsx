import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from 'react-router-dom'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { polygonMumbai, sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

import { checkAuth } from './api/axios'
import AddModal from './components/AddModal'
import DonateModal from './components/DonateModal'
import Home from './components/Home'
import SubscribeModal from './components/SubscribeModal'
import UpdateModal from './components/UpdateModal'
import Activity, { activityLoader } from './pages/Activity'
import Campaign, { campaignLoader } from './pages/Campaign'
import Donations, { donationLoader } from './pages/Donations'
import ErrorPage from './pages/ErrorPage'
import SignIn from './pages/Signin'
import Subscriptions, { subscriptionLoader } from './pages/Subscriptions'
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

const queryClient = new QueryClient()

const checkSignedIn = async (pathname?: string) => {
  let auth
  let session
  try {
    const resp = await checkAuth()
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
        loader: () => campaignLoader(queryClient),
        children: [
          {
            path: 'donatemodal',
            loader: () => checkSignedIn(),
            element: <DonateModal />,
          },
          {
            path: 'subscribemodal',
            loader: () => checkSignedIn(),
            element: <SubscribeModal />,
          },
          {
            path: 'add',
            element: <AddModal />,
          },
          { path: 'update', element: <UpdateModal /> },
        ],
      },
      {
        path: 'donations',
        element: <Donations />,
        loader: () => donationLoader(queryClient),
      },
      {
        path: 'subscriptions',
        element: <Subscriptions />,
        loader: () => subscriptionLoader(queryClient),
      },
      {
        path: 'activity',
        element: <Activity />,
        loader: () => activityLoader(queryClient),
      },
      {
        path: 'home',
        element: <Home />, // add home page component,
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
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={client}>
        <RouterProvider router={router} />
      </WagmiConfig>
    </QueryClientProvider>
  )
}

export default App
