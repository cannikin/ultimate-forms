import { toParams } from './helpers'

describe('toParams', () => {
  it('parses simple 1-level attributes into nested params', async () => {
    const data = 'doctor[name]=Dr. John Doe&doctor[specialty]=Cardiology'

    expect(toParams(data)).toEqual({
      doctor: { name: 'Dr. John Doe', specialty: 'Cardiology' },
    })
  })

  it('parses multiple top-level keys', async () => {
    const data = 'doctor[name]=Dr. John Doe&patient[name]=Jane Doe'

    expect(toParams(data)).toEqual({
      doctor: { name: 'Dr. John Doe' },
      patient: { name: 'Jane Doe' },
    })
  })

  it('parses 2-level deep attributes into nested params', async () => {
    const data =
      'doctor[name][first]=John&doctor[name][last]=Doe&doctor[specialty]=Cardiology'
    expect(toParams(data)).toEqual({
      doctor: {
        name: { first: 'John', last: 'Doe' },
        specialty: 'Cardiology',
      },
    })
  })

  it('parses 3-level deep attributes into nested params', async () => {
    const data =
      'doctor[name][first]=John&doctor[name][last]=Doe&doctor[location][home][city]=San Diego&doctor[specialty]=Cardiology'

    expect(toParams(data)).toEqual({
      doctor: {
        name: {
          first: 'John',
          last: 'Doe',
        },
        location: {
          home: {
            city: 'San Diego',
          },
        },
        specialty: 'Cardiology',
      },
    })
  })

  it('parses array syntax attributes into params', async () => {
    const data = 'doctor[phone][]=123-456-7890&doctor[phone][]=098-765-4321'

    expect(toParams(data)).toEqual({
      doctor: {
        phone: ['123-456-7890', '098-765-4321'],
      },
    })
  })
})
