import jsonFormat from 'json-format'

import { Metadata } from '@redwoodjs/web'

import {
  FieldsFor,
  FormWith,
  HiddenField,
  Label,
  TextField,
  Submit,
} from 'src/lib/helpers'

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

      <div className="flex items-start">
        <div className="w-1/2">
          <h2>With `doctor` model</h2>
          <pre className="w-1/2 rounded bg-white p-2 text-xs">
            {jsonFormat(doctor, { type: 'space', size: 2 })}
          </pre>
          <FormWith
            url="/.redwood/functions/form"
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
          </FormWith>
        </div>

        <div className="w-1/2">
          <h2>No model</h2>
          <FormWith url="/.redwood/functions/form" className="form">
            <h2>Doctor</h2>

            <Label name="doctor[name]" label="Name" />
            <TextField name="doctor[name]" />

            <Label name="doctor[specialty]" label="Specialty" />
            <TextField name="doctor[specialty]" />

            <FieldsFor name="patient">
              <h2>Patient</h2>
              <Label name="name" />
              <TextField name="name" />

              <Label name="dob" />
              <TextField name="dob" />
            </FieldsFor>

            <Submit>Save</Submit>
          </FormWith>
        </div>
      </div>
    </>
  )
}

export default NestedPage
