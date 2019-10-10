import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await Auth.signIn(this.state.email, this.state.password);
            this.props.setIsAuthenticated(true);
            this.props.history.push('/');
        } catch (error) {
            alert(error.message);
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    validateForm = () => {
        return this.state.email.length > 0
            && this.state.password.length > 0;
    };

    render() {
        return (
            <div className='Login'>
                <form onSubmit={ this.handleSubmit }>
                    <FormGroup controlId='email' bsSize='large'>
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type='email'
                            value={ this.state.email }
                            onChange={ this.handleChange }
                        />
                    </FormGroup>
                    <FormGroup controlId='password' bsSize='large'>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type='password'
                            value={ this.state.password }
                            onChange={ this.handleChange }
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize='large'
                        type='submit'
                        disabled={ !this.validateForm() }
                    >
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}

export default Login;