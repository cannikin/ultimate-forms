import jsonFormat from 'json-format'

import { Metadata } from '@redwoodjs/web'

import {
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
}

const SimplePage = () => {
  return (
    <>
      <Metadata title="Simple" description="Simple page" />

      <h1>Simple Form</h1>

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
            // remote={false}
          >
            <HiddenField name="id" />

            <Label name="name" />
            <TextField name="name" />

            <Label name="specialty" />
            <TextField name="specialty" />

            <Submit>Save</Submit>
          </FormWith>
        </div>

        <div className="w-1/2">
          <h2>No model</h2>
          <FormWith url="/.redwood/functions/form" className="form">
            <Label name="doctor[name]" label="Name" />
            <TextField name="doctor[name]" />

            <Label name="doctor[specialty]" label="Specialty" />
            <TextField name="doctor[specialty]" />

            <Submit>Save</Submit>
          </FormWith>
        </div>
      </div>
    </>
  )
}

export default SimplePage
