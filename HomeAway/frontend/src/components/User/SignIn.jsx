/* eslint-disable */
import React, { Component } from 'react';
import './SignIn.css';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signin } from '../../actions'
import Auth from '../Auth'

class SignIn extends Component {
    constructor(props) {
        super(props);
        var person_type;
        if (this.props && this.props.location && this.props.location.state) {
            person_type = this.props.location.state.person_type
            console.log(" person_type = ", this.props.location.state.person_type)
        }
        this.state = {
            person_type: person_type,
            message: ""
        }
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "text-danger" : ""}`;

        return (
            <div className={className}>
                <input className="form-control" placeholder={field.label} type={field.type} {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        console.log("values:", values)
        const data = {
            values: values,
            person_type: this.state.person_type
        }
        this.props.signin(data,(response) => {
            console.log("response: ", response)
            if (this.state.person_type === 'Traveler') {
                if (response.result) {
                    this.setState({ message: response.result })
                }
                else {
                    // this.setState({ user_id: response.id })
                    var object = {value: response.token, timestamp: new Date().getTime()}
                    Auth.authenticateUser(JSON.stringify(object))
                    this.props.history.push({
                        pathname: '/',
                        state: { user_id: response.id }
                    });
                }
            } else {
                if (response.result) {
                    this.setState({ message: response.result })
                }
                else {
                    // this.setState({ user_id: response.id });
                    var object = {value: response.token, timestamp: new Date().getTime()}
                    Auth.authenticateUser(JSON.stringify(object))
                    this.props.history.push({
                        pathname: '/getOwnerDashboard',
                        state: { user_id: response.id }
                    });
                }
            }
        });
    }

    render() {
        const { handleSubmit } = this.props;

        let navbar = null;
        navbar = (
            <nav class="navbar">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="/"><img alt="HomeAway logo" class="site-header-logo__img img-responsive" role="presentation" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"></img></a>
                    </div>
                    <ul class="nav navbar-nav navbar-right">
                        <li><img alt="Logo" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"></img></li>
                    </ul>
                </div>
            </nav>
        )

        let print_message = null;
        if (this.state.message) {
            print_message = this.state.message;
        }

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div>
                    <div>
                        {navbar}
                    </div>
                    <div class="signIncontainer">
                        <div class="login-form">
                            <div class="main-div">
                                <div class="panel">
                                    <h2>Log in to HomeAway</h2>
                                    <p>Need an account? <span><Link to={{ pathname: '/signup', state: { person_type: this.state.person_type } }}>Signup {this.state.person_type}</Link></span></p>
                                    <span aria-hidden="true"><b>{print_message}</b></span>
                                </div>
                                <div class="form-group">
                                    <Field
                                        name="Email"
                                        label="Enter Email"
                                        type="text"
                                        component={this.renderField}
                                    />
                                </div>

                                <div class="form-group">
                                    <Field
                                        name="Password"
                                        label="Enter Password"
                                        type="password"
                                        component={this.renderField}
                                    />
                                </div>
                                <div class="forgot">
                                    <a href="#">Forgot password?</a>
                                </div>
                                <button class="btn btn-primary">Login</button>
                                <hr></hr>
                                <div class="centered-hr text-center">
                                    <span class="text-center"><em>or</em></span>
                                </div>
                                <br></br>
                                <div class="omb_login">
                                    <div class="omb_socialButtons">
                                        <a href="#" class="btn btn-lg btn-block omb_btn-facebook">
                                            <span class="hidden-xs">Login With Facebook</span>
                                        </a>
                                        <a href="#" class="btn btn-lg btn-block omb_btn-google">
                                            <span class="hidden-xs">Login With Google+</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel centered-hr text-center">
                        <p>This is an assignment, but is too long to be an assignment.<br></br>
                            Terms and Conditions and Privacy Policy.
                    ©2018 SJSU. None rights reserved.</p>
                    </div>
                </div>

            </form>
        )
    }
}

function validate(values) {

    const errors = {};

    // Validate the inputs from 'values'
    if (!values.Email) {
        errors.Email = "Enter Email";
    }
    if (!values.Password) {
        errors.Password = "Enter Password";
    }

    return errors;
}

function mapStateToProps(state) {
    console.log(state.signin)
    if (state.signin) {
        return {
            data: state.data
        };
    }
}

export default reduxForm({
    validate,
    form: "signinForm"
})(connect(mapStateToProps, { signin })(SignIn));



