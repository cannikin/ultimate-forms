import { Link, routes } from '@redwoodjs/router'

const MainLayout = ({ children }) => {
  return (
    <>
      <header className="mb-8">
        <nav>
          <ul className="flex items-start space-x-8">
            <li>
              <Link to={routes.simple()}>Simple Form</Link>
            </li>
            <li>
              <Link to={routes.nested()}>Nested Form</Link>
            </li>
            <li>
              <Link to={routes.array()}>Nested Array Form</Link>
            </li>
            <li>
              <Link to={routes.array2()}>Array Element Form</Link>
            </li>
            <li>
              <Link to={routes.complex()}>Complex Form</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default MainLayout
