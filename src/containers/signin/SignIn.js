import React, { Component } from 'react';

class SignIn extends Component {
    constructor(props) {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    // Event on email input
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    // Event on password input
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    // Event on sign In button
    onSubmitSignIn = () => {
        fetch('https://pacific-woodland-59794.herokuapp.com/signIn', { // fetch implements by default the GET method
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ // send JSON object back as string to server
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(res => res.json())
        .then(user => {
            if (user.id) { // Check if user with this id exists
                this.props.loadUser(user);
                this.props.onRouteChange('Home');
            }
        });
    }

    render() {
        const {onRouteChange} = this.props;
         return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label  className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email"
                                name="email-address"  
                                id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label  className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"/>
                            </div>
                        </fieldset>
                        <div className="">
                            {/* Event declared above fires when clicking on the button */}
                            <input onClick={this.onSubmitSignIn} 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('Register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    } 
}

export default SignIn;