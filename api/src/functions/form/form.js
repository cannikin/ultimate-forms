// Converts a x-www-form-urlencoded string into a nested object:
//   doctor[name][first]=John&doctor[name][last]=Doe&doctor[specialty]=Cardiology
// to:
//   { doctor: { name: { first: 'John', last: 'Doe' }, specialty: 'Cardiology' } }

function toParams(urlEncodedString) {
  const searchParams = Object.fromEntries(
    new URLSearchParams(urlEncodedString).entries()
  )

  const result = {}

  for (let key in searchParams) {
    const nestedKeys = key.split('[').map((k) => k.replace(']', ''))
    let currentObject = result

    nestedKeys.forEach((key, i) => {
      // don't do anything with the last key
      if (i === nestedKeys.length - 1) return

      if (!currentObject[key]) {
        currentObject[key] = {}
      }
      currentObject = currentObject[key]
    })

    currentObject[nestedKeys[nestedKeys.length - 1]] = searchParams[key]
  }

  return result
}

export const handler = async (event, _context) => {
  const params = toParams(event.body)

  // const doctor = Doctor.find(123)
  // doctor.update(params)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ params }),
  }
}
