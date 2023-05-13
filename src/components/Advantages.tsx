import React from 'react'

import logo from '../assets/logo.png'
import Heading from './SignIn/Heading'

function Advantages() {
  return (
    <div className="bg-gray-50 py-[6rem]">
      <div className="flex flex-col gap-4">
        <Heading
          text="Why use CryptoCares to donate?"
          headingStyle="text-black text-center pb-20 text-6xl font-bold "
        />
      </div>
      <div className="mx-[10rem] flex flex-col gap-8">
        <div className="flex items-center justify-center sm:flex-col md:flex-row">
          <div className="flex flex-col items-center justify-center">
            <img width={800} height={800} alt="" src={logo} />
          </div>

          <div className="mx-[5rem] flex flex-col">
            <p className="font-lg py-[2rem] text-xl text-black sm:w-full md:w-11/12 md:text-justify">
              Our platform uses the blockchain to track the flow of funds which
              paves the way for secure and transparent movement of funds. But in
              addition to this, we also mint NFTs for each successful
              transaction which you can keep as a collectible as well as the
              proof of donation.
            </p>
            <p className="font-lg w-11/12 py-[2rem] text-justify text-xl text-black">
              Our platform allows users to donate in the form of subscriptions,
              hence enhancing the options to real philanthropists.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Advantages
