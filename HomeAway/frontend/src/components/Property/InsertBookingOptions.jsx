/* eslint-disable */
import React from 'react';
import Auth from '../Auth';
import { Redirect } from 'react-router';
import './Property.css';
import { Field, reduxForm } from 'redux-form'
import renderField from './renderField'
import validate from './validate'

const InsertBookingOptions = props => {
    const { handleSubmit, previousPage } = props;
    let redirectVar = null;
    if (!Auth.isUserAuthenticated()) {
        redirectVar = <Redirect to="/signinowner" />
    }

    let navbar = null;
    navbar = (
        <nav class="navbar navbar-custom">
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

    let sidenavbar = null;
    sidenavbar = (
        <div class="sidenav">
            <a>Location</a>
            <a>Details</a>
            <a style={{ 'color': 'mediumblue' }}>Booking Options</a>
            <a>Photos</a>
            <a>Pricing</a>
        </div>
    )

    const renderError = ({ meta: { touched, error } }) =>
        touched && error ? <span style={{'color':'red'}}>{error}</span> : false

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {redirectVar}
                {navbar}
                {sidenavbar}
                <div class="row body">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >
                        <h3 align="center"><b>Host Your Property</b></h3>
                        <h4 align="center" style={{ 'color': 'black' }}><b>Booking Options</b></h4>
                        <div class="panel panel-info">
                            <div class="panel-body">
                                <div class=" col-xs-12 col-sm-8 ">
                                    <div class="row form-group ">
                                        <p style={{ 'color': 'black' }}><b>Select a booking method</b></p>
                                        <button style={{ 'padding': '5px', 'backgroundColor': 'yellow' }} class="btn btn-primary btn-xs">Recommended</button>
                                        <div class="radio" style={{ 'color': 'black', 'fontSize': '18px' }}>
                                            <label>
                                                <Field type="radio" name="booking_type" value='1' component="input" />
                                                {' '}
                                                Instant Booking &#9889;
                                            </label>
                                            <p style={{ 'color': 'black', 'padding': '9px' }}>Automatically accept booking requests from all traveler for dates you
                                            <br></br>have available, and the booking to your calendar.</p>
                                        </div>
                                        <div class="radio" style={{ 'color': 'black', 'fontSize': '18px' }}>
                                            <label>
                                                <Field type="radio" name="booking_type" value='2' component="input" />
                                                {' '}
                                                24-hour review
                                            </label>
                                            <p style={{ 'color': 'black', 'padding': '9px' }}>Allows 24 hour to communicate with guests and accept booking
                                            <br></br>requests.</p>
                                        </div>
                                        <Field name="booking_type" component={renderError} />
                                    </div>
                                </div>
                            </div>
                            <div class="panel-footer">
                                <a data-original-title="Broadcast Message" data-toggle="tooltip" type="button" class="btn btn-sm btn-primary"><i class="glyphicon glyphicon-envelope"></i></a>
                                <span class="pull-right">
                                    <button type="button" className="btn btn-sm btn-primary" onClick={previousPage}><i class="glyphicon glyphicon-edit"></i>Previous</button>
                                    <button type="submit" className="btn btn-sm btn-primary"><i class="glyphicon glyphicon-edit"></i>Next</button>
                                    <button data-original-title="Remove this user" data-toggle="tooltip" type="button" class="btn btn-sm btn-danger"><i class="glyphicon glyphicon-remove"></i></button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'wizard',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(InsertBookingOptions);
