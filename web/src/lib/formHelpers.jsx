import { createContext, createElement, Fragment, useContext } from 'react'

import { camelCase, titleCase } from 'change-case-all'
import createFragment from 'react-addons-create-fragment'

const FormContext = createContext()

// converts the model chain and attribute name to an input element name prop
export const modelAndAttributeToNameProp = (modelChain, name) => {
  const modelNames = modelChain.map((m) => {
    if (typeof m === 'object') {
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

// gets the value for a given model chain and attribute name
export const modelAndAttributeValue = (modelChain, attr) => {
  if (typeof modelChain[modelChain.length - 1] === 'object') {
    return modelChain[modelChain.length - 1][attr]
  } else {
    return modelChain[modelChain.length - 2][attr]
  }
}

export const onSubmit = async (event) => {
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

export const FormFor = ({ model: formModel, remote = true, children }) => {
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

export const FieldsFor = ({ model: fieldsModel, index, children, ...rest }) => {
  const { model } = useContext(FormContext)
  const modelStack = [...model, fieldsModel]
  if (index) {
    modelStack.push(index)
  }
  const { as, className, ...elementProps } = rest
  const elementType = as ? as : className ? 'div' : Fragment

  return createElement(
    elementType,
    { ...elementProps, className },
    <FormContext.Provider value={{ model: modelStack }}>
      {children}
    </FormContext.Provider>
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
