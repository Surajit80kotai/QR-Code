import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createQRcode } from '../../services/slices/UtilitySlice';
import { useFormik } from 'formik';
import { createQRtagSchema } from '../../helper/FormValidation';


const Create = () => {
  const initialValues = {
    tag: "",
    count: "",
    cashback_lucky_users: "",
    cashback_amount: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: createQRtagSchema,
    onSubmit: (values) => {
      const data = { ...values };
      dispatch(createQRcode({ data, navigate }));
    }
  });


  return (
    <>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Create</h1>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="./">Create</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
              </ol>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card h-100">
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="row">

                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="tag">Tag</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Tag"
                              id="tag"
                              name='tag'
                              value={values?.tag}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              style={{ border: errors?.tag && touched?.tag ? "1px solid red" : null }}
                            />
                            {
                              errors?.tag && touched?.tag ?
                                <small className="form-text text-danger">*{errors?.tag}</small>
                                : null
                            }
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="count">Tag Number</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Tag number"
                              id="count"
                              name='count'
                              value={values?.count}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              style={{ border: errors?.count && touched?.count ? "1px solid red" : null }}
                            />
                            {
                              errors?.count && touched?.count ?
                                <small className="form-text text-danger">*{errors?.count}</small>
                                : null
                            }
                          </div>
                        </div>

                        <div className="col-lg-3">
                          <div className="form-group">
                            <label htmlFor="cashback_lucky_users">Number Of Cashback</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Number Of Cashback"
                              id="cashback_lucky_users"
                              name='cashback_lucky_users'
                              value={values?.cashback_lucky_users}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              style={{ border: errors?.cashback_lucky_users && touched?.cashback_lucky_users ? "1px solid red" : null }}
                            />
                            {
                              errors?.cashback_lucky_users && touched?.cashback_lucky_users ?
                                <small className="form-text text-danger">*{errors?.cashback_lucky_users}</small>
                                : null
                            }
                          </div>
                        </div>

                        <div className="col-lg-3">
                          <div className="form-group">
                            <label htmlFor="cashback_amount">Cashback Of Amount</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Cashback Of Amount"
                              id="cashback_amount"
                              name='cashback_amount'
                              value={values?.cashback_amount}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              style={{ border: errors?.cashback_amount && touched?.cashback_amount ? "1px solid red" : null }}
                            />
                            {
                              errors?.cashback_amount && touched?.cashback_amount ?
                                <small className="form-text text-danger">*{errors?.cashback_amount}</small>
                                : null
                            }
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mt-4">
                        <button type="submit" className="btn btn-primary">Create</button>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    </>
  )
}

export default Create