/* eslint-disable */
import React, { Component } from 'react';
import _ from "lodash";
import { Link } from 'react-router-dom';
import './booking.css';
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import { getproperties } from '../../actions';

class Booking extends Component {
    constructor(props) {
        super(props);
        var city;
        var start_date;
        var end_date;
        var accomodates;
        var user_id;
        if (this.props && this.props.location && this.props.location.state) {
            city = this.props.location.state.city
            start_date = this.props.location.state.start_date
            end_date = this.props.location.state.end_date
            accomodates = this.props.location.state.accomodates
            user_id = this.props.location.state.user_id
        }
        this.state = {
            city: city,
            start_date: start_date,
            end_date: end_date,
            accomodates: accomodates,
            user_id: user_id,
            price: '',
            bedrooms: '',
            loading: '',
            activePage: 1
        }
    }

    handleSearch = (event) => {
        event.preventDefault();
        const data = {
            city: this.state.city,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            price: this.state.price,
            bedrooms: this.state.bedrooms,
            accomodates: this.state.accomodates
        };
        console.log("data= ", data);
        this.setState({ loading: true })
        this.props.getproperties(data)
        setTimeout(() => {
            this.setState({ loading: false });
        },
            200
        );
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    renderProperties() {
        if (this.state.loading) {
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
                var flag = true
                let imageCaraousal = _.map(property.images, image => {
                    if (flag) {
                        flag = false
                        return (
                            <div class="item active">
                                <img src={image} alt="image" style={{ 'height': '100%' }}></img>
                            </div>
                        )
                    } else {
                        return (
                            <div class="item">
                                <img src={image} alt="image" style={{ 'height': '100%' }}></img>
                            </div>
                        )
                    }
                })
                var link = '#' + property.p_id
                console.log("link: ", link)
                return (
                    <div class="row">
                        <div class="col-xs-4">
                            <div id={property.p_id} class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    {imageCaraousal}
                                </div>
                                <a class="left carousel-control" href={link} data-slide="prev">
                                    <span class="glyphicon glyphicon-chevron-left"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="right carousel-control" href={link} data-slide="next">
                                    <span class="glyphicon glyphicon-chevron-right"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                            <br></br>
                            <br></br>
                        </div>
                        <div class="col-xs-8 thumbnail">
                            <div class="media-body fnt-smaller">
                                <h4 class="media-heading" style={{ 'padding-left': '10px', 'padding-top': '10px' }}>
                                    <Link to={{ pathname: '/getPropertyDetail', state: { start_date: this.state.start_date, end_date: this.state.end_date, accomodates: this.state.accomodates, property_id: property.p_id, user_id: this.state.user_id, city: this.state.city, property_headline: property.headline, owner_id: property.owner_id } }} style={{ 'fontSize': '25px' }}><strong>{property.headline}</strong></Link>
                                </h4>
                                <hr></hr>
                                <div>
                                    <p style={{ 'fontSize': '15px', 'padding-left': '10px', 'color': 'grey' }}>{property.location}</p>
                                    <p style={{ 'fontSize': '15px', 'padding-left': '10px', 'color': 'grey' }}>Property Type: {property.property_type}</p>
                                    <p style={{ 'fontSize': '15px', 'padding-left': '10px', 'color': 'grey' }}>Booking Type: {property.booking_type}</p>
                                </div>
                                <ul class="list-inline mrg-0 btm-mrg-10 clr-535353">
                                    <li style={{ 'fontSize': '15px', 'padding-left': '10px', 'color': 'grey' }}>{property.bedrooms} Bed</li>
                                    <li style={{ "listStyle": "none", 'color': 'grey' }}>|</li>
                                    <li style={{ 'fontSize': '15px', 'padding-left': '10px', 'color': 'grey' }}>{property.bathrooms} Bath</li>
                                    <li style={{ "listStyle": "none", 'color': 'grey' }}>|</li>
                                    <li style={{ 'fontSize': '15px', 'padding-left': '10px', 'color': 'grey' }}>Accomodates {property.accomodates}</li>
                                </ul>
                                <div style={{ 'backgroundColor': '#ECF0F1', 'height': '50px', 'paddingTop': '10px', 'padding-left': '10px' }}>
                                    <span style={{ 'fontSize': '15px' }}><b style={{ 'color': 'black' }}>{property.price}</b><b style={{ 'color': 'black' }}> per night</b></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            });
        }
    }

    render() {
        let navbar = null;
        navbar = (
            <nav class="navbar navbar-custom">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#" style={{ 'top': '5px' }}><img alt="HomeAway logo" class="site-header-logo__img img-responsive" role="presentation" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"></img></a>
                    </div>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a>
                            <img alt="USMap" src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" height="20" width="25"></img>
                        </a></li>
                        <li><a href="#" style={{ 'color': 'navy', 'fontSize': '15px', 'top': '5px' }}> TripBoards</a></li>
                        <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#" style={{ 'color': 'navy', 'fontSize': '15px', 'top': '5px' }}> Login<span class="caret"></span></a></li>
                        <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#" style={{ 'color': 'navy', 'fontSize': '15px', 'top': '5px' }}> Help<span class="caret"></span></a></li>
                        <li><a><button class="btn btn-lg" style={{ 'border-color': 'gray', 'fontSize': '15px' }}>List your property</button></a></li>
                        <li><img alt="Logo" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"></img></li>
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
                            <span style={{ 'fontSize': '20px', 'paddingLeft': '20px' }}><b>City</b></span>
                            <span style={{ 'fontSize': '20px', 'paddingLeft': '150px' }}><b>Start Date</b></span>
                            <span style={{ 'fontSize': '20px', 'paddingLeft': '100px' }}><b>End Date</b></span>
                            <span style={{ 'fontSize': '20px', 'paddingLeft': '100px' }}><b>Accomodates</b></span>
                            <span style={{ 'fontSize': '20px', 'paddingLeft': '60px' }}><b>Price</b></span>
                            <span style={{ 'fontSize': '20px', 'paddingLeft': '140px' }}><b>Bedrooms</b></span>
                        </div>
                        <form class="form-inline">
                            <input class="form-control input-md" id="city" type="text" value={this.state.city} name="city" onChange={this.handleChange.bind(this)} style={{ 'margin': '10px', 'height': '45px' }} placeholder="City" />
                            <input class="form-control input-md js-input-field" type="text" value={this.state.start_date} name="start_date" onChange={this.handleChange.bind(this)} style={{ 'margin': '10px', 'height': '45px' }} placeholder="YYYY-MM-DD" />
                            <input class="form-control input-md js-input-field" type="text" value={this.state.end_date} name="end_date" onChange={this.handleChange.bind(this)} style={{ 'margin': '10px', 'height': '45px' }} placeholder="YYYY-MM-DD" />
                            <input class="form-control input-md js-input-field" type="text" value={this.state.accomodates} name="accomodates" onChange={this.handleChange.bind(this)} style={{ 'margin': '10px', 'height': '45px' }} placeholder="Accomodates" />
                            <input class="form-control input-md js-input-field" type="text" value={this.state.price} name="price" onChange={this.handleChange.bind(this)} style={{ 'margin': '10px', 'height': '45px' }} placeholder="Price" />
                            <input class="form-control input-md js-input-field" type="text" value={this.state.bedrooms} name="bedrooms" onChange={this.handleChange.bind(this)} style={{ 'margin': '10px', 'height': '45px' }} placeholder="Bedrooms" />
                            <button class="btn btn-lg btn-primary active" onClick={this.handleSearch} style={{ 'fontSize': '15px', 'height': '45px' }}>Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        )

        let pagination = null;
        pagination = (
            <div align="center">
                <Pagination
                    totalItemsCount={30}
                    activePage={this.state.activePage}
                    pageRangeDisplayed={3}
                    itemsCountPerPage={10}
                    onChange={this.handlePageChange.bind(this)}
                />
            </div>
        )
        return (
            <div>
                <div>
                    {navbar}
                    {secondnavbar}
                </div>
                <div class="container-fluid" style={{ "backgroundColor": "white" }}>
                    <div class="container container-pad" id="property-listings">
                        <hr></hr>
                        <p>
                            {this.renderProperties()}
                        </p>
                    </div>
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

    handleChange(event) {
        let change = {}
        change[event.target.name] = event.target.value
        this.setState(change)
    }
}

function mapStateToProps(state) {
    console.log("state: ", state.availableproperties)
    return {
        results: state.availableproperties.properties,
        page: Number(state.availableproperties.pages) || 1,
        totalProperties: state.availableproperties.totalProperties
    }
}

export default connect(mapStateToProps, { getproperties })(Booking);
