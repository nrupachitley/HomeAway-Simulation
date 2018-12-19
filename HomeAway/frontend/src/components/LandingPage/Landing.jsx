/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Auth from '../Auth';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { getprofileimg } from '../../actions';
import { getproperties } from '../../actions';

class Landing extends Component {
    constructor(props) {
        super(props);
        var userID = null;
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.user_id) {
            userID = this.props.location.state.user_id
            console.log(" user id = ", this.props.location.state.user_id)
        }
        this.state = {
            user_id: userID,
            loading: true
        };
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "text-danger" : ""}`;

        return (
            <div className={className}>
                <input className="form-control" placeholder={field.label} type={field.type} style={field.style} {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }

    async onSubmit(values) {
        console.log("VALUES :" + values)
        this.props.getproperties(values)
        await this.props.history.push({
            pathname: '/bookProperty',
            state: { city: values.city, start_date: values.start_date, end_date: values.end_date, accomodates: values.accomodates, user_id: this.state.user_id }
        });
    }

    componentDidMount() {
        var flag = Auth.isTokenValid()
        console.log("flag", flag)
        if (flag == true) {
            console.log("user_id: ", this.state.user_id);
            const data = {
                user_id: this.state.user_id
            }
            this.props.getprofileimg(data);
            setTimeout(() => {
                this.setState({ loading: false });
            },
                500
            );
        }
        else {
            this.props.history.push('/')
        }
    }

    render() {
        const { handleSubmit } = this.props;
        let navbar = null;
        var flag = Auth.isTokenValid()
        if (flag) {
            console.log("Logged In");
            navbar = (
                <nav class="navbar">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="/"><img alt="HomeAway logo" class="site-header-logo__img img-responsive" role="presentation" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg"></img></a>
                        </div>
                        <ul class="nav navbar-nav navbar-right">
                            <li><a>
                                <img alt="USMap" src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" height="20" width="25"></img>
                            </a></li>
                            <li><a href="#"> TripBoards</a></li>
                            <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><img alt="ProfileImage" src={this.props.profile_image} id="pi"></img> {this.props.traveler_name}<span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li><Link to={{ pathname: '/travelerdashboard', state: { user_id: this.state.user_id } }} style={{ 'padding-left': '0%', 'color': 'blue' }}><span class="glyphicon glyphicon-briefcase"></span> MyTrips</Link></li>
                                    <li><Link to={{ pathname: '/insertprofile', state: { redirectid: this.state.user_id, redirecting_page: 'myProfile' } }} style={{ 'padding-left': '13%', 'color': 'blue' }}><span class="glyphicon glyphicon-user"></span> MyAccount</Link></li>
                                    <li><Link to={{ pathname: '/travelerMessages', state: { user_id: this.state.user_id, redirecting_link: 'inbox', user_name: this.props.traveler_name } }} style={{ 'padding-right': '35%', 'color': 'blue' }}><span class="glyphicon glyphicon-inbox"></span> Inbox</Link></li>
                                    <li><Link to="/" onClick={this.handleLogout} style={{ 'padding-left': '0%', 'color': 'blue' }}><span class="glyphicon glyphicon-log-out"></span>  Logout</Link></li>
                                </ul>
                            </li>
                            <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"> Help<span class="caret"></span></a></li>
                            <li><a><button class="btn btn-lg">List your property</button></a></li>
                            <li><img alt="Logo" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"></img></li>
                        </ul>
                    </div>
                </nav>
            )
        }
        else {
            console.log("Not Logged In");
            navbar = (
                <nav class="navbar">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="/"><img alt="HomeAway logo" class="site-header-logo__img img-responsive" role="presentation" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg"></img></a>
                        </div>
                        <ul class="nav navbar-nav navbar-right">
                            <li><a>
                                <img alt="Flag" src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" height="20" width="25"></img>
                            </a></li>
                            <li><a href="#"> TripBoards</a></li>
                            <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"> Login<span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li><Link to={{ pathname: '/signin', state: { person_type: 'Traveler' } }} style={{ 'color': 'blue', 'padding-left': '6%' }}><b>Traveler Login</b></Link></li>
                                    <li><Link to={{ pathname: '/signin', state: { person_type: 'Owner' } }} style={{ 'color': 'blue', 'padding-left': '0%' }}><b>Owner Login</b></Link></li>
                                </ul>
                            </li>
                            <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"> Help<span class="caret"></span></a></li>
                            <li><a><button class="btn btn-lg">List your property</button></a></li>
                            <li><img alt="Logo" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"></img></li>
                        </ul>
                    </div>
                </nav>
            )
        }

        if (this.state.loading == true && flag) {
            return (
                <div></div>
            )
        }
        else {
            return (
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div class="bg">
                        {navbar}
                        <div class="container centerDiv">
                            <h1 style={{ 'color': 'white' }}>Book beach houses, tents, cottage
                <br></br>and more, on Planet</h1>
                            <form class="form-inline">
                                <div class="input-group" style={{ 'margin': '3px' }}>
                                    <span class="input-group-addon" style={{ 'border-top-left-radius': '10px', 'border-bottom-left-radius': '10px' }}><i class="glyphicon glyphicon-search"></i></span>
                                    <Field
                                        className="form-control"
                                        style={{ 'border-top-right-radius': '10px', 'border-bottom-right-radius': '10px', 'height': '40px' }}
                                        name="city"
                                        label="Where are you going?"
                                        type="text"
                                        component={this.renderField}
                                    />
                                </div>
                                <div class="input-group" style={{ 'margin': '3px' }}>
                                    <span class="input-group-addon" style={{ 'border-top-left-radius': '10px', 'border-bottom-left-radius': '10px' }}><i class="glyphicon glyphicon-calendar"></i></span>
                                    <Field
                                        class="form-control"
                                        style={{ 'border-top-right-radius': '10px', 'border-bottom-right-radius': '10px', 'height': '40px' }}
                                        name="start_date"
                                        placeholder="Arrival"
                                        type="date"
                                        component={this.renderField}
                                    />
                                </div>
                                <div class="input-group" style={{ 'margin': '3px' }}>
                                    <span class="input-group-addon" style={{ 'border-top-left-radius': '10px', 'border-bottom-left-radius': '10px' }}><i class="glyphicon glyphicon-calendar"></i></span>
                                    <Field
                                        class="form-control"
                                        style={{ 'border-top-right-radius': '10px', 'border-bottom-right-radius': '10px', 'height': '40px' }}
                                        name="end_date"
                                        placeholder="Arrival"
                                        type="date"
                                        component={this.renderField}
                                    />
                                </div>
                                <div class="input-group" style={{ 'margin': '3px' }}>
                                    <span class="input-group-addon" style={{ 'border-top-left-radius': '10px', 'border-bottom-left-radius': '10px' }}><i class="glyphicon glyphicon-user"></i></span>
                                    <Field
                                        class="form-control"
                                        style={{ 'border-top-right-radius': '10px', 'border-bottom-right-radius': '10px', 'height': '40px' }}
                                        name="accomodates"
                                        label="Number of Guests"
                                        type="text"
                                        component={this.renderField}
                                    />
                                </div>
                                <button class="btn btn-primary btn-round-lg btn-lg">Search</button>
                            </form>
                            <div className="fixed">
                                <span style={{ 'paddingRight': '100px' }}>Your hole vacation starts here</span>
                                <span style={{ 'paddingRight': '100px' }}>Book and stay with confidence</span>
                                <span>Your vacation your way</span>
                            </div>
                        </div>
                    </div>
                </form>

            )
        }
    }

    handleLogout = () => {
        Auth.deauthenticateUser();
        window.location = '/'
    }
}

function mapStateToProps(state) {
    console.log("STATE:", state.getprofileimg)
    if (state.getprofileimg != null) {
        return {
            traveler_name: state.getprofileimg.name,
            profile_image: "./static/profileImage/" + state.getprofileimg.profile_image
        };
    }
}

export default reduxForm({
    form: "landingForm"
})(connect(mapStateToProps, { getprofileimg, getproperties })(Landing));
