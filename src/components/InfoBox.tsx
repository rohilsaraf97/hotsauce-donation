import React from 'react'

interface BoxContent {
  heading: string
  text: string
}

function InfoBox({ heading, text }: BoxContent) {
  return (
    <div className="border-l-[10px] border-l-yellow-500 bg-white p-10">
      <h2 className="pb-4 text-xl font-bold text-black">{heading}</h2>
      <p className=" font-xl w-9/12 text-black">{text}</p>
    </div>
  )
}

export default InfoBox
