import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { createQRcode } from '../../services/slices/UtilitySlice';

const Create = () => {
  const [formData, setFormData] = useState({
    tag: "",
    count: "",
    cashback: "",
    cashback_amount: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData }
    dispatch(createQRcode({ data, navigate }));
    setFormData({
      ...formData,
      tag: "",
      count: "",
      cashback: "",
      cashback_amount: "",
    })
  };


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
                              value={formData.tag}
                              onChange={handleChange}
                              required
                            />
                            <small id="" className="form-text text-muted"></small>
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
                              value={formData.count}
                              onChange={handleChange}
                              required
                            />
                            <small id="" className="form-text text-muted"></small>
                          </div>
                        </div>

                        <div className="col-lg-3">
                          <div className="form-group">
                            <label htmlFor="cashback">Number Of Cashback</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Number Of Cashback"
                              id="cashback"
                              name='cashback'
                              value={formData.cashback}
                              onChange={handleChange}
                              required
                            />
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
                              value={formData.cashback_amount}
                              onChange={handleChange}
                              required
                            />
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
        </div>
      </div>
    </>
  )
}

export default Create