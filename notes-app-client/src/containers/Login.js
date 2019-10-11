import React, { useState } from 'react';
import { useFormFields } from '../libs/hooksLib';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import { Auth } from 'aws-amplify';
import './Login.css';

export default function Login(props) {
    const [ fields, handleFieldChange ] = useFormFields({
        email: '',
        password: ''
    });
    const [ isLoading, setIsLoading ] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setIsLoading(true);

        try {
            await Auth.signIn(fields.email, fields.password);
            props.setIsAuthenticated(true);
            props.history.push('/');
        } catch (error) {
            alert(error.message);
        }
    }

    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    return (
        <div className='Login'>
            <form onSubmit={ handleSubmit }>
                <FormGroup controlId='email' bsSize='large'>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type='email'
                        value={ fields.email }
                        onChange={ handleFieldChange }
                    />
                </FormGroup>
                <FormGroup controlId='password' bsSize='large'>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type='password'
                        value={ fields.password }
                        onChange={ handleFieldChange }
                    />
                </FormGroup>
                <LoaderButton
                    block
                    bsSize='large'
                    type='submit'
                    isLoading={ isLoading }
                    disabled={ !validateForm() }
                >
                    { isLoading ? 'Loading...' : 'Login' }    
                </LoaderButton>
            </form>
        </div>
    );
}