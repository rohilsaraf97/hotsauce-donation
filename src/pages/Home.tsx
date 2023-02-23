import React from 'react'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div className="h-screen w-full bg-gray-700 font-mono text-blue-100">
      <div>
        <h1>Home</h1>
      </div>
      <div className="detail">
        <Outlet />
      </div>
    </div>
  )
}

export default Home
