import jsonFormat from 'json-format'

import { Metadata } from '@redwoodjs/web'

import {
  FieldsFor,
  FormWith,
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

      <div className="flex items-start">
        <div className="mt-12 w-1/2  p-2">
          <pre className="rounded bg-white p-2 text-xs">
            {jsonFormat(doctor, { type: 'space', size: 2 })}
          </pre>
        </div>

        <div className="w-1/2">
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
          </FormWith>
        </div>
      </div>
    </>
  )
}

export default ArrayPage
