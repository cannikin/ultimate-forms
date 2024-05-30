import jsonFormat from 'json-format'

import { Metadata } from '@redwoodjs/web'

import {
  FieldsFor,
  FormWith,
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
      appointments: [
        {
          className: 'Appointment',
          id: 742,
          location: 'San Diego, CA',
          date: '01/01/2021',
        },
      ],
    },
    {
      className: 'Patient',
      id: 456,
      name: 'Jeff Generic',
      dob: '01/01/1970',
      appointments: [
        {
          className: 'Appointment',
          id: 789,
          location: 'San Diego, CA',
          date: '01/01/2021',
        },
        {
          className: 'Appointment',
          id: 112,
          location: 'San Francisco, CA',
          date: '01/02/2021',
        },
      ],
    },
  ],
}

const ArrayPage = () => {
  return (
    <>
      <Metadata title="Array" description="Array page" />

      <h1>Nested Array Form</h1>

      <div className="flex space-x-4">
        <div className="mt-12 w-1/2  p-2">
          <pre className="rounded bg-white p-2 text-xs">
            {jsonFormat(doctor, { type: 'space', size: 2 })}
          </pre>
        </div>

        <div className="w-1/2">
          {/* try `remote={false}` */}
          <FormWith
            url="/.redwood/functions/form"
            className="form"
            model={doctor}
          >
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

                {patient.appointments.map((appointment, index) => (
                  <FieldsFor
                    model={appointment}
                    index={appointment.id}
                    key={index}
                    className="fields ml-8"
                  >
                    <div className="flex space-x-2">
                      <div>
                        <Label name="location" label="Appointment Location" />
                        <TextField name="location" />
                      </div>
                      <div>
                        <Label name="date" label="Date" />
                        <TextField name="date" />
                      </div>
                    </div>
                  </FieldsFor>
                ))}
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
