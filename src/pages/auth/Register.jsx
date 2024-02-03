import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserSignup, clearError } from '../../services/slices/AuthSlice';
import { useFormik } from 'formik';
import { signUpValidationSchema } from '../../helper/FormValidation';
import AllPageLoader from '../../utility/AllPageLoader';


const Register = () => {
    const AVTIVE_WEB_URL = process.env.REACT_APP_BASE_URL_PREFIX;
    const token = JSON.parse(window.localStorage.getItem('token'));

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.AuthSlice);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            full_name: "",
            email: "",
            password: "",
            conf_password: "",
        },
        validationSchema: signUpValidationSchema,
        onSubmit: (values) => {
            dispatch(UserSignup({ data: values, navigate }));
        },
    });

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
            {/* Loader */}
            {loading && <AllPageLoader />}

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
                                                        value={values?.full_name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        style={{ border: touched?.full_name && errors?.full_name ? "1px solid red" : null }}
                                                    />
                                                    {
                                                        touched?.full_name && errors?.full_name ?
                                                            <p className='text-danger m-1' style={{ fontSize: "14px" }}>*{errors?.full_name}</p>
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
                                                        value={values?.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        style={{ border: touched?.email && errors?.email ? "1px solid red" : null }}
                                                    />
                                                    {
                                                        touched?.email && errors?.email ?
                                                            <p className='text-danger m-1' style={{ fontSize: "14px" }}>*{errors?.email}</p>
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
                                                        value={values?.password}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        style={{ border: touched?.password && errors?.password ? "1px solid red" : null }}
                                                    />
                                                    {
                                                        touched?.password && errors?.password ?
                                                            <p className='text-danger m-1' style={{ fontSize: "14px" }}>*{errors?.password}</p>
                                                            : null
                                                    }
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor='conf_password'>Confirm Password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="••••••••"
                                                        id="conf_password"
                                                        name='conf_password'
                                                        value={values?.conf_password}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        style={{ border: touched?.conf_password && errors?.conf_password ? "1px solid red" : null }}
                                                    />
                                                    {
                                                        touched?.conf_password && errors?.conf_password ?
                                                            <p className='text-danger m-1' style={{ fontSize: "14px" }}>*{errors?.conf_password}</p>
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