import axios from 'axios'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import logo from '../assets/logo.png'

function Navbar() {
  const navigate = useNavigate()

  async function signOut() {
    await axios(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, {
      withCredentials: true,
    })

    navigate('/signin')
  }

  const navItems = [
    {
      text: 'Activity',
      href: '/user/activity',
    },
    {
      text: 'Campaigns',
      href: '/user/campaigns',
    },
    {
      text: 'Donations',
      href: '/user/donations',
    },
    {
      text: 'Subscriptions',
      href: '/user/subscriptions',
    },
  ]
  return (
    <div className="sticky top-0 z-50 flex flex-row items-center justify-between bg-yellow-500/10 px-[7rem] py-4 backdrop-blur-lg">
      <Link to="/user/home">
        <div className="flex flex-row items-center">
          <img alt="" src={logo} className="h-[3rem] p-2" />
          <h2>CryptoCares</h2>
        </div>
      </Link>

      <div className="flex flex-row items-center gap-4">
        <Link
          to="/user/campaigns/add"
          className="rounded-full p-2 hover:bg-yellow-500/30"
        >
          <AiOutlinePlus className="text-2xl" />
        </Link>
        {navItems.map((item, index) => (
          <NavLink
            to={item.href}
            className={({ isActive }) =>
              isActive ? 'rounded-md bg-yellow-500/30 px-2 py-4' : 'px-2 py-4'
            }
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          >
            {item.text}
          </NavLink>
        ))}
        <button type="button" onClick={signOut}>
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Navbar
