import { toParams } from 'src/lib/helpers'

export const handler = async (event, _context) => {
  const params = toParams(event.body)

  // const doctor = Doctor.find(params.doctor.id)
  // doctor.update(params)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ params }),
  }
}
