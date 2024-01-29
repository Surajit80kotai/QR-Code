import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <>
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
                    <div className="logo_brand d-flex justify-content-center align-item-center mt-2">
                        <img src="/assets/images/shri-lal-mahal-logo.jpg" alt="" className="img-fluid" width="200px" />
                    </div>
                </div>
                <div className="container mt-5">
                    <div className="form_area">
                        <h6 className="title_area">
                            Please complete the feedback form to enable us to improve our product experience! For your time you
                            will get a cash back of Rs 5 on your Aadhar ID/UPI after completing the survey.
                        </h6>
                        <form action="" method="post">
                            <div className="row mt-5">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Your Name <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control py-4" id="" aria-describedby="" name="name"
                                            required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Please enter your UPI ID <span
                                            className="text-danger">*</span></label>
                                        <input type="text" className="form-control py-4" id="" aria-describedby="" name="upiid"
                                            required />
                                        <div id="" className="form-text"></div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Mobile Number <span
                                            className="text-danger">*</span></label>
                                        <input type="text" className="form-control py-4" id="" aria-describedby="" name="phone"
                                            required />

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Have you recently purchased 'Bharat Atta' or 'Bharat
                                            Dal' ?</label>
                                        <input type="text" className="form-control py-4" id="" aria-describedby="" name="purchese"
                                            required />
                                        <div id="" className="form-text"></div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">How did you find the product?</label>
                                        <input type="text" className="form-control py-4" id="" aria-describedby="" name="find"
                                            required />
                                        <div id="" className="form-text"></div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Do you have any comments about the quality of our
                                            products?</label>
                                        <input type="text" className="form-control py-4" id="" aria-describedby="" name="quality"
                                            required />
                                        <div id="" className="form-text"></div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Where did you purchase this product from?</label>
                                        <input type="text" className="form-control py-4" id="" aria-describedby=""
                                            name="purchaseproduct" required />
                                        <div id="" className="form-text"></div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">How was your experience with the purchase?</label>
                                        <input type="text" className="form-control py-4" id="" aria-describedby="" name="experience"
                                            required />
                                        <div id="" className="form-text"></div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">At what price did you purchase the product?</label>
                                        <input type="text" className="form-control py-4" id="" aria-describedby="" name="price"
                                            required />
                                        <div id="" className="form-text"></div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Would you purchase the Bharat dal/ atta again.?</label>
                                        <input type="text" className="form-control py-4" id="" aria-describedby=""
                                            name="purchaseagain" required />
                                        <div id="" className="form-text"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center my-4">
                                <button className="btn btn-primary btn-lg" type="button">Submit</button>
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

export default Landing