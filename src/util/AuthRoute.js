import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// we are doing this to check if the user is logged in then it will prevent it from going into login and sign up page
//and it will redirect the user to home page only
const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route 
    {...rest}
    render = {(props) => authenticated === true ? <Redirect to='/' /> : <Component {...props} />}
    />
);

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})
    
AuthRoute.propTypes = {
    user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(AuthRoute);
