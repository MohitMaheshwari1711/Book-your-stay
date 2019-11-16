import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../shared/form/Input';
import { ResErrors } from '../shared/form/ResErrors';

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="username"
        component="input"
        type="text"
        label="Username"
        className='form-control'
        component={Input}
      />
      <Field
        name="email"
        component="input"
        type="email"
        label="Email"
        className='form-control'
        component={Input}
      />
      <Field
        name="password"
        component="input"
        type="password"
        label="Password"
        className='form-control'
        component={Input}
      />
      <Field
        name="passwordConfirmation"
        component="input"
        type="password"
        label="Password Confirmation"
        className='form-control'
        component={Input}
      />
      <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
        Register
      </button>
      <ResErrors errors={errors}/>
    </form>
  )
}

const validate = values => {
  const errors = {};
  if ((values.username) && (values.username.length < 4)) {
    errors.username = 'Username min length is 4 characters!';
  }

  if (!values.email) {
    errors.email = 'Please enter email';
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Please enter password confirmation';
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = 'Password must be same';
  }

  return errors;
}

export default reduxForm({
  form: 'registerForm',
  validate: validate
})(RegisterForm)