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
    // looking forward, next key denotes that *this* key is an array
    currentObject[key] = currentObject[key] || []

    // start from the *next next* element, not the empty array one
    const objValue = parseParam({
      root: {},
      keys: keys.slice(2),
      value,
    })

    if (Object.keys(objValue)[0] === 'undefined') {
      // simple value, just append to the array
      currentObject[key].push(Object.values(objValue)[0])
    } else {
      // nested object contains key/value, not just a bare value
      if (!currentObject[key].length) {
        currentObject[key].push({})
      }

      let lastObject = currentObject[key][currentObject[key].length - 1]

      if (Object.keys(lastObject).includes(Object.keys(objValue)[0])) {
        // key already exists in current object so create a new one
        currentObject[key].push(objValue)
      } else {
        // key doesn't exist yet, merge into the last object in the array
        lastObject = Object.assign(lastObject || {}, objValue)
      }
    }
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
