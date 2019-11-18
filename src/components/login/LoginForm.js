import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../shared/form/Input';
import { ResErrors } from '../shared/form/ResErrors';
import { required, minLength4 } from '../shared/form/Validators';

const LoginForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="email"
        type="email"
        label="Email"
        className='form-control'
        component={Input}
        validate={[required, minLength4]}
      />
      <Field
        name="password"
        type="password"
        label="Password"
        className='form-control'
        component={Input}
        validate={[required]}
      />
      <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
        Login
      </button>
      <ResErrors errors={errors} />
    </form>
  )
}


export default reduxForm({
  form: 'loginForm'
})(LoginForm)