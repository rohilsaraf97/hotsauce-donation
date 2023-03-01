import { Link, Outlet, useLoaderData, useLocation } from 'react-router-dom'

function Campaign() {
  const data = useLoaderData()
  const location = useLocation()
  return (
    <>
      <Outlet />
      <div className="my-10 mx-auto flex w-[80%] flex-col">
        {data.map((cpn) => {
          return (
            <div
              className="flex flex-col rounded-md bg-gray-50 px-4 py-2 shadow-md "
              // eslint-disable-next-line no-underscore-dangle
              key={cpn._id}
            >
              <div className="flex items-center justify-between border-b-2 ">
                <span className="text-xl font-bold">{cpn.title}</span>
                <p className="py-4 text-sm font-bold">
                  By: {cpn.owner.address}
                </p>
              </div>
              <p className="py-4 text-sm font-bold">
                {cpn.description} Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Atque minima dolor sapiente quibusdam possimus
                eos quidem esse fugiat voluptates ratione!{' '}
              </p>
              <Link
                to="donatemodal"
                state={{ background: location, cpnData: cpn }}
                className="self-end rounded-md bg-pink-600 px-2 py-2 text-sm text-white"
              >
                Donate
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Campaign
