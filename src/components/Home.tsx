import React from 'react'

import Heading from './Heading'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Heading
        text="Welcome to the future of donations!"
        headingStyle="text-black p-4 text-center text-5xl font-bold"
      />
      <div className="m-5 w-11/12 rounded-3xl bg-white p-4 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] ">
        <h2 className="t p-4 text-center text-3xl font-bold text-yellow-300">
          How do our donations work?
        </h2>
        <div className="flex flex-col">
          <div className="flex flex-row ">
            <p className="font-xl m-0.5 p-3 pr-4 text-justify font-bold text-black">
              1.
            </p>
            <p className="font-xl w-full p-3  text-justify text-black">
              Campaigns are available on the NavBar and you can use the balance
              present in your MetaMask wallet to perform donations.
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
              Campaigns are available on the NavBar and you can use the balance
              present in your MetaMask wallet to perform donations.
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
