import React from 'react'

import Heading from './SignIn/Heading'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Heading
        text="Welcome to the future of donations!"
        headingStyle="text-black p-10 text-center text-5xl font-bold"
      />
      <div className="border-gray m-5 w-11/12 rounded-3xl border border-gray-500 p-4 ">
        <h2 className="t p-4 text-center text-3xl font-bold text-yellow-300">
          How do our donations work?
        </h2>
        <div className="flex flex-col">
          <div className="flex flex-row ">
            <p className="font-xl m-0.5 p-3 pr-4 text-justify font-bold text-black">
              1.
            </p>
            <p className="font-xl w-full p-3  text-justify text-black">
              Now that you have logged in, you can use the balance in your
              MetaMask wallet to make donations
            </p>
          </div>
          <div className="flex flex-row ">
            <p className="font-xl m-0.5 p-3 text-justify font-bold text-black">
              2.
            </p>
            <p className="font-xl w-full p-3 text-justify text-black">
              The transation is stored on the Polygon blockchain, hence making
              it secure and transparent.
            </p>
          </div>
          <div className="flex flex-row ">
            <p className="font-xl m-0.5 p-3 text-justify font-bold text-black">
              3.
            </p>
            <p className="font-xl w-full p-3 text-justify text-black">
              To view our donation campaigns, kindly click the Campaigns tab in
              thr Navbar.
            </p>
          </div>
          <div className="flex flex-row ">
            <p className="font-xl m-0.5 p-3 text-justify font-bold text-black">
              4.
            </p>
            <p className="font-xl w-full p-3 text-justify text-black">
              In the event of a successful transaction, a NFT will be minted
              which serves as the proof of donation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
