import React from 'react'

import logo from '../../assets/logo.png'
import Heading from './Heading'

function Hero() {
  return (
    <div className="mx-[7rem] flex flex-row items-center justify-center py-[6rem]">
      <div className="flex flex-1 flex-col items-start gap-8">
        <Heading
          text="A different approach to donations"
          headingStyle="text-black text-6xl font-bold"
        />
        <p className="font-xl text-justify text-xl text-black">
          Our goal is to enable charities and NGOs to provide help and support
          to those in need. We aim to use blockchain technology to ensure secure
          and transparent transactions. Donate MATIC using our portal and help
          us spread the awareness and importance of donations using
          Cryptocurrency.
        </p>
      </div>
      <div>
        <div className="flex flex-1 flex-col items-center justify-center p-10">
          <img width={300} height={300} alt="" src={logo} />
        </div>
      </div>
    </div>
  )
}

export default Hero
