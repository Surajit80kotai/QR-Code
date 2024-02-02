import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserLogin, clearError } from '../../services/slices/AuthSlice';


const Login = () => {
    const AVTIVE_WEB_URL = process.env.REACT_APP_BASE_URL_PREFIX;

    const user = JSON.parse(Cookies.get("user") || "{}");
    const token = JSON.parse(window.localStorage.getItem('token'));

    const [formValues, setFormvalues] = useState({
        email: user?.rememberme ? user?.email : "",
        password: user?.rememberme ? user?.password : "",
        rememberme: false
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
        if (!(formValues?.email || formValues?.password)) {
            setFormerror(true);
        } else {
            const data = {
                email: formValues?.email,
                password: formValues?.password,
                rememberme: formValues?.rememberme,
            }
            dispatch(UserLogin({ data, navigate }));
        }
    };

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
                                                        value={formValues?.email || ""}
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
                                                        value={formValues?.password || ""}
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
                                                    <div className="custom-control custom-checkbox small" style={{ lineHeight: "1.5rem" }}>
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="rememberme"
                                                            checked={formValues?.rememberme}
                                                            onChange={(e) => setFormvalues({ ...formValues, rememberme: e.target.checked })}
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
                                            <div className="text-center">
                                                <Link className="font-weight-bold small" to={`${process.env.REACT_APP_BASE_URL_PREFIX}/admin/register`}>Create an Account!</Link>
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