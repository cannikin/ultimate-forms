// Converts a x-www-form-urlencoded string into a nested object:
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

  const result = {}

  // Loop through each key-value pair: ['doctor[name][first]', 'doctor[name][last]']
  for (let [key, value] of searchParams) {
    // Split the key into nested keys: ['doctor', 'name', 'first']
    const nestedKeys = key.split('[').map((k) => k.replace(']', ''))

    // Reference to the object we're building up, this reference will change
    // we iterate through the nested keys, but will update `result` itself
    let currentObject = result

    // keep track of whether this element is actually an array
    let isArray = false

    // Loop through each member of the key: 'doctor', 'name', 'first'
    for (let i = 0; i < nestedKeys.length; i++) {
      const nestedKey = nestedKeys[i]

      // skip nestedKeys that are themselves arrays (the previous iteration
      // already populated the key as an array)
      if (nestedKey === '') {
        isArray = true
        continue
      }

      // if the next key is empty then this element is an array
      let newElement = {}
      if (nestedKeys[i + 1] === '') {
        newElement = []
      }

      // if the nested key doesn't exist yet, create it
      if (!currentObject[nestedKey]) {
        currentObject[nestedKey] = newElement
      }

      // point currentObject to the new nested object we created, unless this is
      // the end of the chain, in which case the next code block will actually
      // set the value at the node
      if (i !== nestedKeys.length - 1) {
        currentObject = currentObject[nestedKey]
      }
    }

    // actually set the value at the node of the nested object
    if (isArray) {
      currentObject.push(value)
    } else {
      currentObject[nestedKeys[nestedKeys.length - 1]] = value
    }
  }

  return result
}
