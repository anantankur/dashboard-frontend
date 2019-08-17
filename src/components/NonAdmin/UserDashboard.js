import React, { Component } from 'react';
import  { withRouter } from 'react-router-dom';
import UserDashboardCards from './UserDashboardCards';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../../actions/userAuthAction';
import '../Dashboard/Dashboard.css';

const urlParams = new URLSearchParams(window.location.search)
const key = urlParams.get('token');
if(key == null) {
    console.log('no token');
} else {
    localStorage.setItem("dToken", key);
    window.location = "https://dash.zerobot.xyz/dashboard"
}

class UserDashboard extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const localToken = localStorage.getItem('dToken');
        if(localToken != null) {
            this.props.fetchUserProfile(localToken, this.handleRedirect)
        }
    }

    handleRedirect = (path) => {
		this.props.history.push("/"+path);
	}

    render() {
        return (
        	<div className="container">
        		{
        			this.props.isLoggedIn
        				?
        					(
        						<div className="pad has-text-centered">

	        						{

		                                this.props.isLoggedIn && this.props.profile !== undefined
		                                    ? (
                                                <>
												<img className="dash-img-size" alt="profile-img" src={`https://robohash.org/${this.props.profile.username}`} />
                                                <h1 className="title blue-col">Hi {this.props.profile.username} 👋</h1>
                                                </>
		                                      )
		                                    : (
		                                    	<div className="container-anim-div">
		                                    		<div className="parent-anim-div">
										    			<div className="balls">
														  	<div></div>
														  	<div></div>
														  	<div></div>
														</div>
													</div>
												</div>
		                                      )
		                            }
	        						<UserDashboardCards profile={this.props.profile} />
	        					</div>
        					)
        				:
        					(
                                localStorage.getItem('dToken') == null
                                    ?   (
                    						<section className="hero is-medium is-primary">
            								  	<div className="hero-body">
            								    	<div className="container">
            									      	<h1 className="title-l title">
            									        	Account Required
            									      	</h1>
            								    	</div>
            								  	</div>
            								</section>
                                        )
                                    :   (
                                            <div className="container-anim-div">
                                                <div className="parent-anim-div">
                                                    <div className="balls">
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                            )
        		}
        	</div>
        );
    }
}

const mapStateToProps = state => ({
	isLoggedIn: state.user_auth.isLoggedIn,
    username: state.user_auth.username,
    profile: state.user_auth.profile
});

export default withRouter(connect(mapStateToProps, { fetchUserProfile })(UserDashboard));