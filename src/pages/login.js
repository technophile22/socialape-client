import React, { Component } from 'react'
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import axios from 'axios';
import {Link} from 'react-router-dom';

//MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    ...theme.spreadThis
});

class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post('/login', userData)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
                //it will redirect to the home page
            })
            .catch((err) => {
                this.setState({
                  errors: err.response.data,
                  loading: false
                });
            })
            

    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        const { classes } = this.props;
        const {errors, loading} = this.state;
        return (
            <Container maxWidth="xs" className={classes.form}>
                    <img src={AppIcon} alt="app logo" className={classes.image}/>
                    <Typography variant="h3" className={classes.pageTitle}> Login </Typography>
                    <form noValidate onSubmit={this.handleSubmit} autoComplete="off">
                        <TextField
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        className={classes.textField}
                        helperText={errors.email}
                        error={errors.email ? true: false} //to make it turn red
                        variant="outlined"
                        value={this.state.email}
                        onChange={this.handleChange}
                        fullWidth
                        />

                        <TextField 
                        id="password" 
                        name="password" 
                        type="password" 
                        label="Password" 
                        className={classes.textField}
                        helperText={errors.password}
                        error={errors.password ? true: false} //to make it turn red 
                        variant="outlined"
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        fullWidth/>
                        
                        {errors.general && (
                            //in our backend, we get general error if the credentials are wrong
                            //so if we get a general error then we render it on page
                            <Typography variant="body2"
                            className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}

                        <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        disabled={loading}
                        >Login
                        {loading && (
                            <CircularProgress size={30} className={classes.progress} />
                        )}
                        </Button>
                        <br />
                        
                        <small>don't have an account ? sign up <Link to="/signup">here</Link></small>
                    </form>
            </Container>
           
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(login);
