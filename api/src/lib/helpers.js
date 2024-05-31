// looks at a single param and sets the value in a `current` object:
//
//  parseParam({}, 'doctor[name][first]', 'John')
//  results in `current` => { doctor: { name: { first: 'John' } } }

const parseParam = (root, keys, value, level = 0) => {
  const currentObject = JSON.parse(JSON.stringify(root))

  const log = (msg) =>
    console.info(`${' '.repeat(level * 8)}${msg}`, currentObject, keys, value)

  const key = keys[0]

  if (keys[1]) {
    // there are more keys after this one, recurse and parse those
    currentObject[key] = parseParam(
      currentObject[key] || {},
      keys.slice(1),
      value,
      level + 1
    )
  } else {
    // we're at the end of the line, set the value
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
  const output = {}
  for (let [key, value] of searchParams) {
    const keyNameParts = key.split('[').map((k) => k.replace(']', ''))
    Object.assign(output, parseParam(output, keyNameParts, value))
  }

  return output
}
