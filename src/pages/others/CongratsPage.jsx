import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { cashBackFormValidationSchema } from '../../helper/FormValidation';
import { Link } from 'react-router-dom';

const CongratsPage = () => {
    const [isAnimated, setAnimated] = useState(false);
    const [selectedOption, setSelectedOption] = useState('UPI');

    const { handleSubmit, handleChange, handleBlur, values, resetForm, errors, touched } = useFormik({
        initialValues: {
            upi_id: '',
            account_number: '',
            ifsc_code: '',
        },
        validationSchema: cashBackFormValidationSchema,
        onSubmit: (formValues) => {
            const formDataToSend = selectedOption === 'UPI'
                ? { upi_id: formValues.upi_id }
                : { account_number: formValues.account_number, ifsc_code: formValues.ifsc_code };

            console.log(`Submitted data for ${selectedOption}:`, formDataToSend);
        },
    });

    const handleToggleOption = (option) => {
        setSelectedOption(option);
        resetForm();
    };


    useEffect(() => {
        setAnimated(true);
    }, []);

    return (
        <>
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className='shadow-lg p-3 mb-5 bg-body rounded' style={{ width: "800px", opacity: isAnimated ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}>
                    <div className="mb-4 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 24 24" style={{
                            fill: "#ffc300",
                            transform: isAnimated ? "rotate(360deg)" : "rotate(0deg)",
                            transition: "transform 0.5s ease-in-out",
                        }}>
                            <path d="M5 12H4v8a2 2 0 0 0 2 2h5V12H5zm13 0h-5v10h5a2 2 0 0 0 2-2v-8h-2zm.791-5A4.92 4.92 0 0 0 19 5.5C19 3.57 17.43 2 15.5 2c-1.622 0-2.705 1.482-3.404 3.085C11.407 3.57 10.269 2 8.5 2 6.57 2 5 3.57 5 5.5c0 .596.079 1.089.209 1.5H2v4h9V9h2v2h9V7h-3.209zM7 5.5C7 4.673 7.673 4 8.5 4c.888 0 1.714 1.525 2.198 3H8c-.374 0-1 0-1-1.5zM15.5 4c.827 0 1.5.673 1.5 1.5C17 7 16.374 7 16 7h-2.477c.51-1.576 1.251-3 1.977-3z"></path>
                        </svg>
                    </div>
                    <div className="text-center">
                        <h1>Congratulations !</h1>
                        <p>You have been awarded a cashback of ₹10. To claim your reward, please provide your UPI ID or bank details.</p>
                    </div>
                    <div className="container mt-5">
                        <div className="form_area">
                            <div className="text-center">
                                <Link
                                    to="#"
                                    className={`btn btn-primary mx-3 ${selectedOption === 'UPI' ? 'active' : ''}`}
                                    type="button"
                                    onClick={() => handleToggleOption('UPI')}
                                >
                                    <span className="icon text-white-50">
                                        <i className="fas fa-mobile-alt"></i>
                                    </span>
                                    <span className="text mx-2">UPI</span>
                                </Link>
                                <Link
                                    to="#"
                                    className={`btn btn-primary mx-3 ${selectedOption === 'BANK' ? 'active' : ''}`}
                                    type="button"
                                    onClick={() => handleToggleOption('BANK')}
                                >
                                    <span className="icon text-white-50">
                                        <i className="fas fa-university"></i>
                                    </span>
                                    <span className="text mx-2">BANK</span>
                                </Link>
                            </div>
                            <form onSubmit={handleSubmit}>
                                {selectedOption === 'UPI' && (
                                    <div className="row mt-4">
                                        <div className="col-md-3"></div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="upi_id" className="form-label">
                                                    Please enter your UPI ID <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="upi_id"
                                                    name="upi_id"
                                                    value={values?.upi_id}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    style={{ border: errors.upi_id && touched.upi_id ? '1px solid red' : null }}
                                                    required
                                                />
                                                {errors.upi_id && touched.upi_id && (
                                                    <small className="form-text text-danger">*{errors.upi_id}</small>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-3"></div>
                                    </div>
                                )}

                                {selectedOption === 'BANK' && (
                                    <div className="row mt-4">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="account_number" className="form-label">
                                                    Account Number <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="account_number"
                                                    name="account_number"
                                                    value={values?.account_number}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    style={{ border: errors.account_number && touched.account_number ? '1px solid red' : null }}
                                                    required
                                                />
                                                {errors.account_number && touched.account_number && (
                                                    <small className="form-text text-danger">*{errors.account_number}</small>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="ifsc_code" className="form-label">
                                                    IFSC Code <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="ifsc_code"
                                                    name="ifsc_code"
                                                    value={values?.ifsc_code}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    style={{ border: errors.ifsc_code && touched.ifsc_code ? '1px solid red' : null }}
                                                    required
                                                />
                                                {errors.ifsc_code && touched.ifsc_code && (
                                                    <small className="form-text text-danger">*{errors.ifsc_code}</small>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="text-center my-4">
                                    <button className="btn btn-primary" type="submit">
                                        <span className="text">SEND</span>
                                        <i className="fas fa-paper-plane ml-2"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
}

export default CongratsPage;