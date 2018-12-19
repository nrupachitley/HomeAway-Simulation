/* eslint-disable */
import React from 'react';
import Auth from '../Auth';
import { Redirect } from 'react-router';
import './Property.css';
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'

const InsertLocation = props => {
    const { handleSubmit} = props;
    let redirectVar = null;
    if (!Auth.isUserAuthenticated()) {
        redirectVar = <Redirect to="/" />
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
            <a style={{ 'color': 'mediumblue' }}>Location</a>
            <a>Details</a>
            <a>Booking Options</a>
            <a>Photos</a>
            <a>Pricing</a>
        </div>
    )

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {redirectVar}
                {navbar}
                {sidenavbar}
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >
                        <h3 align="center"><b>Host Your Property</b></h3>
                        <h4 align="center" style={{ 'color': 'black' }}><b>Welcome! Enter Property Address</b></h4>
                        <div class="panel panel-info">
                            <div class="panel-body">
                                <div class=" col-xs-12 col-sm-8 ">
                                    <div class="row form-group ">
                                        <Field
                                            className="form-control input-lg js-input-field"
                                            id="result"
                                            name="address"
                                            type="text"
                                            component={renderField}
                                            label="Address"
                                        />
                                    </div>
                                    <div class="row form-group ">
                                        <Field
                                            className="form-control input-lg js-input-field"
                                            id="result"
                                            name="city"
                                            type="text"
                                            component={renderField}
                                            label="City"
                                        />
                                    </div>
                                    <div class="row form-group ">
                                        <Field
                                            className="form-control input-lg js-input-field"
                                            id="result"
                                            name="state"
                                            type="text"
                                            component={renderField}
                                            label="State"
                                        />
                                    </div>
                                    <div class="row form-group ">
                                        <Field
                                            className="form-control input-lg js-input-field"
                                            id="result"
                                            name="zip_code"
                                            type="text"
                                            component={renderField}
                                            label="Zip Code"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="panel-footer">
                                <a data-original-title="Broadcast Message" data-toggle="tooltip" type="button" class="btn btn-sm btn-primary"><i class="glyphicon glyphicon-envelope"></i></a>
                                <span class="pull-right">
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
})(InsertLocation);
