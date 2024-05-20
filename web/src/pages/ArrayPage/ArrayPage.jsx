import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import {
  FieldsFor,
  FormFor,
  Label,
  TextField,
  Submit,
} from 'src/lib/formHelpers'

const doctor = {
  className: 'Doctor',
  name: 'Dr. John Doe',
  specialty: 'Cardiology',
  patients: [
    {
      className: 'Patient',
      id: 123,
      name: 'Jane Doe',
      dob: '01/01/1980',
    },
    {
      className: 'Patient',
      id: 456,
      name: 'Jeff Generic',
      dob: '01/01/1970',
    },
  ],
}

const ArrayPage = () => {
  return (
    <>
      <Metadata title="Array" description="Array page" />

      <h1>Nested Array Form</h1>

      {/* try `remote={false}` */}
      <FormFor className="form" model={doctor}>
        <h2>Doctor</h2>
        <Label name="name" />
        <TextField name="name" />

        <Label name="specialty" />
        <TextField name="specialty" />

        <h2>Patients</h2>
        {doctor.patients.map((patient, index) => (
          <FieldsFor
            model={patient}
            index={patient.id}
            key={index}
            className="fields"
          >
            <Label name="name" />
            <TextField name="name" />

            <Label name="dob" />
            <TextField name="dob" />
          </FieldsFor>
        ))}

        <Submit>Save</Submit>
      </FormFor>
    </>
  )
}

export default ArrayPage
