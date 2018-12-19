/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Auth from '../Auth';
import './PropertyDetail.css';
import { connect } from "react-redux";
import { getproperties } from '../../actions';
import _ from "lodash";
import { getprofileimg } from '../../actions/index'
import { Redirect } from 'react-router';
import { makebooking } from '../../actions/index'

class PropertyDetail extends Component {
    constructor(props) {
        super(props);
        var start_date;
        var end_date;
        var property_id;
        var accomodates;
        var total_days;
        var total_time;
        var user_id;
        var city;
        var property_headline;
        var owner_id;
        if (this.props && this.props.location && this.props.location.state) {
            user_id = this.props.location.state.user_id;
            start_date = this.props.location.state.start_date;
            end_date = this.props.location.state.end_date;
            property_id = this.props.location.state.property_id;
            accomodates = this.props.location.state.accomodates
            city = this.props.location.state.city;
            property_headline = this.props.location.state.property_headline;
            owner_id = this.props.location.state.owner_id;
            total_time = Math.abs(new Date(end_date).getTime() - new Date(start_date).getTime());
            total_days = Math.ceil(total_time / (1000 * 3600 * 24));
            console.log(" property_headline = ", property_headline);
        }

        this.state = {
            start_date: start_date,
            end_date: end_date,
            property_id: property_id,
            accomodates: accomodates,
            total_days: total_days,
            user_id: user_id,
            city: city,
            owner_id: owner_id,
            property_headline: property_headline,
            redirectToLanding: false,
            redirectToDashboard: false
        }
    }

    componentDidMount() {
        const data = {
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            accomodates: this.state.accomodates,
            city: this.state.city
        }
        console.log("data = ", data)
        this.props.getproperties(data)
    }

    handleBooking = (booking_type) => {
        if (!Auth.isUserAuthenticated()) {
            this.setState({ redirectToLanding: true })
        }
        else {
            const data = {
                start_date: this.state.start_date,
                end_date: this.state.end_date,
                person_id: this.state.user_id,
                p_id: this.state.property_id,
                booking_type: booking_type,
                person_name: this.props.formData.name,
                person_email: this.props.formData.email
            }
            console.log("data = ", data)
            this.props.makebooking(data, () => {
                this.setState({ redirectToDashboard: true });
            })
        }
    }

    renderChatButton() {
        if (Auth.isUserAuthenticated()) {
            return (
                <a><Link to={{ pathname: '/travelerMessages', state: { user_id: this.state.user_id, property_id: this.state.property_id, owner_id: this.state.owner_id, property_headline: this.state.property_headline, redirecting_link: "property_details", user_name: this.props.formData.name } }} class="btn btn-info btn-lg">
                    <span class="glyphicon glyphicon-envelope"></span> Chat</Link></a>
            )
        }
    }

    renderProperty() {
        return _.map(this.props.results, property => {
            if (property.p_id == this.state.property_id) {
                var flag = true
                let imageCaraousal = property.images.map(image => {
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

                var raw_price = (property.price).split(' ')
                var total = raw_price[0] + " " + (this.state.total_days * parseFloat(raw_price[1])).toFixed(2)
                var aminities = property.aminities.split(',')
                return (
                    <div>
                        <div class="row">
                            <div class="col-md-8">
                                <div id="myCarouselProperty" class="carousel slide" data-ride="carousel" style={{ "width": "100%", "height": "100%" }}>
                                    <div class="carousel-inner">
                                        {imageCaraousal}
                                    </div>
                                    <a class="left carousel-control" href="#myCarouselProperty" data-slide="prev">
                                        <span class="glyphicon glyphicon-chevron-left"></span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                    <a class="right carousel-control" href="#myCarouselProperty" data-slide="next">
                                        <span class="glyphicon glyphicon-chevron-right"></span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </div>
                                <br></br>
                                <br></br>
                            </div>

                            <div class="col-md-4 thumbnail thumbnail-custom">
                                <h4 class="media-heading">
                                    <b style={{ 'color': 'black', 'fontSize': '20px', 'padding-left': '10px' }}>{property.price} per night</b>
                                </h4>
                                <p style={{ 'color': 'green', 'fontSize': '20px', 'padding-left': '10px' }}>Your dates are Available!</p>
                                <hr></hr>
                                <ul class="list-inline" style={{ 'fontSize': '17px', 'padding-left': '10px' }}>
                                    <li>Start Date: {this.state.start_date}</li>
                                    <li style={{ "listStyle": "none" }}>|</li>
                                    <li>End Date: {this.state.end_date}</li>
                                </ul>
                                <div style={{ 'fontSize': '17px', 'padding-left': '10px' }}>Persons <span class="glyphicon glyphicon-user"></span>  {this.state.accomodates}</div>
                                <div style={{ 'color': 'black', 'fontSize': '20Fpx', 'padding-left': '10px' }}>Total {total}</div>
                                <hr></hr>
                                <div style={{ 'padding-left': '10px' }}>
                                    <p style={{ 'fontSize': '17px' }}>&#9889; {property.booking_type} Confirmation</p>
                                    <button class="btn btn-lg btn-primary active" onClick={this.handleBooking.bind(this, property.booking_type)} style={{ 'fontSize': '15px', 'height': '50px' }}>Book Now</button>
                                    <span style={{ 'paddingLeft': '50%' }}>{this.renderChatButton()}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row" style={{ 'padding': '10px' }} >
                            <div style={{ 'color': 'black', 'fontSize': '30px' }}><strong>{property.headline}</strong></div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <p style={{ 'fontSize': '20px' }}>Details:</p>
                            </div>
                            <div class="col-md-2">
                                <a href='#' style={{ 'fontSize': '50px' }}><span class="glyphicon glyphicon-home"></span></a>
                                <p style={{ 'fontSize': '20px' }}> {property.property_type}</p>
                            </div>
                            <div class="col-md-2">
                                <a href='#' style={{ 'fontSize': '50px' }}><span class="glyphicon glyphicon-user"></span></a>
                                <p style={{ 'fontSize': '20px' }}> {property.accomodates}</p>
                            </div>
                            <div class="col-md-2">
                                <a style={{ 'fontSize': '50px' }}><span class="glyphicon glyphicon-bed"></span></a>
                                <p style={{ 'fontSize': '20px' }}> {property.bedrooms}</p>
                            </div>
                            <div class="col-md-2">
                                <a style={{ 'fontSize': '50px' }}><i class="fa fa-moon-o"></i></a>
                                <p style={{ 'fontSize': '20px' }}> {this.state.total_days}</p>
                            </div>
                            <div class="col-md-2">
                                <a style={{ 'fontSize': '50px' }}><i class="fa fa-shower"></i></a>
                                <p style={{ 'fontSize': '20px' }}> {property.bathrooms}</p>
                            </div>
                        </div>
                        <br></br>
                        <div class="row">
                            <div class="col-md-2" style={{ 'fontSize': '20px' }}>About the Property</div>
                            <div class="col-md-10" style={{ 'fontSize': '20px' }}>{property.property_description}</div>
                        </div>
                        <br></br>
                        <div class="row">
                            <div class="col-md-2" style={{ 'fontSize': '20px' }}>Amenities</div>
                            <div class="col-md-10" style={{ 'fontSize': '20px' }}>
                                <ul>
                                    {aminities.map(amenity => {
                                        return <li>{amenity}</li>;
                                    })}
                                </ul>
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
                        <li><a>
                            <img alt="USMap" src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" height="20" width="25"></img>
                        </a></li>
                        <li><a href="#" style={{ 'color': 'navy', 'fontSize': '15px', 'top': '5px' }}> TripBoards</a></li>
                        <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#" style={{ 'color': 'navy', 'fontSize': '15px', 'top': '5px' }}> Login<span class="caret"></span></a></li>
                        <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#" style={{ 'color': 'navy', 'fontSize': '15px', 'top': '5px' }}> Help<span class="caret"></span></a></li>
                        <li><a><button class="btn btn-lg" style={{ 'border-color': 'gray', 'fontSize': '15px' }}>List your property</button></a></li>
                        <li style={{ 'top': '5px' }}><img alt="Logo" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"></img></li>
                    </ul>
                </div>
            </nav>
        )

        let lowernavbar = null;
        lowernavbar = (
            <nav class="navbar navbar-custom">
                <div class="container-fluid">
                    <ul class="nav navbar-nav">
                        <li><a href="#" style={{ 'color': 'navy' }}>Overview</a></li>
                        <li><a href="#" style={{ 'color': 'navy' }}>Amenities</a></li>
                        <li><a href="#" style={{ 'color': 'navy' }}>Reviews</a></li>
                        <li><a href="#" style={{ 'color': 'navy' }}>Map</a></li>
                        <li><a href="#" style={{ 'color': 'navy' }}>Photos</a></li>
                        <li><a href="#" style={{ 'color': 'navy' }}>Rates&Availability</a></li>
                    </ul>
                </div>
            </nav>
        )

        if (this.state.redirectToLanding)
            return (<Redirect to={{
                pathname: '/signin',
                state: {
                    person_type: 'Traveler'
                }
            }} />)

        if (this.state.redirectToDashboard)
            return (<Redirect to={{
                pathname: '/travelerdashboard',
                state: {
                    user_id: this.state.user_id
                }
            }} />)



        return (
            <div>
                <div>
                    {navbar}
                    {lowernavbar}
                </div>
                <div class="container-fluid" style={{ "backgroundColor": "white" }}>
                    {this.renderProperty()}
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
    console.log("DATA mapStateToProps in property details:", state.availableproperties)
    console.log("FORM mapStateToProps in person details:", state.getprofileimg)
    return {
        results: state.availableproperties.properties,
        page: Number(state.availableproperties.pages) || 1,
        totalProperties: state.availableproperties.totalProperties,
        formData: state.getprofileimg
    };
}

export default connect(mapStateToProps, { getproperties, getprofileimg, makebooking })(PropertyDetail);