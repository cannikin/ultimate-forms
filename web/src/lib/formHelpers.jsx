import { createContext, createElement, Fragment, useContext } from 'react'

import { camelCase, titleCase } from 'change-case-all'

const FormContext = createContext()

// converts the model chain and attribute name to an input element name prop
export const modelAndAttributeName = (modelChain, name) => {
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

export const FormFor = ({
  model: formModel,
  action,
  method = 'post',
  remote = true,
  children,
}) => {
  return (
    <form
      action={action}
      method={method}
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

  // if the `index` prop was passed then include the index in the name so we
  // know what `id` this record has:
  // doctor[patients][123][name]
  if (index) {
    modelStack.push(index)
  }

  // these fields will get wrapped in a Fragment by default, but if you pass an
  // `as` prop we'll create that element. If you use `className` but no `as` we
  // will default to a `div` element
  const { as, className, ...elementProps } = rest
  const elementType = as ? as : className ? 'div' : Fragment
  const props = { ...elementProps }
  if (className) {
    props.className = className
  }

  return createElement(
    elementType,
    props,
    <FormContext.Provider value={{ model: modelStack }}>
      {children}
    </FormContext.Provider>
  )
}

export const Label = (props) => {
  const { model } = useContext(FormContext)
  const { name, label, ...rest } = props

  return (
    <label htmlFor={modelAndAttributeName(model, name)} {...rest}>
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
      name={modelAndAttributeName(model, name)}
      defaultValue={modelAndAttributeValue(model, name)}
      {...rest}
    />
  )
}

export const HiddenField = (props) => {
  const { model } = useContext(FormContext)
  const { name, ...rest } = props

  return (
    <input
      type="hidden"
      name={modelAndAttributeName(model, name)}
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
