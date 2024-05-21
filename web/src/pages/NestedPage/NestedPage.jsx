import { Metadata } from '@redwoodjs/web'

import {
  FieldsFor,
  FormFor,
  HiddenField,
  Label,
  TextField,
  Submit,
} from 'src/lib/formHelpers'

const doctor = {
  className: 'Doctor',
  id: 10101,
  name: 'Dr. John Doe',
  specialty: 'Cardiology',
  patient: {
    className: 'Patient',
    name: 'Jane Doe',
    dob: '01/01/1980',
  },
}

const NestedPage = () => {
  return (
    <>
      <Metadata title="Nested" description="Nested page" />

      <h1>Nested Form</h1>

      {/* try `remote={false}` */}
      <FormFor
        action="/.redwood/functions/form"
        className="form"
        model={doctor}
      >
        <h2>Doctor</h2>
        <HiddenField name="id" />

        <Label name="name" />
        <TextField name="name" />

        <Label name="specialty" />
        <TextField name="specialty" />

        <FieldsFor model={doctor.patient}>
          <h2>Patient</h2>
          <Label name="name" />
          <TextField name="name" />

          <Label name="dob" />
          <TextField name="dob" />
        </FieldsFor>

        <Submit>Save</Submit>
      </FormFor>
    </>
  )
}

export default NestedPage
