import React, { Component } from 'react';
import _ from "lodash";
import Auth from '../Auth';
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import { getownermessages } from '../../actions'
import { sendmessage } from '../../actions'
import './threads.css'

class OwnerMessages extends Component {
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

    handleReply = (property_headline, user_id, property_id) => {
        console.log("Value = ", property_headline, user_id, property_id)
        this.setState({ property_headline: property_headline })
        this.setState({ user_id: user_id })
        this.setState({ property_id: property_id })
        this.setState({ redirectingLink: 'reply_to_msg' })
    }

    handleHome = (event) => {
        event.preventDefault();
        this.setState({ redirectToHome: true })
    }

    componentDidMount() {
        const data = {
            owner_id: this.state.owner_id
        }
        this.props.getownermessages(data);
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
            user_name: 'Owner',
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
        return _.map(this.props.results, each_property => {
            let userMessages = []
            console.log("each_property messages = ", each_property)
            _.map(each_property.messages, message_list => {
                console.log("message_list = ", message_list)
                var key = _.keys(message_list)[0]
                console.log("key = ", key)
                var message_len = message_list[key].length
                console.log("no of message = ", message_len)
                var count = 0;
                console.log("all messages = ", message_list[key])
                _.map(message_list[key], each_message => {
                    console.log("each message = ", each_message)
                    var date_time = each_message.time.split('T')
                    var date = date_time[0]
                    count++;
                    let button = null;
                    if (count == message_len) {
                        button = (
                            <button id="reply" onClick={this.handleReply.bind(this, each_property.property_headline, key, each_property.property_id)}><span class="glyphicon glyphicon-share" for="reply"></span></button>
                        )
                    }
                    userMessages.push( 
                        <tr>
                            <span style={{ 'color': 'black', 'fontSize': '15px', 'float': 'left' }}>{each_message.sent_by}</span>
                            <span style={{ 'fontSize': '15px', 'paddingLeft': '40px', 'color': 'black' }}>{each_message.content}</span>
                            <span style={{ 'color': 'black', 'fontSize': '15px', 'float': 'right' }}>{button} {date}</span>
                        </tr>
                    )
                })

            })
            return (
                <table id="custom">
                    <tr>
                        <th><b>{each_property.property_headline}</b></th>
                    </tr>
                    {userMessages}
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
                pathname: '/getOwnerDashboard',
                state: {
                    user_id: this.state.owner_id
                }
            }} />)

        let composeMessage = null;
        if (Auth.isUserAuthenticated() && this.state.redirectingLink == "reply_to_msg") {
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
                                        <div class="col-sm-10"><input type="text" class="form-control" id="inputSubject" value="Owner" /></div>
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
    console.log("STATE in threads: ", state.messages)
    return {
        results: state.messages,
    };
}

export default connect(mapStateToProps, { getownermessages, sendmessage })(OwnerMessages);