import React, { Component } from 'react';
import _ from "lodash";
import Auth from '../Auth';
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import { gettravelermessages } from '../../actions'
import { sendmessage } from '../../actions'
import './threads.css'

class Messages extends Component {
    constructor(props) {
        super(props);
        var userID = null;
        var ownerID = null;
        var propertyID = null;
        var propertyHeadline = null;
        var redirectingLink = null;
        var user_name = null;
        if (this.props && this.props.location && this.props.location.state) {
            console.log("PROPS:", this.props.location.state)
            userID = this.props.location.state.user_id
            ownerID = this.props.location.state.owner_id
            propertyID = this.props.location.state.property_id
            propertyHeadline = this.props.location.state.property_headline
            redirectingLink = this.props.location.state.redirecting_link
            user_name = this.props.location.state.user_name
            console.log("user name = ", user_name)
            console.log("user id = ", userID)
            console.log("redirectingLink = ", redirectingLink)
        }
        this.state = {
            user_id: userID,
            owner_id: ownerID,
            property_id: propertyID,
            property_headline: propertyHeadline,
            redirectingLink: redirectingLink,
            user_name: user_name,
            message: '',
            loading: true,
            redirectToHome: false
        };
    }

    handleReply = (property_headline, owner_id, property_id) => {
        console.log("Value = ", property_headline, owner_id, property_id)
        this.setState({ property_headline: property_headline })
        this.setState({ owner_id: owner_id })
        this.setState({ property_id: property_id })
        this.setState({ redirectingLink: 'property_details' })
    }

    handleHome = (event) => {
        event.preventDefault();
        this.setState({ redirectToHome: true })
    }

    componentDidMount() {
        const data = {
            user_id: this.state.user_id
        }
        this.props.gettravelermessages(data);
        setTimeout(() => {
            this.setState({ loading: false });
        },
            500
        );
    }

    handleSend = (event) => {
        event.preventDefault();
        const data = {
            user_id: this.state.user_id,
            owner_id: this.state.owner_id,
            property_id: this.state.property_id,
            property_headline: this.state.property_headline,
            user_name: this.state.user_name,
            message: this.state.message
        };
        console.log("data= ", data);
        this.props.sendmessage(data);
        setTimeout(() => {
            this.setState({ redirectingLink: 'inbox' });
        },
            200
        );
    }

    renderInboxContent() {
        var message_len = 0;
        return _.map(this.props.results, message => {
            message_len = message.messages.length;
            console.log("message_len = ", message_len)
            console.log("Owner ID = ", message.owner_id)
            console.log("Property ID = ", message.property_id)
            console.log("Message:", message.property_headline)
            var count = 0;
            let messagesList = _.map(message.messages, message_content => {
                var date_time = message_content.time.split('T')
                var date = date_time[0]
                count++;
                let button = null;
                if (count == message_len) {
                    button = (
                        <button id="reply" onClick={this.handleReply.bind(this, message.property_headline, message.owner_id, message.property_id)}><span class="glyphicon glyphicon-share" for="reply"></span></button>
                    )
                }
                return (
                    <tr>
                        <span style={{ 'color': 'black', 'fontSize': '15px', 'float': 'left' }}>{message_content.sent_by}</span>
                        <span style={{ 'fontSize': '15px', 'paddingLeft': '40px', 'color': 'black' }}>{message_content.content}</span>
                        <span style={{ 'color': 'black', 'fontSize': '15px', 'float': 'right' }}>{button} {date}</span>
                    </tr>
                )
            })
            return (
                <table id="custom">
                    <tr>
                        <th><b>{message.property_headline}</b></th>
                    </tr>
                    {messagesList}
                </table>
            )
        })

    }

    renderInbox() {
        if (this.state.redirectingLink == 'inbox') {
            if (this.state.loading) {
                return (
                    <div>Loading....</div>
                )
            }
            else {
                return (
                    <div class="container" style={{ 'paddingLeft': '150px' }}>
                        <hr></hr>
                        <h2 style={{ 'paddingLeft': '350px', 'color': 'black' }}>Your Inbox</h2>
                        <div class="row">
                            <div class="col-sm-9 col-md-10">
                                <ul class="nav nav-tabs">
                                    <li class="active"><a href="#home" data-toggle="tab"><span class="glyphicon glyphicon-inbox">
                                    </span>Primary</a></li>
                                </ul>
                                <div class="tab-content">
                                    {this.renderInboxContent()}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }

    render() {
        let navbar = null;
        if (this.state.redirectingLink == 'inbox') {
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
        }

        if (this.state.redirectToHome)
            return (<Redirect to={{
                pathname: '/',
                state: {
                    user_id: this.state.user_id
                }
            }} />)

        let composeMessage = null;
        if (Auth.isUserAuthenticated() && this.state.redirectingLink == "property_details") {
            composeMessage = (
                <div class="modal show" id="modalCompose">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h4 class="modal-title">Compose Message</h4>
                            </div>
                            <div class="modal-body">
                                <form role="form" class="form-horizontal">
                                    <div class="form-group">
                                        <label class="col-sm-2" for="inputTo">To</label>
                                        <div class="col-sm-10"><input type="email" class="form-control" id="inputTo" value={this.state.property_headline} /></div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2" for="inputSubject">From</label>
                                        <div class="col-sm-10"><input type="text" class="form-control" id="inputSubject" value={this.state.user_name} /></div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-12" for="inputBody">Message</label>
                                        <div class="col-sm-12"><textarea class="form-control" id="inputBody" rows="8" name="message" onChange={this.handleChange.bind(this)} ></textarea></div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" onClick={this.handleSend}>Send <i class="fa fa-arrow-circle-right fa-lg"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        let footer = null;
        if (this.state.redirectingLink == 'inbox') {
            footer = (
                <p>This is an assignment, but is too long to be an assignment.<br></br>
                    Terms and Conditions and Privacy Policy.
            ©2018 SJSU. None rights reserved.</p>
            )
        }

        return (
            <div>
                <div>
                    {navbar}
                </div>
                <div class="container-fluid" style={{ 'padding-left': '150px', 'backgroundColor': 'white' }}>
                    {composeMessage}
                    {this.renderInbox()}
                </div>
                <div class="panel centered-hr text-center">
                    {footer}
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
    console.log("STATE in threads: ", state.travelermessages)
    return {
        results: state.travelermessages,
    };
}

export default connect(mapStateToProps, { gettravelermessages, sendmessage })(Messages);