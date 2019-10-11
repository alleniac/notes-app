import React, { useState } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import { Auth } from 'aws-amplify';
import './Login.css';

export default function Login(props) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setIsLoading(true);

        try {
            await Auth.signIn(email, password);
            props.setIsAuthenticated(true);
            props.history.push('/');
        } catch (error) {
            alert(error.message);
        }
    }

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    return (
        <div className='Login'>
            <form onSubmit={ handleSubmit }>
                <FormGroup controlId='email' bsSize='large'>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type='email'
                        value={ email }
                        onChange={ e => setEmail(e.target.value) }
                    />
                </FormGroup>
                <FormGroup controlId='password' bsSize='large'>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type='password'
                        value={ password }
                        onChange={ e => setPassword(e.target.value) }
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