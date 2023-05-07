import { Outlet } from 'react-router-dom'

import Navbar from '../components/Navbar'

export default function User() {
  return (
    <div className="flex flex-col font-poppins text-lg">
      <Navbar />
      <Outlet />
    </div>
  )
}
