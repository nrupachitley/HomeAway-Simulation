/* eslint-disable */
import React, { Component } from 'react';
import './Profile.css';
import { Redirect } from 'react-router';
import Auth from '../Auth'
import { connect } from "react-redux";
import { getprofile } from '../../actions/index';
import { updateprofile } from '../../actions/index'
import { uploadsinglephoto } from '../../actions/index'
import { insertprofile } from '../../actions/index'

class InsertProfile extends Component {
    constructor(props) {
        super(props);
        console.log(" user id = ", this.props.location.state.redirectid)
        console.log(" email = ", this.props.location.state.email)
        this.state = {
            user_id: this.props.location.state.redirectid,
            name: '',
            email: this.props.location.state.email,
            phone_number: '',
            about_me: '',
            city: '',
            country: '',
            company: '',
            school: '',
            hometown: '',
            language: '',
            gender: '',
            profile_image: '',
            temp_image: '',
            redirecting_page: this.props.location.state.redirecting_page,
            message: '',
            nameError: '',
            cityError: '',
            countryError: '',
            phone_numberError: '',
            phone_numberError: '',
            loading: true,
            redirectlink: false
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
    }

    validate = () => {
        let isError = false;
        const errors = {
            nameError: '',
            cityError: '',
            countryError: '',
            phone_numberError: ''
        };

        if (this.state.name == null) {
            isError = true;
            errors.nameError = "Name cannot be null";
            this.setState({ nameError: errors.nameError })
        }

        if (this.state.city == null) {
            isError = true;
            errors.cityError = "City cannot be null";
            this.setState({ cityError: errors.cityError })
        }

        if (this.state.country == null) {
            isError = true;
            errors.countryError = "Country cannot be null";
            this.setState({ countryError: errors.countryError })
        }

        if (this.state.phone_number == null) {
            isError = true;
            errors.phone_numberError = "Phone Number cannot be null";
            this.setState({ phone_numberError: errors.phone_numberError })
        }

        return isError;
    }

    onFormSubmit = event => {
        event.preventDefault();
        const err = this.validate();
        if (!err) {
            if (this.state.redirecting_page === 'myProfile') {
                const formData = new FormData();
                formData.append("profile_image", this.state.temp_image);
                formData.append("userID", this.state.user_id);
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                const data = {
                    user_id: this.state.user_id,
                    name: this.state.name,
                    email: this.state.email,
                    phone_number: this.state.phone_number,
                    about_me: this.state.about_me,
                    city: this.state.city,
                    country: this.state.country,
                    company: this.state.company,
                    school: this.state.school,
                    hometown: this.state.hometown,
                    language: this.state.language,
                    gender: this.state.gender,
                };
                const final_data = { formData: formData, config: config }
                if (this.state.temp_image) {
                    this.props.uploadsinglephoto(final_data)
                }
                this.props.updateprofile(data)
                setTimeout(() => {
                    this.setState({ redirectlink: true });
                },
                    1000
                );
            }
            else {
                const formData = new FormData();
                formData.append("profile_image", this.state.temp_image);
                formData.append("userID", this.state.user_id);
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                const data = {
                    user_id: this.state.user_id,
                    name: this.state.name,
                    email: this.state.email,
                    phone_number: this.state.phone_number,
                    about_me: this.state.about_me,
                    city: this.state.city,
                    country: this.state.country,
                    company: this.state.company,
                    school: this.state.school,
                    hometown: this.state.hometown,
                    language: this.state.language,
                    gender: this.state.gender,
                };
                const final_data = { formData: formData, config: config }
                this.props.insertprofile(data, (message) => {
                    console.log("message = ", message)
                    this.props.uploadsinglephoto(final_data)
                })
                setTimeout(() => {
                    this.setState({ redirectlink: true });
                },
                    1000
                );
            }
        }
    }

    async componentDidMount() {
        if (this.state.redirecting_page === 'myProfile') {
            const data = { user_id: this.state.user_id }
            await this.props.getprofile(data)
        }
        setTimeout(() => {
            var profile_image;
            if (this.props.initialValues.profileImage != null) {
                profile_image = "./static/profileImage/" + this.props.initialValues.profileImage;
            }
            this.setState({ profile_image: profile_image });
            this.setState({ name: this.props.initialValues.name });
            if (this.props.initialValues.email != null) {
                this.setState({ email: this.props.initialValues.email });
            }
            this.setState({ about_me: this.props.initialValues.about_me });
            this.setState({ phone_number: this.props.initialValues.phone_no });
            this.setState({ country: this.props.initialValues.country });
            this.setState({ company: this.props.initialValues.company });
            this.setState({ hometown: this.props.initialValues.hometown });
            this.setState({ school: this.props.initialValues.school });
            this.setState({ language: this.props.initialValues.language });
            this.setState({ gender: this.props.initialValues.gender });
            this.setState({ city: this.props.initialValues.city });
            this.setState({ loading: false });
        },
            500
        );
    }


    renderProfile() {
        if (this.state.loading == true) {
            return (
                <div>Loading...</div>
            )
        }
        else {
            return (
                <div class="row">
                    <div class=" profile-user-photo">
                        <div id="profileImage" align="center">
                            <img class="img-circle" alt='Image' src={this.state.profile_image} style={{ 'height': '300px' }}></img>
                            <div style={{ 'padding-top': '0%' }}><label for="pImage" class="round round-lg hollow blue" onChange={this.fileChangedHandler.bind(this)}><span class="glyphicon glyphicon-pencil"></span></label></div>
                            <input type="file" id="pImage" style={{ 'display': 'none' }} onChange={this.fileChangedHandler.bind(this)}></input>
                            <h2 class="user-name"> {this.state.name} </h2>
                        </div>
                    </div>
                    <hr></hr>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >
                        <div class="panel panel-info">
                            <div class="panel-body">
                                <div class=" col-xs-12 col-sm-8 ">
                                    <div class="row form-group ">
                                        <input class="form-control input-lg js-input-field" type="text" id="result" name="name" value={this.state.name} onChange={this.handleChange.bind(this)} placeholder="Name" ></input>
                                        <span style={{ 'color': 'Red' }}>{this.state.nameError}</span>
                                    </div>
                                    <div class="row form-group ">
                                        <input class="form-control input-lg js-input-field" type="text" id="result" name="email" value={this.state.email} onChange={this.handleChange.bind(this)} placeholder="Email"></input>
                                    </div>
                                    <div class="row form-group ">
                                        <input class="form-control input-lg js-input-field" type="text" id="result" name="phone_number" value={this.state.phone_number} onChange={this.handleChange.bind(this)} placeholder="Phone Number"></input>
                                        <span style={{ 'color': 'Red' }}>{this.state.phone_numberError}</span>
                                    </div>
                                    <div class="row form-group ">
                                        <input class="form-control input-lg js-input-field" type="text" id="result" name="about_me" value={this.state.about_me} onChange={this.handleChange.bind(this)} placeholder="About Me"></input>
                                    </div>
                                    <div class="row form-group ">
                                        <input class="form-control input-lg js-input-field" type="text" id="result" name="city" value={this.state.city} onChange={this.handleChange.bind(this)} placeholder="City" ></input>
                                        <span style={{ 'color': 'Red' }}>{this.state.cityError}</span>
                                    </div>
                                    <div class="row form-group ">
                                        <input class="form-control input-lg js-input-field" type="text" id="result" name="country" value={this.state.country} onChange={this.handleChange.bind(this)} placeholder="Country"></input>
                                        <span style={{ 'color': 'Red' }}>{this.state.countryError}</span>
                                    </div>

                                    <div class="row form-group ">
                                        <input class="form-control input-lg js-input-field" type="text" id="result" name="company" value={this.state.company} onChange={this.handleChange.bind(this)} placeholder="Company"></input>
                                    </div>

                                    <div class="row form-group ">
                                        <input class="form-control input-lg js-input-field" type="text" id="result" name="school" value={this.state.school} onChange={this.handleChange.bind(this)} placeholder="School" ></input>
                                    </div>

                                    <div class="row form-group ">
                                        <input class="form-control input-lg js-input-field" type="text" id="result" name="hometown" value={this.state.hometown} onChange={this.handleChange.bind(this)} placeholder="Hometown"></input>
                                    </div>

                                    <div class="row form-group ">
                                        <input class="form-control input-lg js-input-field" type="text" id="result" name="language" value={this.state.language} onChange={this.handleChange.bind(this)} placeholder="Language"></input>
                                    </div>
                                    <div class="row form-group ">
                                        <select class="form-control input-lg js-input-field" name="gender" value={this.state.gender} onChange={this.handleChange.bind(this)}>
                                            <option value="0">Gender</option>
                                            <option value="1">Female</option>
                                            <option value="2">Male</option>
                                        </select>
                                    </div>
                                    <div class="row form-group ">
                                    </div>
                                    <div class="row form-group ">
                                    </div>
                                </div>
                            </div>
                            <div class="panel-footer">
                                <a data-original-title="Broadcast Message" data-toggle="tooltip" type="button" class="btn btn-sm btn-primary"><i class="glyphicon glyphicon-envelope"></i></a>
                                <span class="pull-right">
                                    <button onClick={this.onFormSubmit} href="#" data-original-title="Edit this user" data-toggle="tooltip" type="button" class="btn btn-sm btn-warning"><i class="glyphicon glyphicon-edit"></i>Submit</button>
                                    <button onClick={this.clearInput} data-original-title="Remove this user" data-toggle="tooltip" type="button" class="btn btn-sm btn-danger"><i class="glyphicon glyphicon-remove"></i></button>
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        let redirectVar = null;

        if (!Auth.isUserAuthenticated()) {
            redirectVar = <Redirect to="/" />
        }

        if (this.state.redirectlink) {
            return (<Redirect to={{
                pathname: '/',
                state: { user_id: this.state.user_id }
            }} />)
        }

        let print_message = null;
        if (this.state.message) {
            print_message = this.state.message;
        }

        let navbar = null;
        navbar = (
            <nav class="navbar">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href='#'><img alt="HomeAway logo" class="site-header-logo__img img-responsive" role="presentation" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"></img></a>
                    </div>
                    <ul class="nav navbar-nav navbar-right">
                        <li><img alt="Logo" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"></img></li>
                    </ul>
                </div>
            </nav>
        )

        return (
            <div>
                {navbar}
                {redirectVar}
                <alert align="center">{print_message}</alert>
                <div>
                    {this.renderProfile()}
                    {/*{this.state.loaded ? this.renderProfile() : null}*/}
                </div>
            </div>
        )

    }

    handleChange(event) {
        // this.setState({hometown: event.value})
        let change = {}
        change[event.target.name] = event.target.value
        this.setState(change)
    }

    fileChangedHandler = (event) => {
        const file = event.target.files[0];
        console.log("file: ", file);
        this.setState({ temp_image: file });
    }

}

function mapStateToProps(state) {
    console.log(state.profile)
    return {
        initialValues: state.profile,
    };
}

export default connect(mapStateToProps, { getprofile, updateprofile, uploadsinglephoto, insertprofile })(InsertProfile)