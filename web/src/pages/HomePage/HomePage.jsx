import { createContext, useContext } from 'react'

import camelCase from 'camelcase'

import { Metadata } from '@redwoodjs/web'

const doctor = {
  className: 'Doctor',
  name: 'Dr. John Doe',
  speciality: 'Cardiology',
}

const FormContext = createContext()

const FormFor = ({ model, children }) => {
  return (
    <form action="/.redwood/functions/form" method="post">
      <FormContext.Provider value={{ model }}>{children}</FormContext.Provider>
    </form>
  )
}

const TextField = (props) => {
  const { model } = useContext(FormContext)
  const { name, ...rest } = props
  const nameProp = `${camelCase(model.className)}[${name}]`

  return <input name={nameProp} defaultValue={model[name]} {...rest} />
}

const Submit = (props) => {
  const { label, ...rest } = props

  return (
    <button type="submit" {...rest}>
      {label || 'Save'}
    </button>
  )
}

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <FormFor model={doctor}>
        <TextField name="name" placeholder="First Last" required={true} />
        <TextField
          name="speciality"
          placeholder="Orthopedics"
          required={true}
        />
        <Submit>Save</Submit>
      </FormFor>
    </>
  )
}

export default HomePage
