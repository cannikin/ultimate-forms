import {
  modelAndAttributeToNameProp,
  modelAndAttributeValue,
} from './formHelpers'

describe('modelAndAttributeToNameProp', () => {
  it('converts a model and attribute to a name prop', () => {
    const data = {
      className: 'Doctor',
      name: 'Dr. John Doe',
      specialty: 'Cardiology',
    }

    expect(modelAndAttributeToNameProp([data], 'name')).toEqual('doctor[name]')
  })

  it('converts a model and attribute to a name prop with a 2-level model', () => {
    const data = {
      className: 'Doctor',
      name: {
        first: 'John',
      },
      patient: {
        className: 'Patient',
        name: 'Jane Doe',
      },
    }

    expect(modelAndAttributeToNameProp([data, data.patient], 'name')).toEqual(
      'doctor[patient][name]'
    )
  })

  it('converts a model and attribute with an id in the model chain', () => {
    const data = {
      className: 'Doctor',
      name: {
        first: 'John',
      },
      patients: [
        {
          className: 'Patient',
          id: 123,
          name: 'Jane Doe',
        },
      ],
    }

    expect(
      modelAndAttributeToNameProp([data, data.patients[0], 123], 'name')
    ).toEqual('doctor[patient][123][name]')
  })
})

describe('modelAndAttributeValue', () => {
  it('returns the value of the attribute in the last model in the stack', () => {
    const data = {
      className: 'Doctor',
      name: 'Dr. John Doe',
      specialty: 'Cardiology',
    }

    expect(modelAndAttributeValue([data], 'name')).toEqual('Dr. John Doe')
  })

  it('returns the value of the attribute in the last model in the stack with a 2-level model', () => {
    const data = {
      className: 'Doctor',
      name: {
        first: 'John',
      },
      patient: {
        className: 'Patient',
        name: 'Jane Doe',
      },
    }

    expect(modelAndAttributeValue([data, data.patient], 'name')).toEqual(
      'Jane Doe'
    )
  })

  it('finds the value for a model chain containing a record id', () => {
    const data = {
      className: 'Doctor',
      name: {
        first: 'John',
      },
      patients: [
        {
          className: 'Patient',
          id: 123,
          name: 'Jane Doe',
        },
      ],
    }

    expect(
      modelAndAttributeValue([data, data.patients[0], 123], 'name')
    ).toEqual('Jane Doe')
  })
})
