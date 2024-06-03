import { ParamKeyCollectionNameError, toParams } from './helpers'

describe('toParams', () => {
  it('parses simple 1-level attributes into nested params', async () => {
    const data = [
      'doctor[name]=Dr.+John+Doe',
      'doctor[specialty]=Cardiology',
    ].join('&')
    const output = toParams(data)

    expect(output).toEqual({
      doctor: { name: 'Dr. John Doe', specialty: 'Cardiology' },
    })
  })

  it('parses multiple top-level keys', async () => {
    const data = ['doctor[name]=Dr.+John+Doe', 'patient[name]=Jane+Doe'].join(
      '&'
    )
    const output = toParams(data)

    expect(output).toEqual({
      doctor: { name: 'Dr. John Doe' },
      patient: { name: 'Jane Doe' },
    })
  })

  it('parses 2-level deep attributes into nested params', async () => {
    const data = [
      'doctor[name][first]=John',
      'doctor[name][last]=Doe',
      'doctor[specialty]=Cardiology',
    ].join('&')
    const output = toParams(data)

    expect(output).toEqual({
      doctor: {
        name: { first: 'John', last: 'Doe' },
        specialty: 'Cardiology',
      },
    })
  })

  it('parses 3-level deep attributes into nested params', async () => {
    const data = [
      'doctor[name][first]=John',
      'doctor[name][last]=Doe',
      'doctor[location][home][city]=San+Diego',
      'doctor[specialty]=Cardiology',
    ].join('&')
    const output = toParams(data)

    expect(output).toEqual({
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
    const data = [
      'doctor[name]=Dr.+John+Doe',
      'doctor[phone][]=123-456-7890',
      'doctor[phone][]=098-765-4321',
    ].join('&')

    expect(toParams(data)).toEqual({
      doctor: {
        name: 'Dr. John Doe',
        phone: ['123-456-7890', '098-765-4321'],
      },
    })
  })

  it('parses nested objects and arrays in the same string', () => {
    const data = [
      'doctor[name]=John',
      'doctor[specialty]=Cardiology',
      'doctor[phone][]=123-123-1234',
      'doctor[phone][]=234-234-2345',
      'doctor[patient][123][name]=Sarah',
      'doctor[patient][234][name]=Bob',
    ].join('&')

    expect(toParams(data)).toEqual({
      doctor: {
        name: 'John',
        specialty: 'Cardiology',
        phone: ['123-123-1234', '234-234-2345'],
        patient: {
          123: {
            name: 'Sarah',
          },
          234: {
            name: 'Bob',
          },
        },
      },
    })
  })

  it('parses arrays of objects with single keys', () => {
    // Example usage:
    const data = [
      'doctor[patient][][name]=Sarah',
      'doctor[patient][][name]=Bob',
    ].join('&')

    expect(toParams(data)).toEqual({
      doctor: {
        patient: [
          {
            name: 'Sarah',
          },
          {
            name: 'Bob',
          },
        ],
      },
    })
  })

  it('parses arrays of objects with multiple keys', () => {
    // Example usage:
    const data = [
      'doctor[patient][][name]=Sarah',
      'doctor[patient][][dob]=2020-01-01',
      'doctor[patient][][name]=Bob',
      'doctor[patient][][dob]=1990-02-03',
    ].join('&')

    console.info('toParams', toParams(data).doctor)

    expect(toParams(data)).toEqual({
      doctor: {
        patient: [
          {
            name: 'Sarah',
            dob: '2020-01-01',
          },
          {
            name: 'Bob',
            dob: '1990-02-03',
          },
        ],
      },
    })
  })

  it('throws an error when objects have a mixed bag of keys', () => {
    // Example usage:
    const data = [
      'doctor[patient][][name]=Sarah',
      'doctor[patient][][dob]=2020-01-01',
      'doctor[patient][][name]=Bob',
      'doctor[patient][][address]=Anytown USA',
    ].join('&')

    expect(() => toParams(data)).toThrow(ParamKeyCollectionNameError)
  })
})
