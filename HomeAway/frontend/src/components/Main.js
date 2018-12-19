import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Landing from './LandingPage/Landing'
import SignUp from './User/SignUp' 
import SignIn from './User/SignIn'
import Booking from './Booked/Booking'
import MyProfile from './Profile/MyProfile'
import PropertyDetail from './Property/PropertyDetail'
import TravelerDashboard from './Dashboard/TravelerDashboard'
import OwnerDashboard from './Dashboard/OwnerDashboard'
import InsertProperty from './Property/InsertProperty'
import TravelerMessages from './Theads/travelerThreads'
import OwnerMessages from './Theads/ownerThreads'

class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path="/" component={Landing}/>
                <Route path="/signin" component={SignIn}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/insertprofile" component={MyProfile}/>
                <Route path="/bookproperty" component={Booking}/>
                <Route path="/travelerdashboard" component={TravelerDashboard}/>
                <Route path="/getOwnerDashboard" component={OwnerDashboard}/>
                <Route path="/getPropertyDetail" component={PropertyDetail}/>
                <Route path="/insertProperty" component={InsertProperty}/>
                <Route path="/travelerMessages" component={TravelerMessages}/>
                <Route path="/ownerMessages" component={OwnerMessages}/>
            </div>
        )
    }
}
export default Main;