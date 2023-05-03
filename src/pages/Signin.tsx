import Cards from '../components/SignIn/Cards'
import Hero from '../components/SignIn/Hero'
import Metamask from '../components/SignIn/Metamask'
import Navbar from '../components/SignIn/Navbar'
import Network from '../components/SignIn/Network'

function SignIn() {
  return (
    <>
      <Navbar />
      <Hero />
      <Cards />
      <Network />
      <Metamask />
    </>
  )
}

export default SignIn
