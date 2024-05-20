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

  it('parses multiple top-level keys', async () => {
    const httpEvent = mockHttpEvent({
      body: encodeURI(`doctor[name]=Dr. John Doe&patient[name]=Jane Doe`),
    })

    const response = await handler(httpEvent, mockContext())
    const data = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(data).toEqual({
      params: {
        doctor: { name: 'Dr. John Doe' },
        patient: { name: 'Jane Doe' },
      },
    })
  })

  it('parses 2-level attributes into nested params', async () => {
    const httpEvent = mockHttpEvent({
      body: encodeURI(
        `doctor[name][first]=John&doctor[name][last]=Doe&doctor[specialty]=Cardiology`
      ),
    })

    const response = await handler(httpEvent, mockContext())
    const data = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(data).toEqual({
      params: {
        doctor: {
          name: { first: 'John', last: 'Doe' },
          specialty: 'Cardiology',
        },
      },
    })
  })

  it('parses 3-level attributes into nested params', async () => {
    const httpEvent = mockHttpEvent({
      body: encodeURI(
        `doctor[name][first]=John&doctor[name][last]=Doe&doctor[location][home][city]=San Diego&doctor[specialty]=Cardiology`
      ),
    })

    const response = await handler(httpEvent, mockContext())
    const data = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(data).toEqual({
      params: {
        doctor: {
          name: { first: 'John', last: 'Doe' },
          location: { home: { city: 'San Diego' } },
          specialty: 'Cardiology',
        },
      },
    })
  })
})
