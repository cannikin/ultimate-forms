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
  patient: {
    className: 'Patient',
    name: 'Jane Doe',
    dob: '01/01/1980',
  },
}

const NestedForm = () => {
  return (
    <div>
      <h1>Nested Form</h1>

      {/* try `remote={false}` */}
      <FormFor className="form" model={doctor}>
        <h2>Doctor</h2>
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
    </div>
  )
}

export default NestedForm
