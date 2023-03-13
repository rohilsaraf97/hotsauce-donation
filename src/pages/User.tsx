import axios from 'axios'
import { AiOutlinePlus } from 'react-icons/ai'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'

export default function User() {
  const navigate = useNavigate()

  async function signOut() {
    await axios(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, {
      withCredentials: true,
    })

    navigate('/signin')
  }

  return (
    <div className="flex flex-col font-poppins text-lg">
      <div className="sticky top-0 z-50 flex items-center justify-between bg-yellow-400 px-10 text-white">
        <div>
          <NavLink to="/user/home">Fund3</NavLink>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/user/campaigns/add"
            className="rounded-full p-2 hover:bg-yellow-500"
          >
            <AiOutlinePlus className="text-2xl" />
          </Link>

          <NavLink
            to="/user/campaigns"
            className={({ isActive }) =>
              isActive ? 'bg-yellow-800 px-2 py-4' : 'px-2 py-4'
            }
          >
            Campaigns
          </NavLink>
          <NavLink
            to="/user/donations"
            className={({ isActive }) =>
              isActive ? 'bg-yellow-800 px-2 py-4' : 'px-2 py-4'
            }
          >
            Donations
          </NavLink>
          <button type="button" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
