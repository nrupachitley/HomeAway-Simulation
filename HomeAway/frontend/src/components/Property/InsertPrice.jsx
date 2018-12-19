/* eslint-disable */
import React from 'react';
import Auth from '../Auth';
import { Redirect } from 'react-router';
import './Property.css';
import { Field, reduxForm } from 'redux-form'
import renderField from './renderField'
import validate from './validate'

const currency = ['US Dollar', 'Canadian Dollar', 'Euros']

const renderCurrency = ({ input, className, meta: { touched, error } }) => (
    <div>
        <select {...input} className={className}>
            <option value="">Select Currency</option>
            {currency.map(val => <option value={val} key={val}>{val}</option>)}
        </select>
        {touched && error && <span style={{'color':'red'}}>{error}</span>}
    </div>
)

const InsertPrice = props => {
    const { handleSubmit, previousPage, pristine, submitting } = props;
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
            <a>Photos</a>
            <a style={{ 'color': 'mediumblue' }}>Pricing</a>
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
                        <h4 align="center" style={{ 'color': 'black' }}><b>How much do you want to charge?</b></h4>
                        <div class="panel panel-info">
                            <div class="panel-body">
                                <div class=" col-xs-12 ">
                                    <div class="row form-group ">
                                        <Field name="pricetoggle" component={renderCurrency} className="form-control input-lg js-input-field" />
                                    </div>
                                    <div class="row form-group ">
                                        <Field
                                            name="price"
                                            type="text"
                                            id="result"
                                            component={renderField}
                                            placeholder="Price"
                                            className="form-control input-lg js-input-field"
                                        />
                                        <br></br>
                                        <p style={{ 'color': 'black', 'fontSize': '15px' }}>per night</p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-footer">
                                <a data-original-title="Broadcast Message" data-toggle="tooltip" type="button" class="btn btn-sm btn-primary"><i class="glyphicon glyphicon-envelope"></i></a>
                                <span class="pull-right">
                                    <button type="button" className="btn btn-sm btn-primary" onClick={previousPage}><i class="glyphicon glyphicon-edit"></i>Previous</button>
                                    <button type="submit" disabled={pristine || submitting} className="btn btn-sm btn-primary" ><i class="glyphicon glyphicon-edit"></i>Submit</button>
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
})(InsertPrice);


