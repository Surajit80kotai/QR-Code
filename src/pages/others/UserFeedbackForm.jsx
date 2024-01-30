import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { clearFeedbackData, storeFeedbackData } from '../../services/slices/UtilitySlice';
import AllPageLoader from '../../utility/AllPageLoader';

const UserFeedbackForm = () => {
    const { uuid } = useParams();
    const [formValues, setFormValues] = useState({
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
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { feedbackData, loading } = useSelector(state => state.UtilitySlice);

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { ...formValues };
        dispatch(storeFeedbackData({ data, navigate, uuid }));
    };


    useEffect(() => {
        if (feedbackData?.data?.data === "expired" && feedbackData?.data?.flag === false) {
            navigate(`${process.env.REACT_APP_BASE_URL_PREFIX}/expired`);
        }

        return () => {
            dispatch(clearFeedbackData());
        }
    }, [dispatch, navigate, feedbackData]);

    return (
        <>
            {/* loader */}
            {loading && <AllPageLoader />}

            <div className="contact_info">
                <div className="call">
                    <Link to="tel: +91-1140541648">Call us:- +91-1140541648</Link>
                </div>
                <div className="mail_id">
                    <Link to="mailto:Mail:info@iref.net">Mail:- info@iref.net</Link>
                </div>
            </div>

            <div className="main_container">
                <div className="container-fluid">
                    {/* <div className="logo_brand d-flex justify-content-center align-item-center mt-2">
                        <img src="/assets/images/kb.jpeg" alt="" className="img-fluid" width="200px" />
                    </div> */}

                    {/* "https://kendriyabhandar.org" */}
                    <div className="logo_brand d-flex justify-content-center align-item-center mt-4 mb-4">
                        <img src="/assets/images/kb.jpeg" alt="" className="img-fluid" width="500px" />
                    </div>

                </div>
                <div className="container mt-5">
                    <div className="form_area">
                        <h6 className="title_area">
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
                                            value={formValues?.full_name}
                                            onChange={handleChange}
                                            required
                                        />
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
                                            value={formValues?.upi_id}
                                            onChange={handleChange}
                                            required
                                        />
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
                                            value={formValues?.mobile_number}
                                            onChange={handleChange}
                                            maxLength={10}
                                            required
                                        />
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
                                            value={formValues?.question_one}
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
                                            value={formValues?.question_two}
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
                                            value={formValues?.question_three}
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
                                            value={formValues?.question_four}
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
                                            value={formValues?.question_five}
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
                                            value={formValues?.question_six}
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
                                            value={formValues?.question_seven}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center my-4">
                                <button className="btn btn-primary btn-lg" type="submit">Submit</button>
                            </div>

                        </form>

                    </div>
                </div>

                {/* footer */}

                <footer className="footer mt-5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="foot_link">
                                    <h2 className="foot_lint_title">
                                        About us
                                    </h2>
                                    <p className="text-white">
                                        The Indian Rice Exporters Federation (IREF) operates under the guiding motto of “One
                                        Nation, One Trade, One Policy,” emphasizing the federation’s commitment to fostering
                                        unity and coherence across the diverse landscapes of India’s rice export sector.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-3 links">
                                <h2 className="foot_lint_title">
                                    Quick Links
                                </h2>
                                <li><Link to="">Image</Link></li>
                                <li><Link to="">Video News</Link></li>
                                <li><Link to="">IREF Efforts</Link></li>
                                <li><Link to="">Daily Updates</Link></li>
                                <li><Link to="">Governing Body</Link></li>
                            </div>
                            <div className="col-md-3 links">
                                <h2 className="foot_lint_title">
                                    Links
                                </h2>
                                <li><Link to="">Dr. Prem Garg</Link></li>
                                <li><Link to="">Mission </Link></li>
                                <li><Link to="">Service</Link></li>
                                <li><Link to="">Media News</Link></li>
                                <li><Link to="">Season of Rice</Link></li>
                            </div>
                            <div className="col-md-3 links">
                                <h2 className="foot_lint_title">
                                    Contact
                                </h2>
                                <div className="mb-3 text-white">
                                    <span className="text-dark"> <b>ADDRESS</b></span>
                                    <h6>
                                        Office at 73 LGF World Trade Centre, Hotel Lalit, Connaught Place, New Delhi 110001
                                    </h6>
                                </div>
                                <div className="mb-3 text-white">
                                    <span className="text-dark"> <b>Toll free</b></span>
                                    <h6>
                                        18004190511
                                    </h6>
                                </div>
                                <div className="mb-3 text-white">
                                    <span className="text-dark"> <b>EMAIL</b></span>
                                    <h6>
                                        info@iref.net
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default UserFeedbackForm