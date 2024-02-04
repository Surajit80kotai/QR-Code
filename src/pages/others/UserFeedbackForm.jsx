import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
    const { feedbackData, loading } = useSelector((state) => state.UtilitySlice);

    const {
        values,
        errors,
        touched,
        isValid,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues: {
            full_name: '',
            upi_id: '',
            mobile_number: '',
            Recent_Purchases: '',
            Purchase_Location: '',
            otherPurchaseLocation: '',
            Purchase_Price: '',
            otherPrice: '',
            Quality_Rating: '',
            Future_Purchases: '',
            Additional_Comments: '',
            uuid: uuid,
        },
        validationSchema: feedbackFormValidationSchema,
        onSubmit: (values) => {
            // Assign "otherPrice" to "Purchase_Price" if the condition is met
            if (values?.Purchase_Price === 'Other') {
                values.Purchase_Price = values.otherPrice;
            }
            // Assign "otherPurchaseLocation" to "Purchase_Location" if the condition is met
            if (values?.Purchase_Location === 'Other' || values?.Purchase_Location === 'Any other') {
                values.Purchase_Location = values.otherPurchaseLocation;
            }
            // console.log({ values });
            dispatch(storeFeedbackData({ data: values, navigate, uuid }));
        },

        // // Submit when location access is on
        // onSubmit: async (values) => {
        //     if (locationPermission) {
        //         try {
        //             const locationData = await getLocationData();
        //             values?.location = locationData;
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
        navigator.permissions
            .query({ name: 'geolocation' })
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
            alert(
                'Location access is required for submitting the form. Please allow access.'
            );
        }

        if (
            feedbackData?.data?.data === 'expired' &&
            feedbackData?.data?.flag === false
        ) {
            navigate(`${process.env.REACT_APP_BASE_URL_PREFIX}/expired`);
        }

        return () => {
            dispatch(clearFeedbackData());
        };
    }, [dispatch, navigate, feedbackData, locationPermission, locationAlertShown]);

    return (
        <>
            {/* loader */}
            {loading && <AllPageLoader />}

            <div className="main_container">
                <div className="container-fluid">
                    {AVTIVE_WEB_URL === '/qr1' ? (
                        <div className="logo_brand d-flex justify-content-center align-item-center mt-4 mb-4">
                            <img src="/assets/img/nafed.jpg" alt="" className="img-fluid" width="200px" />
                        </div>
                    ) : (
                        <div className="logo_brand d-flex justify-content-center align-item-center mt-2">
                            <img src="/assets/img/kb.jpeg" alt="" className="img-fluid" width="500px" />
                        </div>
                    )}
                </div>
                <div className="container mt-5">
                    <div className="form_area">
                        <h6 className="text-center text-primary" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                            Please take a moment to fill out this feedback form regarding your experience with Bharat Products. Your insights are invaluable to us and will help us improve our offerings.
                        </h6>

                        <form onSubmit={handleSubmit}>
                            <div className="row mt-5">
                                {/* Your Name */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="full_name" className="form-label">
                                            Your Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="full_name"
                                            name="full_name"
                                            value={values?.full_name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            style={{ border: errors.full_name && touched.full_name ? '1px solid red' : null }}
                                        />
                                        {errors.full_name && touched.full_name && (
                                            <small className="form-text text-danger">*{errors.full_name}</small>
                                        )}
                                    </div>
                                </div>

                                {/* UPI ID */}
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
                                        />
                                        {errors.upi_id && touched.upi_id && (
                                            <small className="form-text text-danger">*{errors.upi_id}</small>
                                        )}
                                    </div>
                                </div>

                                {/* Mobile Number */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="mobile_number" className="form-label">
                                            Mobile Number <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="mobile_number"
                                            name="mobile_number"
                                            value={values?.mobile_number}
                                            onChange={handleChange}
                                            maxLength={10}
                                            onBlur={handleBlur}
                                            style={{ border: errors.mobile_number && touched.mobile_number ? '1px solid red' : null }}
                                        />
                                        {errors.mobile_number && touched.mobile_number && (
                                            <small className="form-text text-danger">*{errors.mobile_number}</small>
                                        )}
                                    </div>
                                </div>

                                {/* Dropdown for Bharat products */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="Recent_Purchases" className="form-label">
                                            Which Bharat brand have you recently purchased? <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            className="form-control"
                                            id="Recent_Purchases"
                                            name="Recent_Purchases"
                                            value={values?.Recent_Purchases}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            style={{ border: errors.Recent_Purchases && touched.Recent_Purchases ? '1px solid red' : null }}
                                        >
                                            <option value="" label="Select Bharat product" />
                                            <option value="Bharat Chana Dal">Bharat Chana Dal</option>
                                            <option value="Bharat Moong Dhuli Dal">Bharat Moong Dhuli Dal</option>
                                            <option value="Bharat Moong Sabut Dal">Bharat Moong Sabut Dal</option>
                                            <option value="Bharat Rice">Bharat Rice</option>
                                            <option value="Bharat Atta">Bharat Atta</option>
                                        </select>
                                        {errors.Recent_Purchases && touched.Recent_Purchases && (
                                            <small className="form-text text-danger">*{errors.Recent_Purchases}</small>
                                        )}
                                    </div>
                                </div>

                                {/* Purchase location */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="Purchase_Location" className="form-label">
                                            Where did you purchase the Bharat product(s)? <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            className="form-control"
                                            id="Purchase_Location"
                                            name="Purchase_Location"
                                            value={values?.Purchase_Location}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            style={{ border: errors.Purchase_Location && touched.Purchase_Location ? '1px solid red' : null }}
                                        >
                                            <option value="" label="Select purchase location" />
                                            <option value="Mobile Van">Mobile Van</option>
                                            <option value="Retail Chain/ E-commerce">Retail Chain/ E-commerce</option>
                                            <optgroup label="Specify Retail Chain/ E-commerce">
                                                <option value="Reliance">Reliance</option>
                                                <option value="Bigbasket">Bigbasket</option>
                                                <option value="Blinkit">Blinkit</option>
                                                <option value="Safal">Safal</option>
                                                <option value="Any other">Any other</option>
                                            </optgroup>
                                            <option value="Kirana Shop">Kirana Shop</option>
                                            <option value="Nafed Outlet">Nafed Outlet</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {errors.Purchase_Location && touched.Purchase_Location && (
                                            <small className="form-text text-danger">*{errors.Purchase_Location}</small>
                                        )}
                                    </div>
                                </div>
                                {/* Text area for 'Other' option */}
                                {(values?.Purchase_Location === 'Other' || values?.Purchase_Location === 'Any other') && (
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="otherPurchaseLocation" className="form-label">
                                                Please Specify Purchase Location
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="otherPurchaseLocation"
                                                name="otherPurchaseLocation"
                                                value={(values?.Purchase_Location === 'Other' || values?.Purchase_Location === 'Any other') ? values?.otherPurchaseLocation || '' : ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Purchase price */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="Purchase_Price" className="form-label">
                                            At what price did you purchase Bharat products? <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            className="form-control"
                                            id="Purchase_Price"
                                            name="Purchase_Price"
                                            value={values?.Purchase_Price}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            style={{ border: errors.Purchase_Price && touched.Purchase_Price ? '1px solid red' : null }}
                                        >
                                            <option value="" label="Select purchase price" />
                                            <option value="₹27.50 (in case of Bharat Atta)">₹27.50 (in case of Bharat Atta)</option>
                                            <option value="₹29.00 (in case of Bharat Rice)">₹29.00 (in case of Bharat Rice)</option>
                                            <option value="₹60.00 (in case of Bharat Chana Dal)">₹60.00 (in case of Bharat Chana Dal)</option>
                                            <option value="Rs. 93 (in case of Bharat Sabut Moong Dal)">Rs. 93 (in case of Bharat Sabut Moong Dal)</option>
                                            <option value="Rs. 107 (in case of Bharat Dhuli Moong Dal)">Rs. 107 (in case of Bharat Dhuli Moong Dal)</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {errors.Purchase_Price && touched.Purchase_Price && (
                                            <small className="form-text text-danger">*{errors.Purchase_Price}</small>
                                        )}
                                    </div>
                                </div>
                                {/* Text area for 'Other' option */}
                                {(values?.Purchase_Price === 'Other' || values?.Purchase_Price === 'Any other') && (
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="otherPrice" className="form-label">
                                                Please Specify Purchase Price
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="otherPrice"
                                                name="otherPrice"
                                                value={(values?.Purchase_Price === 'Other') ? values?.otherPrice || '' : ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Quality rating */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="Quality_Rating" className="form-label">
                                            How would you rate the quality of the Bharat products you purchased? <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            className="form-control"
                                            id="Quality_Rating"
                                            name="Quality_Rating"
                                            value={values?.Quality_Rating}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            style={{ border: errors.Quality_Rating && touched.Quality_Rating ? '1px solid red' : null }}
                                        >
                                            <option value="" label="Select quality rating" />
                                            <option value="Excellent">Excellent</option>
                                            <option value="Good">Good</option>
                                            <option value="Average">Average</option>
                                            <option value="Poor">Poor</option>
                                        </select>
                                        {errors.Quality_Rating && touched.Quality_Rating && (
                                            <small className="form-text text-danger">*{errors.Quality_Rating}</small>
                                        )}
                                    </div>
                                </div>

                                {/* Future purchases */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="Future_Purchases" className="form-label">
                                            Would you consider purchasing Bharat products again in the future? <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            className="form-control"
                                            id="Future_Purchases"
                                            name="Future_Purchases"
                                            value={values?.Future_Purchases}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            style={{ border: errors.Future_Purchases && touched.Future_Purchases ? '1px solid red' : null }}
                                        >
                                            <option value="" label="Select your choice" />
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                        {errors.Future_Purchases && touched.Future_Purchases && (
                                            <small className="form-text text-danger">*{errors.Future_Purchases}</small>
                                        )}
                                    </div>
                                </div>

                                {/* Additional comments */}
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label htmlFor="Additional_Comments" className="form-label">
                                            Additional Comments
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="Additional_Comments"
                                            name="Additional_Comments"
                                            value={values?.Additional_Comments}
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
    );
};

export default UserFeedbackForm;