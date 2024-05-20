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
      id: 1,
      name: 'Jane Doe',
      dob: '01/01/1980',
    },
    {
      className: 'Patient',
      id: 2,
      name: 'Jeff Generic',
      dob: '01/01/1970',
    },
  ],
}

const NestedArrayForm = () => {
  return (
    <div>
      <h1>Nested Array Form</h1>

      {/* try `remote={false}` */}
      <FormFor className="form" model={doctor}>
        <h2>Doctor</h2>
        <Label name="name" />
        <TextField name="name" />

        <Label name="specialty" />
        <TextField name="specialty" />

        {doctor.patients.map((patient, index) => (
          <FieldsFor model={patient} index={patient.id} key={index}>
            <h2>Patients</h2>
            <Label name="name" />
            <TextField name="name" />

            <Label name="dob" />
            <TextField name="dob" />
          </FieldsFor>
        ))}

        <Submit>Save</Submit>
      </FormFor>
    </div>
  )
}

export default NestedArrayForm
