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
      <div className=" flex items-center justify-between bg-pink-600 px-10 text-white">
        <div>Fund3</div>
        <div className="flex items-center gap-4">
          <Link
            to="/user/campaigns/add"
            className="rounded-full p-2 hover:bg-pink-500"
          >
            <AiOutlinePlus className="text-2xl" />
          </Link>
          <NavLink
            to="/user/campaigns"
            className={({ isActive }) =>
              isActive ? 'bg-pink-800 px-2 py-4' : 'px-2 py-4'
            }
          >
            Campaigns
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
