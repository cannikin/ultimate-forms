import { Metadata } from '@redwoodjs/web'

import NestedArrayForm from './subs/NestedArrayForm/NestedArrayForm'
import NestedForm from './subs/NestedForm/NestedForm'
import SimpleForm from './subs/SimpleForm/SimpleForm'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <div className="flex items-start space-x-8">
        <div className="w-1/3">
          <SimpleForm />
        </div>
        <div className="w-1/3">
          <NestedForm />
        </div>
        <div className="w-1/3">
          <NestedArrayForm />
        </div>
      </div>
    </>
  )
}

export default HomePage
