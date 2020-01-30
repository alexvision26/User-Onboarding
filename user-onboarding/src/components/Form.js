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

const UserForm = ({values, errors, touched, status}) => {
    const [newUser, setNewUser] = useState([]);

    useEffect(() => {
        console.log('status has changed', status)
        status && setNewUser(newUser => [...newUser, status])
    }, [status])

    return (
        <div>
            <Form>
                <label htmlFor='name'>Name: </label>
                <Field
                id='name'
                type='text'
                name='name'
                /><br/>
                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}
                
                <label htmlFor='email'>Email: </label>
                <Field
                id='email'
                type='email'
                name='email'
                /><br/>
                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}

                <label htmlFor='password'>Password: </label>
                <Field
                id='password'
                type='password'
                name='password'
                /> <br/>
                {errors.password && (
                    <p>{errors.password}</p>
                )}

                <label htmlFor='tos'>I agree to the Terms of Service: </label>
                <Field
                id='tos'
                type='checkbox'
                name='tos'
                checked={values.tos}
                /><br/>
                {touched.tos && errors.tos && (
                    <p>{errors.tos}</p>
                )}

                <button type='submit'>Submit</button>
                
            </Form>

            {newUser.map(user => {
                return (
                    <ul>
                        <h3>Welcome, {user.name}!</h3>
                        <li>Email: {user.email}</li>
                    </ul>
                )
            })}
        </div>
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