import React from 'react'

interface BoxContent {
  heading: string
  text: string
}

function InfoBox({ heading, text }: BoxContent) {
  return (
    <div className=" h-4/12 m-2 w-6/12 border-4 border-black p-4 ">
      <h2 className="bg-gradient-to-r from-yellow-300 to-sky-600 bg-clip-text pb-4  text-3xl font-bold text-transparent">
        {heading}
      </h2>
      <p className=" font-xl w-9/12 text-black">{text}</p>
    </div>
  )
}

export default InfoBox
