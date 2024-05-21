import { Metadata } from '@redwoodjs/web'

import {
  FormFor,
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
}

const SimplePage = () => {
  return (
    <>
      <Metadata title="Simple" description="Simple page" />

      <h1>Simple Form</h1>

      <FormFor
        action="/.redwood/functions/form"
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
      </FormFor>
    </>
  )
}

export default SimplePage
