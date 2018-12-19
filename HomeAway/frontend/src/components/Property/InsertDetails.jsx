/* eslint-disable */
import React, { Component } from 'react';
import Auth from '../Auth';
import { Redirect } from 'react-router';
import Calendar from 'react-calendar';
import './Property.css';
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
const house = ['Cottage', 'House', 'Campground', 'Hotel', 'Resort']

const renderHouseSelector = ({ input, className, meta: { touched, error } }) => (
    <div>
        <select {...input} className={className}>
            <option value="">Select Property Type</option>
            {house.map(val => <option value={val} key={val}>{val}</option>)}
        </select>
        {touched && error && <span>{error}</span>}
    </div>
)

const renderDatePicker = ({
    input: { value: onChange, ...input },
    meta: omitMeta,
    ...props }) => {
    return (
        <Calendar
            multiple
            onChange={(value) => {input.onChange(value)}}
            {...props.input}
            {...props}
        />
    )
}

const InsertDetails = props => {
    const { handleSubmit, previousPage } = props

    // render() {
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
            <a style={{ 'color': 'mediumblue' }}>Details</a>
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
                <div class="row body">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >
                        <h3 align="center"><b>Host Your Property</b></h3>
                        <h4 align="center" style={{ 'color': 'black' }}><b>Complete Property Details</b></h4>
                        <div class="panel panel-info">
                            <div class="panel-body">
                                <div class=" col-xs-12 col-sm-8 ">
                                    <div class="row form-group ">
                                        <Field
                                            className="form-control input-lg js-input-field"
                                            id="result"
                                            name="headline"
                                            type="text"
                                            component={renderField}
                                            label="Headline"
                                        />
                                    </div>
                                    <div class="row form-group ">
                                        <Field
                                            className="form-control input-lg js-input-field"
                                            style={{ 'padding': '60px 20px' }}
                                            id="result"
                                            name="property_description"
                                            type="text"
                                            component={renderField}
                                            label="Property Description"
                                        />
                                    </div>
                                    <div class="row form-group ">
                                        <Field
                                            className="form-control input-lg js-input-field"
                                            name="property_type"
                                            component={renderHouseSelector} />
                                    </div>
                                    <div class="row form-group ">
                                        <Field
                                            className="form-control input-lg js-input-field"
                                            id="result"
                                            name="bedroom"
                                            type="text"
                                            component={renderField}
                                            label="Bedroom"
                                        />
                                    </div>
                                    <div class="row form-group ">
                                        <Field
                                            className="form-control input-lg js-input-field"
                                            id="result"
                                            name="bathroom"
                                            type="text"
                                            component={renderField}
                                            label="Bathroom"
                                        />
                                    </div>
                                    <div class="row form-group ">
                                        <Field
                                            className="form-control input-lg js-input-field"
                                            id="result"
                                            name="accomodates"
                                            type="text"
                                            component={renderField}
                                            label="Accomodates"
                                        />
                                    </div>
                                    <div class="row form-group ">
                                        <Field
                                            className="form-control input-lg js-input-field"
                                            style={{ 'padding': '60px 20px' }}
                                            id="result"
                                            name="aminities"
                                            type="text"
                                            component={renderField}
                                            label="Amenities"
                                        />
                                    </div>
                                    <div class="row form-group ">
                                        <p style={{ 'fontSize': '18px' }}>Select start date when this propety is not available:</p>
                                        <Field
                                            name="start_date"
                                            component={renderDatePicker}
                                            type="text"
                                            multiple
                                        />
                                    </div>
                                    <div class="row form-group ">
                                        <p style={{ 'fontSize': '18px' }}>Select end date when this propety is not available:</p>
                                        <Field
                                            name="end_date"
                                            component={renderDatePicker}
                                            type="text"
                                            multiple
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="panel-footer">
                                <a data-original-title="Broadcast Message" data-toggle="tooltip" type="button" class="btn btn-sm btn-primary"><i class="glyphicon glyphicon-envelope"></i></a>
                                <span class="pull-right">
                                    <button type="button" className="btn btn-sm btn-primary" onClick={previousPage}><i class="glyphicon glyphicon-edit"></i>Previous</button>
                                    <button type="submit" className="btn btn-primary"><i class="glyphicon glyphicon-edit"></i>Next</button>
                                    <button data-original-title="Remove this user" data-toggle="tooltip" type="button" class="btn btn-sm btn-danger"><i class="glyphicon glyphicon-remove"></i></button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
    // }

}
export default reduxForm({
    form: 'wizard',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(InsertDetails);


