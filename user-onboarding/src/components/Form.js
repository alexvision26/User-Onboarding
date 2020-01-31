import React, {
    useState,
    useEffect
  } from "react";
  import {
    withFormik,
    Form,
    Field
  } from "formik";
  import * as Yup from "yup";
  import axios from "axios";
  import ls from 'local-storage';

const UserForm = ({values, errors, touched, status}) => {
    const [newUser, setNewUser] = useState([]);

    useEffect(() => {
        console.log('status has changed', status)
        status && setNewUser(newUser => [...newUser, status])
    }, [status])

    return (
<>
        <div className='title'>
            <h1>Team Sign Up!</h1>
            </div>

        <div className='user-input'>
            <Form>
                <div className='name-form'>
                <label htmlFor='name'>Name: </label><br/>
                <Field
                id='name'
                type='text'
                name='name'
                /><br/>
                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}
                </div>
                
                <div className='email-form'>
                <label htmlFor='email'>Email: </label><br/>
                <Field
                id='email'
                type='email'
                name='email'
                /><br/>
                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}
                </div>

                <div className='pass-form'>
                <label htmlFor='password'>Password: </label><br/>
                <Field
                id='password'
                type='password'
                name='password'
                /> <br/>
                {errors.password && (
                    <p>{errors.password}</p>
                )}
                </div>

                <div className='tos-form'>
                <label htmlFor='tos'>Agree to Terms: </label>
                <Field
                id='tos'
                type='checkbox'
                name='tos'
                checked={values.tos}
                />
                {touched.tos && errors.tos && (
                    <p>{errors.tos}</p>
                )}
                </div>

                <button type='submit'>Sign Up</button>
                
            </Form>
        </div>
        <div className='cards'>
        {newUser.map(user => {
                    return (
                        <div className='user-card'>
                            <h3>Welcome, {user.name}!</h3>
                            <h5>Email: {user.email}</h5>
                        </div>
                    )
                })}
                </div>
        </>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, tos}) {
        return {
            name: name || '',
            email: email || '',
            password: '',
            tos: tos || false
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('* Name is required').min(3, 'Name must be at least 3 characters'),
        email: Yup.string().required('* Email is required').email('Must be a valid email address'),
        password: Yup.string().required('* Password is required').min(6, 'Password must be at least 6 characters'),
        tos: Yup.boolean().oneOf([true], '* You must agree to the Terms of Service'),
    }),
    handleSubmit(
        values, {setStatus, resetForm}){
            console.log('submitting', values);
            axios.post('https://reqres.in/api/users/', values).then(res => {
                console.log('success', res)
                setStatus(res.data)
                resetForm();
            })
            .catch(error => {
                console.log(error.res)
            })
        }
})(UserForm);

export default FormikUserForm;