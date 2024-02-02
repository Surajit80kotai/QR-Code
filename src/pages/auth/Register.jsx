import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserSignup, clearError } from '../../services/slices/AuthSlice';


const Register = () => {
    const AVTIVE_WEB_URL = process.env.REACT_APP_BASE_URL_PREFIX;
    const token = JSON.parse(window.localStorage.getItem('token'));

    const [formValues, setFormvalues] = useState({
        full_name: "",
        email: "",
        password: "",
    });

    const [formError, setFormerror] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector(state => state.AuthSlice);

    const handleChange = (e) => {
        setFormvalues({ ...formValues, [e.target.name]: e.target.value });
        dispatch(clearError());
        setFormerror(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!(formValues?.full_name || formValues?.email || formValues?.password)) {
            setFormerror(true);
        } else {
            const data = {
                full_name: formValues?.full_name,
                email: formValues?.email,
                password: formValues?.password,
            }
            dispatch(UserSignup({ data, navigate }));
        }
    };

    useEffect(() => {
        if (token) {
            navigate(`${process.env.REACT_APP_BASE_URL_PREFIX}/dashboard`);
        } else {
            navigate(`${process.env.REACT_APP_BASE_URL_PREFIX}/admin/register`);
        }
        return () => {
            dispatch(clearError());
        }
    }, [token, dispatch, navigate]);

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
                                                <h1 className="h4 text-gray-900 my-3" >Sign Up</h1>
                                            </div>
                                            <form className="user" onSubmit={handleSubmit}>

                                                <div className="form-group">
                                                    <label htmlFor='full_name'>Full Name</label>
                                                    <input
                                                        type="full_name"
                                                        className="form-control"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Enter Your Full Name"
                                                        id="full_name"
                                                        name='full_name'
                                                        value={formValues?.full_name}
                                                        onChange={handleChange}
                                                        style={{ border: formError ? "1px solid red" : null }}
                                                    />
                                                    {
                                                        error?.key === "full_name" ?
                                                            <p className='text-danger m-1' style={{ fontSize: "14px" }}>*{error?.message}</p>
                                                            : null
                                                    }
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor='email'>Email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Enter Email Address"
                                                        id="email"
                                                        name='email'
                                                        value={formValues?.email}
                                                        onChange={handleChange}
                                                        style={{ border: formError ? "1px solid red" : null }}
                                                    />
                                                    {
                                                        error?.key === "email" ?
                                                            <p className='text-danger m-1' style={{ fontSize: "14px" }}>*{error?.message}</p>
                                                            : null
                                                    }
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor='password'>Password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="••••••••"
                                                        id="password"
                                                        name='password'
                                                        value={formValues?.password}
                                                        onChange={handleChange}
                                                        style={{ border: formError ? "1px solid red" : null }}
                                                    />
                                                    {
                                                        error?.key === "password" ?
                                                            <p className='text-danger m-1' style={{ fontSize: "14px" }}>*{error?.message}</p>
                                                            : null
                                                    }
                                                </div>

                                                <div className="form-group">
                                                    <button type='submit' className="btn btn-primary btn-block">Register</button>
                                                </div>

                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <Link className="font-weight-bold small" to={`${process.env.REACT_APP_BASE_URL_PREFIX}/admin/login`}>Already have an Account? Login</Link>
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

export default Register