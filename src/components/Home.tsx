import React from 'react'

import Advantages from './Advantages'
import Heading from './SignIn/Heading'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Heading
        text="Welcome to the future of donations!"
        headingStyle="text-black p-10 text-center text-5xl font-bold"
      />
      <div className="border-gray m-5  w-11/12 rounded-3xl border border-gray-500 px-[5rem] py-[5rem] ">
        <h2 className="t pb-10 text-center text-4xl font-bold text-yellow-300">
          How do our donations work?
        </h2>
        <div className="flex flex-col pl-5">
          <div className="flex flex-row ">
            <div />
            <p className="font-xl m-0.5 p-4 pr-5 text-justify text-2xl font-bold text-black">
              1.
            </p>
            <p className="font-xl w-full p-4 text-justify  text-2xl text-black">
              Now that you have logged in, you can use the balance in your
              MetaMask wallet to make donations.
            </p>
          </div>
          <div className="flex flex-row ">
            <p className="font-xl m-0.5 p-4 text-justify text-2xl font-bold text-black">
              2.
            </p>
            <p className="font-xl w-full p-4 text-justify text-2xl text-black">
              The transation is stored on the Polygon blockchain, hence making
              it secure and transparent.
            </p>
          </div>
          <div className="flex flex-row ">
            <p className="font-xl m-0.5 p-4 text-justify text-2xl font-bold text-black">
              3.
            </p>
            <p className="font-xl w-full p-4 text-justify text-2xl text-2xl text-black">
              To view our donation campaigns, kindly click the Campaigns tab on
              the Navbar.
            </p>
          </div>
          <div className="flex flex-row ">
            <p className="font-xl m-0.5 p-4 text-justify text-2xl font-bold text-black">
              4.
            </p>
            <p className="font-xl w-full p-4 text-justify text-2xl text-black">
              In the event of a successful transaction, a NFT will be minted
              which serves as the proof of donation.
            </p>
          </div>
          <div className="flex flex-row ">
            <p className="font-xl m-0.5 p-4 text-justify text-2xl font-bold text-black">
              5.
            </p>
            <p className="font-xl w-full p-4 text-justify text-2xl text-black">
              Donations can be made in the form of a one time payment or a
              monthly subscription.
            </p>
          </div>
        </div>
      </div>
      <Advantages />
    </div>
  )
}

export default Home
