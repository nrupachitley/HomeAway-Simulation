/* eslint-disable */
import React from 'react';
import Auth from '../Auth';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router';
import './Property.css';
import { Field, reduxForm } from 'redux-form'
import validate from './validate'

const InsertPhotos = props => {
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
            <a>Booking Options</a>
            <a style={{ 'color': 'mediumblue' }}>Photos</a>
            <a>Pricing</a>
        </div>
    )

    const adaptFileEventToValue = delegate => e => delegate(e.target.files);

    const FileInput = ({
        input: { value: omitValue, onChange, onBlur, ...inputProps },
        meta: { touched, error },
        ...props
    }) => {
        return (
            <div>
                <input
                    onChange={adaptFileEventToValue(onChange)}
                    onBlur={adaptFileEventToValue(onBlur)}
                    type="file"
                    multiple
                    {...props.input}
                    {...props}
                />
                {touched && error && <span style={{ 'color': 'red', 'paddingLeft':'270px' }}>{error}</span>}
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {redirectVar}
                {navbar}
                {sidenavbar}
                <div class="row body">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >
                        <h3 align="center"><b>Host Your Property</b></h3>
                        <h4 align="center" style={{ 'color': 'black' }}><b>Upload photos of your property</b></h4>
                        <div class="panel panel-info">
                            <div class="panel-body">
                                <div class=" col-xs-12 ">
                                    <div class="row form-group ">
                                        <div class="well well-lg" style={{ 'height': '300px', 'width': '100%' }}>
                                            <h1 align='center'>Upload photos here</h1>
                                            <div align='center' style={{ 'paddingTop': '60px' }}><label for="imageUpload" class="btn btn-primary btn-xs" style={{ 'height': '25px', 'width': 'auto', 'fontSize': '15px' }} multiple><b>SELECT PHOTOS TO UPLOAD</b></label></div>
                                            <Field
                                                name="property_images"
                                                id='imageUpload'
                                                style={{ 'display': 'none' }}
                                                multiple
                                                component={FileInput}
                                                type="file"
                                            />
                                        </div>
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
})(InsertPhotos);

