import instance from '../../instance'

const postVerify = async ({
  message,
  signature,
}: {
  message: any
  signature: `0x${string}`
}) => {
  const resp = await instance.post(
    `${import.meta.env.VITE_SERVER_URL}/auth/verify`,
    {
      message,
      signature,
    },
    { withCredentials: true } // set cookie from Express server
  )

  return resp
}

export default postVerify
