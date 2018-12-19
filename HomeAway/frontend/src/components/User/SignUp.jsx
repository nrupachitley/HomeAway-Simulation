import React, { Component } from 'react';
import './SignIn.css';
import { Link } from 'react-router-dom';
import { signup } from '../../actions/index';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Auth from '../Auth'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            person_type: this.props.location.state.person_type,
            message: "",
            email: ""
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
        console.log("Values: ", values)
        this.setState({ email: values.Email })
        const data = {
            values: values,
            person_type: this.state.person_type
        }
        this.props.signup(data)
        setTimeout(() => {
            if (this.props.data.success === false) {
                this.setState({ message: "Email Exists" });
            }
            else {
                var object = { value: this.props.data.token, timestamp: new Date().getTime() }
                Auth.authenticateUser(JSON.stringify(object))
                console.log("raw id = ", this.props.data.id)
                var id = this.props.data.id;
                console.log("id = ", this.props.data.id)
                if (this.state.person_type === 'Owner') {
                    this.props.history.push({
                        pathname: '/insertproperty',
                        state: { owner_id: id }
                    })
                } else {
                    this.props.history.push({
                        pathname: '/insertprofile',
                        state: {
                            redirectid: id,
                            email: this.props.data.email
                        }
                    })
                }
            }
        },
            500
        );
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
                    <br />
                    <div class="signIncontainer">
                        <div class="login-form main-div">
                            <div class="panel">
                                <h2>{this.state.person_type} Sign Up for HomeAway</h2>
                                <p>Already have an account? <span><Link to={{ pathname: '/signin', state: { person_type: this.state.person_type } }}>Signin {this.state.person_type}</Link></span></p>
                                <span aria-hidden="true"><b style={{ 'color': 'red' }}>{print_message}</b></span>
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
                            <button class="btn btn-primary">SignUp</button>
                            <hr></hr>
                            <div class="centered-hr text-center">
                                <span class="text-center"><em>or</em></span>
                            </div>
                            <br></br>
                            <div class="omb_login">
                                <div class="omb_socialButtons">
                                    <a href="facebook.com" class="btn btn-lg btn-block omb_btn-facebook">
                                        <span class="hidden-xs">Login With Facebook</span>
                                    </a>
                                    <a href="google.com" class="btn btn-lg btn-block omb_btn-google">
                                        <span class="hidden-xs">Login With Google+</span>
                                    </a>
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
    console.log("STATE:", state.signup)
    if (state.signup != null) {
        return {
            data: state.signup
        };
    }
}

export default reduxForm({
    validate,
    form: "signupForm"
})(connect(mapStateToProps, { signup })(SignUp));