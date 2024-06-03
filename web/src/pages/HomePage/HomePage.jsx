import { useEffect } from 'react'

import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HomePage = () => {
  useEffect(() => {
    navigate(routes.simple())
  }, [])

  return (
    <>
      <Metadata title="Home" description="Home page" />
    </>
  )
}

export default HomePage
