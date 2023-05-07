import React from 'react'

interface BoxContent {
  heading: string
  text: string
  icon: any
}

function ElevatedCard({ heading, text, icon }: BoxContent) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-md">
      <span className="rounded-full bg-yellow-50 p-4 text-[3.5rem] text-yellow-500">
        {icon}
      </span>
      <h2 className="text-l text-center font-bold text-black lg:text-xl">
        {heading}
      </h2>
      <p className="lg:font-xl font-l mt-2 w-full text-justify text-black">
        {text}
      </p>
    </div>
  )
}

export default ElevatedCard
