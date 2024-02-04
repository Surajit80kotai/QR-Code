import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { clearFeedbackData, storeFeedbackData } from '../../services/slices/UtilitySlice';
import AllPageLoader from '../../utility/AllPageLoader';
import { useFormik } from 'formik';
import { feedbackFormValidationSchema } from '../../helper/FormValidation';

const UserFeedbackForm = () => {
    const AVTIVE_WEB_URL = process.env.REACT_APP_BASE_URL_PREFIX;
    const { uuid } = useParams();

    const [locationPermission, setLocationPermission] = useState(false);
    const [locationAlertShown, setLocationAlertShown] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { feedbackData, loading } = useSelector(state => state.UtilitySlice);

    const { values, errors, touched, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            full_name: "",
            upi_id: "",
            mobile_number: "",
            question_one: "",
            question_two: "",
            question_three: "",
            question_four: "",
            question_five: "",
            question_six: "",
            question_seven: "",
            uuid: uuid
        },
        validationSchema: feedbackFormValidationSchema,
        onSubmit: (values) => {
            dispatch(storeFeedbackData({ data: values, navigate, uuid }));
        },

        // // Submit when location access is on
        // onSubmit: async (values) => {
        //     if (locationPermission) {
        //         try {
        //             const locationData = await getLocationData();
        //             values.location = locationData;
        //             dispatch(storeFeedbackData({ data: values, navigate, uuid }));
        //         } catch (error) {
        //             console.error("Error getting location data:", error);
        //         }
        //     } else {
        //         alert("Please grant location access to submit the form.");
        //     }
        // },
    });

    // // Access Location
    // const getLocationData = () => {
    //     return new Promise((resolve, reject) => {
    //         if (navigator.geolocation) {
    //             navigator.geolocation.getCurrentPosition(
    //                 (position) => {
    //                     const { latitude, longitude } = position.coords;
    //                     resolve({ latitude, longitude });
    //                 },
    //                 (error) => {
    //                     console.error(error.message);
    //                     reject(error);
    //                 }
    //             );
    //         } else {
    //             console.error("Geolocation is not supported by this browser.");
    //             reject(new Error("Geolocation not supported"));
    //         }
    //     });
    // };

    const requestLocationAccess = () => {
        navigator.permissions.query({ name: 'geolocation' })
            .then((result) => {
                if (result.state === 'granted') {
                    setLocationPermission(true);
                } else {
                    setLocationPermission(false);
                }
            })
            .catch((error) => {
                console.error('Error checking location permissions:', error);
                setLocationPermission(false);
            });
    };

    useEffect(() => {
        requestLocationAccess();

        if (!locationAlertShown && !locationPermission) {
            setLocationAlertShown(true);
            alert("Location access is required for submitting the form. Please allow access.");
        }

        if (feedbackData?.data?.data === "expired" && feedbackData?.data?.flag === false) {
            navigate(`${process.env.REACT_APP_BASE_URL_PREFIX}/expired`);
        }

        return () => {
            dispatch(clearFeedbackData());
        }
    }, [dispatch, navigate, feedbackData, locationPermission, locationAlertShown]);


    return (
        <>
            {/* loader */}
            {loading && <AllPageLoader />}

            <div className="main_container">
                <div className="container-fluid">
                    {
                        AVTIVE_WEB_URL === "/qr1" ?
                            <div className="logo_brand d-flex justify-content-center align-item-center mt-4 mb-4">
                                <img src="/assets/img/nafed.jpg" alt="" className="img-fluid" width="200px" />
                            </div>
                            :
                            <div className="logo_brand d-flex justify-content-center align-item-center mt-2">
                                <img src="/assets/img/kb.jpeg" alt="" className="img-fluid" width="500px" />
                            </div>
                    }
                </div>
                <div className="container mt-5">
                    <div className="form_area">
                        <h6 className="text-center text-primary" style={{ fontSize: "20px", fontWeight: "bold" }}>
                            Please complete the feedback form to enable us to improve our product experience!
                        </h6>
                        <form onSubmit={handleSubmit}>
                            <div className="row mt-5">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="full_name" className="form-label">Your Name <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control py-4"
                                            id="full_name"
                                            name="full_name"
                                            value={values?.full_name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            style={{ border: errors?.full_name && touched?.full_name ? "1px solid red" : null }}
                                        />
                                        {
                                            errors?.full_name && touched?.full_name ?
                                                <small className="form-text text-danger">*{errors?.full_name}</small>
                                                : null
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="upi_id" className="form-label">Please enter your UPI ID <span
                                            className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control py-4"
                                            id="upi_id"
                                            name="upi_id"
                                            value={values?.upi_id}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            style={{ border: errors?.upi_id && touched?.upi_id ? "1px solid red" : null }}
                                        />
                                        {
                                            errors?.upi_id && touched?.upi_id ?
                                                <small className="form-text text-danger">*{errors?.upi_id}</small>
                                                : null
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="mobile_number" className="form-label">Mobile Number <span
                                            className="text-danger">*</span></label>
                                        <input
                                            type="tel"
                                            className="form-control py-4"
                                            id="mobile_number"
                                            name="mobile_number"
                                            value={values?.mobile_number}
                                            onChange={handleChange}
                                            maxLength={10}
                                            onBlur={handleBlur}
                                            style={{ border: errors?.mobile_number && touched?.mobile_number ? "1px solid red" : null }}
                                        />
                                        {
                                            errors?.mobile_number && touched?.mobile_number ?
                                                <small className="form-text text-danger">*{errors?.mobile_number}</small>
                                                : null
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="question_one" className="form-label">Have you recently purchased 'Bharat Atta' or 'Bharat Dal' ?</label>
                                        <input
                                            type="text"
                                            className="form-control py-4"
                                            id="question_one"
                                            name="question_one"
                                            value={values?.question_one}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="question_two" className="form-label">How did you find the product?</label>
                                        <input
                                            type="text"
                                            className="form-control py-4"
                                            id="question_two"
                                            name="question_two"
                                            value={values?.question_two}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="question_three" className="form-label">Do you have any comments about the quality of our products?</label>
                                        <input
                                            type="text"
                                            className="form-control py-4"
                                            id="question_three"
                                            name="question_three"
                                            value={values?.question_three}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="question_four" className="form-label">Where did you purchase this product from?</label>
                                        <input
                                            type="text"
                                            className="form-control py-4"
                                            id="question_four"
                                            name="question_four"
                                            value={values?.question_four}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="question_five" className="form-label">How was your experience with the purchase?</label>
                                        <input
                                            type="text"
                                            className="form-control py-4"
                                            id="question_five"
                                            name="question_five"
                                            value={values?.question_five}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="question_six" className="form-label">At what price did you purchase the product?</label>
                                        <input
                                            type="text"
                                            className="form-control py-4"
                                            id="question_six"
                                            name="question_six"
                                            value={values?.question_six}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="question_seven" className="form-label">Would you purchase the Bharat dal/ atta again.?</label>
                                        <input
                                            type="text"
                                            className="form-control py-4"
                                            id="question_seven"
                                            name="question_seven"
                                            value={values?.question_seven}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center my-4">
                                <button className="btn btn-primary btn-lg" type="submit" disabled={!isValid}>
                                    Submit
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserFeedbackForm