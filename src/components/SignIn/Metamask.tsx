import React from 'react'

import Heading from './Heading'

function Metamask() {
  return (
    <div className="bg-gray-50 py-[6rem]">
      <div className="mx-[7rem] flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <span className="text-md font-bold text-yellow-500">Insights</span>
          <Heading
            text="What is MetaMask?"
            headingStyle="text-black text-left text-4xl font-bold "
          />
        </div>
        <p className="font-lg text-justify text-xl text-black">
          In essence, the Metamask wallet is a cryptocurrency wallet that
          supports ETH-based tokens such the ERC-721 and ERC-20 tokens. It may
          be installed just like any other browser extension because it is
          available as a plugin for your browser. Curiously, after installing
          the Metamask Chrome extension or Firefox extension, you can experience
          a seamless connection to any Ethereum-based decentralized app. With
          the wallet, you may quickly access any decentralized application, such
          as yield farming protocols and NFT marketplaces.
        </p>
        <p className="font-lg text-justify text-xl text-black">
          You can use MetaMask conveniently thanks to the option of web browser
          integration in the form of plugins. This is likely one of the main
          causes of its swiftly rising adoption rates. MetaMask can act as a
          portal for you into a new world of exciting potential with dApps, web
          browsing, DeFi, and blockchain technology as the need for a
          decentralized web starts to pick up steam.
        </p>
      </div>
    </div>
  )
}

export default Metamask
