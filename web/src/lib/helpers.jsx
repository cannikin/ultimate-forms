import { createContext, createElement, Fragment, useContext } from 'react'

import { camelCase, titleCase } from 'change-case-all'

const FormContext = createContext()

// Checks if name is using array syntax, like `name[]`
const nameIsArray = (name) => {
  return /\[\]$/.test(name)
}

// converts the model chain and attribute name to an input element name prop
export const modelAndAttributeName = (modelChain, name) => {
  if (modelChain.length) {
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

    // check for array syntax, if present move after the square brackets:
    // `name[]` => [name][]`
    if (nameIsArray(name)) {
      return `${prop}[${name.replace(/\[\]$/, '')}][]`
    } else {
      return `${prop}[${name}]`
    }
  } else {
    return name
  }
}

// gets the value for a given model chain and attribute name
export const modelAndAttributeValue = (modelChain, attr) => {
  if (modelChain[0]) {
    if (typeof modelChain[modelChain.length - 1] === 'object') {
      return modelChain[modelChain.length - 1][attr]
    } else {
      return modelChain[modelChain.length - 2][attr]
    }
  } else {
    return undefined
  }
}

export const onSubmit = async (event) => {
  event.preventDefault()

  // Can't use URLSearchParams to quickly parse form values because fields with
  // the same name will override the previous value. Need to keep them separate
  // and let the server turn them into arrays.
  const formValues = []

  // turns fields into an array of arrays, like [['name', 'Dr. John Doe']]
  new FormData(event.target).forEach((value, name) => {
    formValues.push([name, value])
  })

  // turns the array of arrays into a query string, like `name=Dr.+John+Doe`
  const wwwFormUrlEncoded = formValues
    .map(
      ([name, value]) =>
        `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
    )
    .join('&')

  const response = await fetch(event.target.action, {
    method: event.target.method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: wwwFormUrlEncoded,
  })
  const json = await response.json()
  console.log('response', json)
}

export const FormWith = ({
  model: formModel,
  url,
  method = 'post',
  remote = true,
  children,
}) => {
  return (
    <form action={url} method={method} onSubmit={remote ? onSubmit : undefined}>
      <FormContext.Provider value={{ model: formModel ? [formModel] : [] }}>
        {children}
      </FormContext.Provider>
    </form>
  )
}

export const FieldsFor = ({
  name,
  model: fieldsModel,
  index,
  children,
  ...rest
}) => {
  const { model } = useContext(FormContext)
  const modelStack = [...model, fieldsModel ? fieldsModel : { className: name }]

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
