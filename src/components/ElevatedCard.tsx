import React from 'react'

interface BoxContent {
  heading: string
  text: string
}

function ElevatedCard({ heading, text }: BoxContent) {
  return (
    <div className="m-5 w-4/12 rounded-3xl bg-white p-4 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] ">
      <h2 className="t p-4 text-center text-3xl font-bold text-yellow-300">
        {heading}
      </h2>
      <p className="font-xl w-full p-2 text-justify text-black">{text}</p>
    </div>
  )
}

export default ElevatedCard
