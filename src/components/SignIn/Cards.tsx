import React from 'react'
import { AiFillEye, AiFillPushpin } from 'react-icons/ai'
import { BsFillLockFill } from 'react-icons/bs'

import ElevatedCard from './ElevatedCard'
import Heading from './Heading'

function Cards() {
  return (
    <div className="flex flex-col items-center bg-gray-50 py-[6rem]">
      <div className="mx-[7rem]">
        <Heading
          text="Why use the blockchain for donations?"
          headingStyle="text-black lg:text-5xl text-4xl font-bold text-center"
        />
        <div className="flex w-full flex-col items-center gap-12 pt-[4rem] lg:flex-row">
          <ElevatedCard
            heading="Secure"
            text="In blockchains, the data is structured into blocks and each block contains a transaction or bundle of transactions. Each new block connects to all the blocks before it in a cryptographic chain in such a way that it's nearly impossible to tamper with."
            icon={<BsFillLockFill />}
          />
          <ElevatedCard
            heading="Transparent"
            text="Transparency is arguably the blockchain's best quality. This is due to the fact that, in theory, the technology enables transactions that are traceable and immutable, allowing parties to trade in total confidence without the use of a middleman."
            icon={<AiFillEye />}
          />
          <ElevatedCard
            heading="Traceable"
            text="Users' retail networks can develop in a completely transparent and manageable way. Users can join, highlight, and track items or assets to make sure they are not applied incorrectly or sent back during the process, making it perfect for donations."
            icon={<AiFillPushpin />}
          />
        </div>
      </div>
    </div>
  )
}

export default Cards
