import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const AVTIVE_WEB_URL = process.env.REACT_APP_BASE_URL_PREFIX;

    return (
        <>
            <div className="container-login">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-12 col-md-9">
                        <div className="card shadow-sm my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="login-form">
                                            <div className="text-center">
                                                <img src={AVTIVE_WEB_URL === "/qr1" ? "/assets/img/nafed.jpg" : "/assets/img/kb.jpeg"} alt="" className="img-fluid" width="200px" />
                                                <h1 className="h4 text-gray-900 mb-4" >Login</h1>
                                            </div>
                                            <form className="user">
                                                <div className="form-group">

                                                    <label>Email</label>
                                                    <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder="Enter Email Address" />
                                                </div>
                                                <div className="form-group">
                                                    <label>Password</label>
                                                    <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" />
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small" style={{ lineHeight: "1.5rem" }}>
                                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                        <label className="custom-control-label" htmlFor="customCheck">Remember
                                                            Me</label>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <a href="index.html" className="btn btn-primary btn-block">Login</a>
                                                </div>

                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <Link className="font-weight-bold small" to="/register">Create an Account!</Link>
                                            </div>
                                            <div className="text-center">
                                            </div>
                                        </div>
                                    </div>
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