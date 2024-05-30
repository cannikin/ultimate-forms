import jsonFormat from 'json-format'

import { Metadata } from '@redwoodjs/web'

import {
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
  phone: ['123-456-7890', '098-765-4321'],
}

const Array2Page = () => {
  return (
    <>
      <Metadata title="Array" description="Array page" />

      <h1>Array Elements Form</h1>

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

            {doctor.phone.map((phone, index) => (
              <div key={index}>
                <Label name="phone[]" label={`Phone ${index + 1}`} />
                <TextField name="phone[]" defaultValue={phone} />
              </div>
            ))}

            <Submit>Save</Submit>
          </FormWith>
        </div>
      </div>
    </>
  )
}

export default Array2Page
