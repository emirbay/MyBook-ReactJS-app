import React, {Component} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {connect} from 'react-redux';
import {loginUser} from '../../store/actions/user_actions'

const LoginSchema = Yup.object().shape({
    email:Yup.string()
    .email('Invalid email')
    .required('Email required!'),
    password: Yup.string()
        .min(6,'Password too short')
        .required('Password required!')
})


class Login extends Component {

    state = {
        success: false,
        validation:false
    }
// before everything getting updated, always need to return something value or null
    static getDerivedStateFromProps(props,state)
    {
        const auth = props.user.auth;
        if(auth) {
            return {
                success: auth ? true :false
            }
        }
         return null;
    }

    componentDidUpdate() {
        if (this.state.success) {
            this.props.history.push('/admin')
        }
    }

    render() {
        return  (
            <div className="container form_container">
            <h1>Welcome</h1>
            <hr/>
            <h4>Sign in here</h4>
            {
                                this.state.validation ?
                                <div className="row">
                                    <div className="error_label">
                                    Incorrect username or password
                                    </div>
                                </div>
                                : null
                            }
            <Formik
            initialValues={{email: 'emirba@mail.com', password:'test123'}}
            validationSchema={LoginSchema}
            onSubmit={values => {
               // console.log(values);
                this.props.dispatch(loginUser(values))
                .then(response=> {
                    if (!this.props.user.auth){
                        this.setState({
                            validation: true
                        })
                    }
                })
                
            }}
            >
                {({values,
                    errors,
                    touched,
                    handle,
                    handleChange,
                    handleBlur,
                    handleSubmit})=> {
                       return ( <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="twelve columns">
                                    <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    placeholder="Enter your email"
                                    className="u-full-width"></input>
                                    {errors.email && touched.email ? 
                                        <div className="error_label">{errors.email}</div>
                                : null}
                                </div>
                            </div>

                            <div className="row">
                                <div className="twelve columns">
                                    <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    placeholder="Enter your password"
                                    className="u-full-width"></input>
                                    {errors.password && touched.password ? 
                                        <div className="error_label">{errors.password}</div>
                                : null}
                                </div>
                            </div>

                            <button type="submit">
                                     LOGIN           
                            </button>
                            <br/>
                           
                        </form>)

                }}

            </Formik>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Login);
// destrukturirane vrijednosti za formik