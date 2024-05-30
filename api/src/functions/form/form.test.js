import { mockHttpEvent, mockContext } from '@redwoodjs/testing/api'

import { handler } from './form'

describe('form function', () => {
  it('parses simple 1-level attributes into nested params', async () => {
    const httpEvent = mockHttpEvent({
      body: encodeURI(`doctor[name]=Dr. John Doe&doctor[specialty]=Cardiology`),
    })

    const response = await handler(httpEvent, mockContext())
    const data = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(data).toEqual({
      params: { doctor: { name: 'Dr. John Doe', specialty: 'Cardiology' } },
    })
  })
})
