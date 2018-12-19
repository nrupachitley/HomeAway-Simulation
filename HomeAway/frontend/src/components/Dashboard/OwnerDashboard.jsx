/* eslint-disable */
import React, { Component } from 'react';
import Auth from '../Auth';
import { Redirect } from 'react-router';
import _ from "lodash";
import { ownerdashboard } from '../../actions/index'
import { connect } from "react-redux";
import { allproperties } from '../../actions/index'
import { updatebookingstatus } from '../../actions/index'
import Pagination from "react-js-pagination";

class OwnerDashboard extends Component {
    constructor(props) {
        super(props);
        var user_id;
        if (this.props && this.props.location && this.props.location.state) {
            user_id = this.props.location.state.user_id
            console.log(" user_id = ", user_id)
        }
        this.state = {
            user_id: user_id,
            message: '',
            start_date: '',
            end_date: '',
            property_name: '',
            redirectToAddProperty: false,
            redirectToInbox: false,
            loading: true,
            activePage: 1,
            activePageProperty: 1
        }
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    handlePropertyPageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePageProperty: pageNumber });
    }

    handleChange(event) {
        let change = {}
        change[event.target.name] = event.target.value
        this.setState(change)
    }

    addProperty = (event) => {
        event.preventDefault();
        this.setState({ redirectToAddProperty: true })
    }

    manageInbox = (event) => {
        event.preventDefault();
        this.setState({ redirectToInbox: true })
    }

    handleLogout = (event) => {
        event.preventDefault();
        Auth.deauthenticateUser();
        window.location = '/';
    }

    handleSearch = (event) => {
        event.preventDefault();
        const data = {
            user_id: this.state.user_id,
            property_name: this.state.property_name,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        };
        console.log("data= ", data);
        this.setState({ loading: true })
        this.props.ownerdashboard(data)
        setTimeout(() => {
            this.setState({ loading: false });
        },
            100
        );
    }

    handleConfirmation = (booking_id, id) => {
        console.log("booking_id: ", booking_id)
        console.log("id: ", id)
        const data = {
            booking_id: booking_id,
            property_id: id
        }
        this.props.updatebookingstatus(data, () => {
            this.setState({ message: "Booking Status Updated!" })
        })
    }

    async componentDidMount() {
        console.log("Checking Logged In");
        if (Auth.isUserAuthenticated()) {
            const data = {
                user_id: this.state.user_id
            }
            await this.props.ownerdashboard(data);
            await this.props.allproperties(data);
            setTimeout(() => {
                this.setState({ loading: false });
            },
                500
            );
        }
    }

    renderProperties() {
        return _.map(this.props.properties, property => {
            console.log("property", property.location)
            if (property.page != this.state.activePageProperty) {
                return (
                    <div></div>
                )
            }
            return (
                <div class="row">
                    <div class="col-xs-4">
                        <img src={property.image} alt="property_image" style={{ 'width': '100%', 'height': '100%' }}></img>
                        <br></br>
                        <br></br>
                    </div>
                    <div class="col-xs-8">
                        <h4 class="media-heading" style={{ 'fontSize': '25px' }}>
                            <small style={{ 'color': 'turquoise' }}>{property.headline}</small>
                        </h4>
                        <hr></hr>
                        <div>
                            <p style={{ 'color': 'grey' }}>{property.location}</p>
                        </div>
                    </div>
                </div>
            )
        })
    }

    renderBookings() {
        return _.map(this.props.bookings, property => {
            console.log("status: ", property.status)
            if (property.status === 'Confirm') {
                if (property.page != this.state.activePage) {
                    return (
                        <div></div>
                    )
                }
                return (
                    <div class="row">
                        <div class="col-xs-4">
                            <div class="carousel-inner">
                                <img src={property.images} alt="property" style={{ 'width': '100%' }}></img>
                            </div>
                            <br></br>
                            <br></br>
                        </div>
                        <div class="col-xs-8">
                            <div class="media-body fnt-smaller">
                                <h4 class="media-heading" style={{ 'fontSize': '25px' }}>
                                    <small style={{ 'color': 'turquoise' }}>{property.headline}</small>
                                </h4>
                                <hr></hr>
                                <div>
                                    <p style={{ 'color': 'grey' }}>{property.location}</p>
                                    <p style={{ 'color': 'grey' }}>Property Type: {property.property_type}</p>
                                </div>
                                <ul class="list-inline" style={{ 'color': 'grey' }}>
                                    <li>{property.bedrooms} Bed</li>
                                    <li style={{ "listStyle": "none" }}>|</li>
                                    <li>{property.bathrooms} Bath</li>
                                    <li style={{ "listStyle": "none" }}>|</li>
                                    <li>Accomodates {property.accomodates}</li>
                                    <li style={{ "listStyle": "none" }}>|</li>
                                    <li>Status {property.status}</li>
                                </ul>
                                <p style={{ 'color': 'black' }}><b>Booked from {property.start_date} to {property.end_date}</b></p>
                                <p style={{ 'color': 'black' }}><b>Booked by: {property.customer_name}. Email: {property.customer_email}</b></p>
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                if (property.page != this.state.activePage) {
                    return (
                        <div></div>
                    )
                }
                return (
                    <div class="row">
                        <span align="center" style={{ 'color': 'red' }}>{this.state.message}</span>
                        <div class="col-xs-4">
                            <div class="carousel-inner">
                                <img src={property.images} alt="property" style={{ 'width': '100%' }}></img>
                            </div>
                            <br></br>
                            <br></br>
                        </div>
                        <div class="col-xs-8">
                            <div class="media-body fnt-smaller">
                                <h4 class="media-heading" style={{ 'fontSize': '25px' }}>
                                    <small style={{ 'color': 'turquoise' }}>{property.headline}</small>
                                </h4>
                                <hr></hr>
                                <div>
                                    <p style={{ 'color': 'grey' }}>{property.location}</p>
                                    <p style={{ 'color': 'grey' }}>Property Type: {property.property_type}</p>
                                </div>
                                <ul class="list-inline" style={{ 'color': 'grey' }}>
                                    <li>{property.bedrooms} Bed</li>
                                    <li style={{ "listStyle": "none" }}>|</li>
                                    <li>{property.bathrooms} Bath</li>
                                    <li style={{ "listStyle": "none" }}>|</li>
                                    <li>Accomodates {property.accomodates}</li>
                                    <li style={{ "listStyle": "none" }}>|</li>
                                    <li>Status {property.status}</li>
                                </ul>
                                <p style={{ 'color': 'black' }}><b>Booked from {property.start_date} to {property.end_date}</b></p>
                                <p style={{ 'color': 'black' }}><b>Booked by: {property.customer_name}. Email: {property.customer_email}</b></p>
                                <button type="button" class="btn btn-warning" onClick={this.handleConfirmation.bind(this, property.booking_id, property.id)}>Need Action</button>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    }

    render() {
        let navbar = null;
        navbar = (
            <nav class="navbar navbar-custom">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#"><img alt="HomeAway logo" class="site-header-logo__img img-responsive" role="presentation" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"></img></a>
                    </div>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a><button type="button" class="btn btn-primary btn-lg btn-block" onClick={this.manageInbox}><span class="glyphicon glyphicon-inbox"></span>Inbox</button></a></li>
                        <li><a><button type="button" class="btn btn-primary btn-lg btn-block" onClick={this.addProperty}><span class="glyphicon glyphicon-plus"></span>Add Property</button></a></li>
                        <li><a><button type="button" class="btn btn-primary btn-lg btn-block" onClick={this.handleLogout}><span class="glyphicon glyphicon-log-out"></span>Logout</button></a></li>
                        <li><a><img alt="Logo" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"></img></a></li>
                    </ul>
                </div>
            </nav>
        )

        let secondnavbar = null;
        secondnavbar = (
            <nav class="navbar navbar-css">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <div>
                            <span style={{ 'fontSize': '20px', 'paddingLeft': '20px' }}><b>Property Name</b></span>
                            <span style={{ 'fontSize': '20px', 'paddingLeft': '50px' }}><b>Start Date</b></span>
                            <span style={{ 'fontSize': '20px', 'paddingLeft': '90px' }}><b>End Date</b></span>
                        </div>
                        <form class="form-inline">
                            <input class="form-control input-md js-input-field" type="text" value={this.state.property_name} name="property_name" onChange={this.handleChange.bind(this)} style={{ 'margin': '10px', 'height': '45px' }} placeholder="Property Name" />
                            <input class="form-control input-md js-input-field" type="text" value={this.state.start_date} name="start_date" onChange={this.handleChange.bind(this)} style={{ 'margin': '10px', 'height': '45px' }} placeholder="YYYY-MM-DD" />
                            <input class="form-control input-md js-input-field" type="text" value={this.state.end_date} name="end_date" onChange={this.handleChange.bind(this)} style={{ 'margin': '10px', 'height': '45px' }} placeholder="YYYY-MM-DD" />
                            <button class="btn btn-lg btn-primary active" onClick={this.handleSearch} style={{ 'fontSize': '15px', 'height': '45px' }}>Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        )

        if (this.state.redirectToAddProperty) {
            return (<Redirect to={{
                pathname: '/insertProperty',
                state: { owner_id: this.state.user_id }
            }} />)
        }

        if (this.state.redirectToInbox) {
            return (<Redirect to={{
                pathname: '/ownerMessages',
                state: { owner_id: this.state.user_id, redirecting_link: 'inbox' }
            }} />)
        }

        let redirectVar = null;
        if (!Auth.isUserAuthenticated()) {
            redirectVar = <Redirect to="/" />
        }

        let pagination = null;
        pagination = (
            <div align="center">
                <Pagination
                    totalItemsCount={20}
                    activePage={this.state.activePage}
                    pageRangeDisplayed={3}
                    itemsCountPerPage={5}
                    onChange={this.handlePageChange.bind(this)}
                />
            </div>
        )

        let paginationProperty = null;
        paginationProperty = (
            <div align="center">
                <Pagination
                    totalItemsCount={10}
                    activePage={this.state.activePageProperty}
                    pageRangeDisplayed={2}
                    itemsCountPerPage={5}
                    onChange={this.handlePropertyPageChange.bind(this)}
                />
            </div>
        )

        let display = null;
        if (this.props.bookings == null) {
            display = <h2 style={{ 'padding-left': '20px' }}>You Have No Bookings Yet!!!</h2>
        }

        if (this.state.loading == true) {
            return (
                <div>Loading....</div>
            )
        }
        else {
            return (
                <div>
                    <div>
                        {redirectVar}
                        {navbar}
                    </div>
                    <div class="container-fluid" style={{ "backgroundColor": "white", 'padding-left': '150px' }}>
                        <hr></hr>
                        <h2 align="center" style={{ 'color': 'grey' }}><b>All Your Properties</b></h2>
                        {this.renderProperties()}
                        {paginationProperty}
                        <h2 align="center" style={{ 'color': 'grey' }}><b>Booking History</b></h2>
                        <div>{secondnavbar}</div>
                        <hr></hr>
                        {display}
                        {this.renderBookings()}
                        {pagination}
                    </div>
                    <div class="panel centered-hr text-center">
                        <p>This is an assignment, but is too long to be an assignment.<br></br>
                            Terms and Conditions and Privacy Policy.
                    ©2018 SJSU. None rights reserved.</p>
                    </div>
                </div>
            )

        }
    }
}

function mapStateToProps(state) {
    console.log("BOOKINGS:", state.ownerdashboard)
    console.log("PROPERTIES:", state.properties)
    return {
        bookings: state.ownerdashboard,
        properties: state.properties
    };
}

export default connect(mapStateToProps, { ownerdashboard, allproperties, updatebookingstatus })(OwnerDashboard);