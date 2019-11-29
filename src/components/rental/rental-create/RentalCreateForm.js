import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../../../components/shared/form/Input';
import { Select } from '../../../components/shared/form/Select';
import { TextArea } from '../../../components/shared/form/TextArea';
import { FileUpload } from '../../../components/shared/form/FileUpload';
import { ResErrors } from '../../../components/shared/form/ResErrors';
import { required, minLength4 } from '../../../components/shared/form/Validators';

const RentalCreateForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, options, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="title"
        type="text"
        label="Title"
        className='form-control'
        component={Input}
      />
      <Field
        name="description"
        type="text"
        label="Description"
        className='form-control'
        rows='6'
        component={TextArea}
      />
      <Field
        name="city"
        type="text"
        label="City"
        className='form-control'
        component={Input}
      />
      <Field
        name="street"
        type="text"
        label="Street"
        className='form-control'
        component={Input}
      />
      <Field
        options={options}
        name="category"
        label="Category"
        className='form-control'
        component={Select}
      />
      <Field
        name="image"
        label="Image"
        component={FileUpload}
      />
      <Field
        name="bedrooms"
        type="number"
        label="Bedrooms"
        className='form-control'
        component={Input}
      />
      <Field
        name="dailyRate"
        type="text"
        label="DailyRate"
        symbol='$'
        className='form-control'
        component={Input}
      />
      <Field
        name="shared"
        type="checkbox"
        label="Shared"
        component={Input}
      />
      <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
        Submit
      </button>
      <ResErrors errors={errors}/>
    </form>
  )
}


export default reduxForm({
  form: 'rentalCreateForm',
  initialValues: { shared: false, category: 'apartment' }
})(RentalCreateForm)