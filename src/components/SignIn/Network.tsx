import React from 'react'

import InfoBox from '../InfoBox'
import Heading from './Heading'

function Network() {
  return (
    <div className=" w-full bg-white py-[6rem]">
      <div className="mx-[7rem] flex flex-col gap-[4rem]">
        <Heading
          text="Learn more about the Network!"
          headingStyle="text-black text-5xl font-bold text-center"
        />
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          <InfoBox
            heading="What is Polygon?"
            text="Polygon is a “layer two” or “sidechain” scaling solution that runs alongside the Ethereum blockchain allowing for speedy transactions and low fees. MATIC is the network’s native cryptocurrency, which is used for fees, staking, and more. You can buy or sell MATIC via exchanges like Coinbase."
          />
          <InfoBox
            heading="What is MATIC?"
            text=" MATIC is Polygon's native cryptocurrency. It is an ERC-20 token, a token created on the Ethereum blockchain. This token is used to govern and secure the Polygon network and pay the network's transaction fees. MATIC has low transaction fees and extremely fast transactions per second."
          />
        </div>
      </div>
    </div>
  )
}

export default Network
