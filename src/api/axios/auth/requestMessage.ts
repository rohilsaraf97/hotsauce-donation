import instance from '../../instance'

const postRequestMessage = async (userData: {
  address: `0x${string}`
  chain: number
  network: string
}) => {
  const resp = await instance.post(
    `${import.meta.env.VITE_SERVER_URL}/auth/request-message`,
    userData,
    {
      withCredentials: true,
      headers: {
        'content-type': 'application/json',
      },
    }
  )
  return resp
}

export default postRequestMessage
