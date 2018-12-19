import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InsertLocation from './InsertLocation'
import InsertDetails from './InsertDetails'
import InsertBookingOptions from './InsertBookingOptions'
import InsertPhotos from './InsertPhotos'
import InsertPrice from './InsertPrice'
import { insertnewproperty } from '../../actions'
import { connect } from "react-redux";
import { Redirect } from 'react-router';

class InsertProperty extends Component {
    constructor(props) {
        super(props)
        var owner_id;
        if (this.props && this.props.location && this.props.location.state) {
            owner_id = this.props.location.state.owner_id
            console.log("owner_id", owner_id)
        }
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.state = {
            page: 1,
            owner_id: owner_id,
            redirectlink: false,
            loading: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    nextPage() {
        this.setState({ page: this.state.page + 1 })
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 })
    }

    onSubmit(values) {
        console.log("onSubmit - ", values)
        values['user_id'] = this.state.owner_id
        this.props.insertnewproperty(values)
        setTimeout(() => {
            this.setState({ loading: false });
        },
            5000
        );
        this.setState({loading: true})
        setTimeout(() => {
            this.setState({ redirectlink: true });
        },
            5000
        );
    }

    render() {
        if(this.state.loading){
            return(
                <div><h2 style={{ 'padding-left': '20px' }}>Loading...</h2></div>
            )
        }
        const { page } = this.state
        if (this.state.redirectlink) {
            return (<Redirect to={{
                pathname: '/getOwnerDashboard',
                state: { user_id: this.state.owner_id }
            }} />)
        }
        return (
            <div>
                {page === 1 && 
                    <InsertLocation
                        onSubmit={this.nextPage}
                    />}
                {page === 2 &&
                    <InsertDetails
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />}
                {page === 3 &&
                    <InsertBookingOptions
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />}
                {page === 4 &&
                    <InsertPhotos
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />}
                {page === 5 &&
                    <InsertPrice
                        previousPage={this.previousPage}
                        onSubmit={this.onSubmit}
                    />}
            </div>
        )
    }
}

InsertProperty.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default connect(null, {insertnewproperty })(InsertProperty)