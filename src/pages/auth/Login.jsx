import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserLogin, clearError } from '../../services/slices/AuthSlice';
import { useFormik } from 'formik';
import { loginValidationSchema } from '../../helper/FormValidation';
import AllPageLoader from '../../utility/AllPageLoader';
import { DcryptData } from '../../helper/EncryptDcrypt ';


const userCookie = Cookies.get("user");
const user = DcryptData(userCookie) || {};

const Login = () => {
    const AVTIVE_WEB_URL = process.env.REACT_APP_BASE_URL_PREFIX;
    const token = JSON.parse(window.localStorage.getItem('token'));

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.AuthSlice);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: user?.rememberme ? user?.email : "",
            password: user?.rememberme ? user?.password : "",
            rememberme: false
        },
        validationSchema: loginValidationSchema,
        onSubmit: (values) => {
            dispatch(UserLogin({ data: values, navigate }));
        },
    });

    useEffect(() => {
        if (token) {
            navigate(`${process.env.REACT_APP_BASE_URL_PREFIX}/dashboard`);
        } else {
            navigate(`${process.env.REACT_APP_BASE_URL_PREFIX}/admin/login`);
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
                                                <h1 className="h4 text-gray-900 my-3" >Login</h1>
                                            </div>
                                            <form className="user" onSubmit={handleSubmit}>

                                                <div className="form-group">
                                                    <label htmlFor='email'>Email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Enter Email Address"
                                                        id="email"
                                                        name='email'
                                                        value={values?.email || ""}
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
                                                        value={values?.password || ""}
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
                                                    <div className="custom-control custom-checkbox small" style={{ lineHeight: "1.5rem" }}>
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="rememberme"
                                                            checked={values?.rememberme}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="custom-control-label" htmlFor="rememberme">Remember
                                                            Me</label>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <button type='submit' className="btn btn-primary btn-block">Login</button>
                                                </div>

                                            </form>
                                            <hr />
                                            {/* <div className="text-center">
                                                <Link className="font-weight-bold small" to={`${process.env.REACT_APP_BASE_URL_PREFIX}/admin/register`}>Create an Account!</Link>
                                            </div> */}
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