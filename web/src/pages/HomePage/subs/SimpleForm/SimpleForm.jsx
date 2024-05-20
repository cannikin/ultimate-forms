import { FormFor, Label, TextField, Submit } from 'src/lib/formHelpers'

const doctor = {
  className: 'Doctor',
  name: 'Dr. John Doe',
  specialty: 'Cardiology',
}

const SimpleForm = () => {
  return (
    <div>
      <h1>Simple Form</h1>

      <FormFor className="form" model={doctor}>
        <Label name="name" />
        <TextField name="name" />

        <Label name="specialty" />
        <TextField name="specialty" />

        <Submit>Save</Submit>
      </FormFor>
    </div>
  )
}

export default SimpleForm
