import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <ul className="flex items-start space-x-16">
        <li className="rounded bg-blue-500 px-2 py-1 text-white">
          <Link to={routes.simple()}>Simple Form</Link>
        </li>
        <li className="rounded bg-blue-500 px-2 py-1 text-white">
          <Link to={routes.nested()}>Nested Form</Link>
        </li>
        <li className="rounded bg-blue-500 px-2 py-1 text-white">
          <Link to={routes.array()}>Nested Array Form</Link>
        </li>
      </ul>
    </>
  )
}

export default HomePage
