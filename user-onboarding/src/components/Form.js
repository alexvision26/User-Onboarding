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
                />
                
                <label htmlFor='email'>Email: </label>
                <Field
                id='email'
                type='email'
                name='email'
                />

                <label htmlFor='password'>Password: </label>
                <Field
                id='password'
                type='password'
                name='password'
                />

                <label htmlFor='tos'>Terms of Service: </label>
                <Field
                id='tos'
                type='checkbox'
                name='tos'
                />

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
    handleSubmit(
        values, {setStatus, resetForm}){
            console.log('submitting', values);
            axios.post('https://reqres.in/api/users/', values).then(res => {
                console.log('success', res)
                setStatus(res.data)
            })
            .catch(error => {
                console.log(error.res)
            })
        }
})(UserForm);

export default FormikUserForm;