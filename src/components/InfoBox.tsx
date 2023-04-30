import React from 'react'

interface BoxContent {
  heading: string
  text: string
}

function InfoBox({ heading, text }: BoxContent) {
  return (
    <div className="h-4/12 m-5 w-6/12  bg-white p-10 shadow-[5px_5px_0px_0px_rgba(85,206,255)] ">
      <h2 className="pb-4 text-3xl  font-bold text-black">{heading}</h2>
      <p className=" font-xl w-9/12 text-black">{text}</p>
    </div>
  )
}

export default InfoBox
