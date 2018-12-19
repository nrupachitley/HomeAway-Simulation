/* eslint-disable */
import React, { Component } from 'react';
import Auth from '../Auth';
import { Redirect } from 'react-router';
import _ from "lodash";
import { travelerdashboard } from '../../actions/index'
import { connect } from "react-redux";
import Pagination from "react-js-pagination";

class TravelerDashboard extends Component {
    constructor(props) {
        super(props);
        var user_id;
        if (this.props && this.props.location && this.props.location.state) {
            user_id = this.props.location.state.user_id
            console.log(" user_id = ", user_id)
        }
        this.state = {
            user_id: user_id,
            property_name: '',
            start_date: '',
            end_date: '',
            redirectToHome: false,
            loading: true,
            activePage: 1
        }
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
        this.props.travelerdashboard(data)
        setTimeout(() => {
            this.setState({ loading: false });
        },
            100
        );
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    handleChange(event) {
        let change = {}
        change[event.target.name] = event.target.value
        this.setState(change)
    }

    handleHome = (event) => {
        event.preventDefault();
        this.setState({ redirectToHome: true })
    }

    componentDidMount() {
        console.log("Checking Logged In");
        if (Auth.isUserAuthenticated()) {
            const data = {
                user_id: this.state.user_id
            }
            this.props.travelerdashboard(data)
            setTimeout(() => {
                this.setState({ loading: false });
            },
                500
            );
        }
    }

    renderProperties() {
        if (this.state.loading == true) {
            return (
                <div>Loading....</div>
            )
        }
        else {
            return _.map(this.props.results, property => {
                if (property.page != this.state.activePage) {
                    return (
                        <div></div>
                    )
                }
                return (
                    <div class="row">
                        <div class="col-xs-4">
                            <div class="carousel-inner" style={{ 'width': '100%' }}>
                                <img src={property.images} alt="property" style={{ 'width': '100%' }}></img>
                            </div>
                            <br></br>
                            <br></br>
                        </div>
                        <div class="col-sx-8">
                            <div class="media-body fnt-smaller">
                                <h4 class="media-heading" style={{ 'fontSize': '30px' }}>
                                    <small><b style={{ 'color': 'turquoise' }}>{property.headline}</b></small>
                                </h4>
                                <hr></hr>
                                <div>
                                    <p style={{ 'color': 'grey' }}>{property.location}</p>
                                    <p style={{ 'color': 'grey' }}>Property Type: {property.property_type}</p>
                                    <p style={{ 'color': 'grey' }}>Booking Type: {property.booking_type}</p>
                                </div>
                                <ul class="list-inline" style={{ 'color': 'grey' }}>
                                    <li>{property.bedrooms} Bed</li>
                                    <li style={{ "listStyle": "none" }}>|</li>
                                    <li>{property.bathrooms} Bath</li>
                                    <li style={{ "listStyle": "none" }}>|</li>
                                    <li>Accomodates {property.accomodates}</li>
                                    <li style={{ "listStyle": "none" }}>|</li>
                                    <li>Status {property.status}</li>
                                    <li style={{ "listStyle": "none" }}>|</li>
                                    <li>Price {property.price}</li>
                                </ul>
                                <p style={{ 'color': 'black' }}>Booked from {property.start_date} to {property.end_date}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        }
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
                        <li><a><button type="button" class="btn btn-primary btn-lg btn-block" onClick={this.handleHome}>Home</button></a></li>
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

        let redirectVar = null;
        if (!Auth.isUserAuthenticated()) {
            redirectVar = <Redirect to="/" />
        }

        if (this.state.redirectToHome)
            return (<Redirect to={{
                pathname: '/',
                state: {
                    user_id: this.state.user_id
                }
            }} />)


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

        return (
            <div>
                <div>
                    {redirectVar}
                    {navbar}
                    {secondnavbar}
                </div>
                <div class="container-fluid" style={{ "backgroundColor": "white", 'padding-left': '150px' }}>
                    <hr></hr>
                    <h2 align="center"><b>Dash Board</b></h2>
                    {this.renderProperties()}
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

function mapStateToProps(state) {
    console.log("DATA:", state.travelerdashboard)
    return {
        results: state.travelerdashboard,
    };
}

export default connect(mapStateToProps, { travelerdashboard })(TravelerDashboard);