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

      {/* try `remote={false}` */}
      <FormFor
        action="/.redwood/functions/form"
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
                <Label name="location" label="Appointment Location" />
                <TextField name="location" />

                <Label name="date" label="Appointment Date" />
                <TextField name="date" />
              </FieldsFor>
            ))}
          </FieldsFor>
        ))}

        <Submit>Save</Submit>
      </FormFor>
    </>
  )
}

export default ArrayPage
