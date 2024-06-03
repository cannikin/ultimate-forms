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
  cars: [
    {
      make: 'Rolls Royce',
      model: 'Phantom',
    },
    {
      make: 'Tesla',
      model: 'Model S',
    },
  ],
}

const ArrayOfObjectsPage = () => {
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
          <FormWith url="/.redwood/functions/form" className="form">
            <h2>Doctor</h2>
            <HiddenField name="doctor[id]" />

            <Label name="doctor[name]" label="Name" />
            <TextField name="doctor[name]" />

            <Label name="doctor[specialty]" label="Specialty" />
            <TextField name="doctor[specialty]" />

            <Label name="Cars" className="font-semibold" />
            {doctor.cars.map((car, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 space-y-2"
              >
                <Label name="doctor[cars][][make]" label="Make" />
                <TextField
                  name="doctor[cars][][make]"
                  defaultValue={car.make}
                />
                <Label name="doctor[cars][][model]" label="Model" />
                <TextField
                  name="doctor[cars][][model]"
                  defaultValue={car.model}
                />
              </div>
            ))}

            <Submit>Save</Submit>
          </FormWith>
        </div>
      </div>
    </>
  )
}

export default ArrayOfObjectsPage
