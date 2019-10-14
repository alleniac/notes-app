import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import LoaderButton from '../components/LoaderButton';
import {
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock
} from 'react-bootstrap';
import { useFormFields } from '../libs/hooksLib';
import './Signup.css';

export default function Signup(props) {
    const [ fields, handleFieldChange ] = useFormFields({
        email: '',
        password: '',
        confirmPassword: '',
        confirmationCode: ''
    });
    const [ isLoading, setIsLoading ] = useState(false);
    const [ newUser, setNewUser ] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const newUser = await Auth.signUp({
                username: fields.email,
                password: fields.password
            });
            setIsLoading(false);
            setNewUser(newUser);
        } catch (error) {
            alert(error.message);
            setIsLoading(false);
        }
    }

    async function handleConfirmationSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        try {
            await Auth.confirmSignUp(fields.email, fields.confirmationCode);
            await Auth.signIn(fields.email, fields.password);

            props.setIsAuthenticated(true);
            props.history.push('/');
        } catch (error) {
            alert(error.message);
            setIsLoading(false);
        }
    }

    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.confirmPassword === fields.password
        );
    }

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    }

    function renderForm() {
        return (
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
                <FormGroup controlId='confirmPassword' bsSize='large'>
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        type='password'
                        value={ fields.confirmPassword }
                        onChange={ handleFieldChange }
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type='submit'
                    bsSize='large'
                    isLoading={ isLoading }
                    disabled={ !validateForm() }
                >
                    { isLoading ? 'Loading' : 'Signup' }
                </LoaderButton>
            </form>
        );
    }

    function renderConfirmationForm() {
        return (
            <form onSubmit={ handleConfirmationSubmit }>
                <FormGroup controlId='confirmationCode' bsSize='large'>
                    <ControlLabel>Confirmation Code</ControlLabel>
                    <FormControl
                        autoFocus
                        type='tel'
                        onChange={ handleFieldChange }
                        value={ fields.confirmationCode }
                    />
                    <HelpBlock>Please check your email for the code.</HelpBlock>
                </FormGroup>
                <LoaderButton
                    block
                    type='submit'
                    bsSize='large'
                    isLoading={ isLoading }
                    disabled={ !validateConfirmationForm() }
                >
                    { isLoading ? 'Verifying' : 'Verify' }
                </LoaderButton>
            </form>
        );
    }

    return (
        <div className='Signup'>
            { newUser === null ? renderForm() : renderConfirmationForm() }
        </div>
    );
}