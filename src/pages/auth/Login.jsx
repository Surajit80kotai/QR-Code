import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <>
            <div className="unix-login">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="login-content">
                                <div className="login-form">
                                    <div className="login-logo">
                                        <Link to="/">
                                            <img src="/assets/images/shri-lal-mahal-logo.jpg" alt="" height="120px" width="120px" />
                                        </Link>
                                    </div>
                                    <h4>Administratior Login</h4>
                                    <form>
                                        <div className="form-group">
                                            <label>Email address</label>
                                            <input type="email" className="form-control" placeholder="Email" />
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="password" className="form-control" placeholder="Password" />
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" /> Remember Me
                                            </label>
                                            <label className="pull-right">
                                                <Link to="#">Forgotten Password?</Link>
                                            </label>

                                        </div>
                                        <button type="submit" className="btn btn-primary btn-flat m-b-30 m-t-30">Sign in</button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login