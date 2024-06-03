export class ParamKeyCollectionNameError extends Error {
  constructor(message) {
    super(message)
    this.name = 'InconsistentKeyNameError'
  }
}

// Array of objects must contain the same keys so if there's
// more than one, be sure this key is present in any previous object
export const validateConsistentKeyNames = (array, key, obj) => {
  if (array.length > 1) {
    if (!Object.keys(array[0]).includes(Object.keys(obj)[0])) {
      throw new ParamKeyCollectionNameError(
        `List of keys in \`${key}\` is not consistent. Arrays of objects must
            have the same keys. Previous keys are \`${Object.keys(
              array[0]
            ).join('`, `')}\` and does not include \`${Object.keys(obj)[0]}\`.`
      )
    }
  }
}

// Looks at a single array-type param and parses all children into an array
// of primatives or array of objects.
const parseArray = ({ root, keys, value }) => {
  const currentObject = JSON.parse(JSON.stringify(root || []))

  // start from the *next next* element, not the empty array one
  const objValue = parseParam({
    root: {},
    keys: keys.slice(2),
    value,
  })

  if (Object.keys(objValue)[0] === 'undefined') {
    // simple value, just append to the array
    currentObject.push(Object.values(objValue)[0])
  } else {
    // nested object contains key/value, not just a bare value
    if (!currentObject.length) {
      currentObject.push({})
    }

    let lastObject = currentObject[currentObject.length - 1]

    // check that key names are identical between objects
    validateConsistentKeyNames(currentObject, keys[0], objValue)

    // are we appending to an existing object or creating a new one?
    if (Object.keys(lastObject).includes(Object.keys(objValue)[0])) {
      // key already exists in current object so create a new one
      currentObject.push(objValue)
    } else {
      // key doesn't exist yet, merge into the last object in the array
      lastObject = Object.assign(lastObject || {}, objValue)
    }
  }

  return currentObject
}

// Looks at a single param and returns an object with the proper nested object.
// Passing in an existing object as root will merge the new object into the
// existing one.
//
//  input:  parseParams({ root: {}, keys: ['doctor', 'name', 'first'], value: 'John' })
//  output: { doctor: { name: { first: 'John' } } }
const parseParam = ({ root, keys, value }) => {
  const currentObject = JSON.parse(JSON.stringify(root))

  const key = keys[0]

  if (keys[1] === '') {
    currentObject[key] = parseArray({ root: currentObject[key], keys, value })
  } else if (keys[1]) {
    // there are more keys after this one, recurse and parse those
    currentObject[key] = parseParam({
      root: currentObject[key] || {},
      keys: keys.slice(1),
      value,
    })
  } else {
    // at the end of the line so just set the value
    currentObject[key] = value
  }

  return currentObject
}

// Converts a www-form-urlencoded string into a nested object:
//   doctor[name][first]=John&doctor[name][last]=Doe&doctor[specialty]=Cardiology
// to:
//   { doctor: { name: { first: 'John', last: 'Doe' }, specialty: 'Cardiology' } }
export const toParams = (urlEncodedString) => {
  // Turns URL encoded query string into an array of arrays:
  // "doctor%5Bphone%5D=123-456-7890" => [ [ "doctor[phone]", "123-456-7890" ] ]
  const searchParams = decodeURIComponent(
    (urlEncodedString + '').replace(/\+/g, '%20')
  )
    .split('&')
    .map((pair) => pair.split('='))

  // Loop through each key-value pair: ['doctor[name][first]', 'doctor[name][last]']
  // And merge the parsed key/value object into the output
  let output = {}
  for (let [key, value] of searchParams) {
    const keyNameParts = key.split('[').map((k) => k.replace(']', ''))
    Object.assign(
      output,
      parseParam({ root: output, keys: keyNameParts, value })
    )
  }

  return output
}
