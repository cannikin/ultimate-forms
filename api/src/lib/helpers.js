// Converts a x-www-form-urlencoded string into a nested object:
//   doctor[name][first]=John&doctor[name][last]=Doe&doctor[specialty]=Cardiology
// to:
//   { doctor: { name: { first: 'John', last: 'Doe' }, specialty: 'Cardiology' } }

export const toParams = (urlEncodedString) => {
  // Since params may have the array syntax `doctor[phone][]` we can't just use
  // URLSearchParams to parse the form string—each key in the array syntax will
  // override the previous one since the names are identical. Manually parse:
  // "doctor[phone][]=123-456-7890" => [ [ "doctor[phone][]", "123-456-7890" ] ]
  const searchParams = decodeURIComponent(
    (urlEncodedString + '').replace(/\+/g, '%20')
  )
    .split('&')
    .map((pair) => pair.split('='))

  const result = {}

  for (let [key, value] of searchParams) {
    const nestedKeys = key.split('[').map((k) => k.replace(']', ''))

    let currentObject = result
    let isArray = false

    for (let i = 0; i < nestedKeys.length; i++) {
      const nestedKey = nestedKeys[i]

      // Skip nestedKeys that are themselves arrays
      if (nestedKey === '') {
        isArray = true
        continue
      }

      // If the next is empty (was `[]`, now ``) then this element is an array
      if (nestedKeys[i + 1] === '') {
        if (!currentObject[nestedKey]) {
          currentObject[nestedKey] = []
        }
      } else {
        if (!currentObject[nestedKey]) {
          currentObject[nestedKey] = {}
        }
      }

      // point currentObject to the new nested object we created, unless this is
      // the end of the chain (then the `currentObject[nestedKeys[nestedKeys.length - 1]] = value`
      // will set it to the value).
      if (i !== nestedKeys.length - 1) {
        currentObject = currentObject[nestedKey]
      }
    }

    if (isArray) {
      currentObject.push(value)
    } else {
      currentObject[nestedKeys[nestedKeys.length - 1]] = value
    }
  }

  return result
}
