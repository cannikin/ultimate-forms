import { createContext, useContext } from 'react'

import { camelCase, titleCase } from 'change-case-all'

export const modelAndAttributeToNameProp = (model, name) => {
  const modelNames = model.map((m) => {
    if (m.className) {
      return m.className
    } else {
      return m
    }
  })
  let prop = camelCase(modelNames.shift())

  for (const modelName of modelNames) {
    prop = prop + `[${camelCase(modelName.toString())}]`
  }

  return `${prop}[${name}]`
}

export const modelAndAttributeValue = (model, attr) => {
  return model[model.length - 1][attr]
}

const FormContext = createContext()

export const FormFor = ({ model: formModel, remote = true, children }) => {
  const onSubmit = async (event) => {
    event.preventDefault()

    const response = await fetch(event.target.action, {
      method: event.target.method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(new FormData(event.target)).toString(),
    })
    const json = await response.json()
    console.log('response', json)
  }

  return (
    <form
      action="/.redwood/functions/form"
      method="post"
      onSubmit={remote ? onSubmit : undefined}
    >
      <FormContext.Provider value={{ model: [formModel] }}>
        {children}
      </FormContext.Provider>
    </form>
  )
}

export const FieldsFor = ({ model: fieldsModel, index, children }) => {
  const { model } = useContext(FormContext)
  const modelStack = [...model, fieldsModel]
  if (index) {
    modelStack.push(index)
  }

  return (
    <>
      <FormContext.Provider value={{ model: modelStack }}>
        {children}
      </FormContext.Provider>
    </>
  )
}

export const Label = (props) => {
  const { model } = useContext(FormContext)
  const { name, label, ...rest } = props

  return (
    <label htmlFor={modelAndAttributeToNameProp(model, name)} {...rest}>
      {label || titleCase(name)}
    </label>
  )
}

export const TextField = (props) => {
  const { model } = useContext(FormContext)
  const { name, ...rest } = props

  return (
    <input
      type="text"
      name={modelAndAttributeToNameProp(model, name)}
      defaultValue={modelAndAttributeValue(model, name)}
      {...rest}
    />
  )
}

export const Submit = (props) => {
  const { label, ...rest } = props

  return (
    <button type="submit" {...rest}>
      {label || 'Save'}
    </button>
  )
}
