import {
  modelAndAttributeToNameProp,
  modelAndAttributeValue,
} from './formHelpers'

describe('modelAndAttributeToNameProp', () => {
  it('converts a model and attribute to a name prop', () => {
    const doctor = {
      className: 'Doctor',
      name: 'Dr. John Doe',
      specialty: 'Cardiology',
    }

    expect(modelAndAttributeToNameProp([doctor], 'name')).toEqual(
      'doctor[name]'
    )
  })

  it.only('converts a model and attribute to a name prop with a 2-level model', () => {
    const doctor = {
      className: 'Doctor',
      name: {
        first: 'John',
      },
      patient: {
        className: 'Patient',
        name: 'Jane Doe',
      },
    }

    expect(
      modelAndAttributeToNameProp([doctor, doctor.patient], 'name')
    ).toEqual('doctor[patient][name]')
  })
})

describe('modelAndAttributeValue', () => {
  it('returns the value of the attribute in the last model in the stack', () => {
    const doctor = {
      className: 'Doctor',
      name: 'Dr. John Doe',
      specialty: 'Cardiology',
    }

    expect(modelAndAttributeValue([doctor], 'name')).toEqual('Dr. John Doe')
  })

  it('returns the value of the attribute in the last model in the stack with a 2-level model', () => {
    const doctor = {
      className: 'Doctor',
      name: {
        first: 'John',
      },
      patient: {
        className: 'Patient',
        name: 'Jane Doe',
      },
    }

    expect(modelAndAttributeValue([doctor, doctor.patient], 'name')).toEqual(
      'Jane Doe'
    )
  })
})
