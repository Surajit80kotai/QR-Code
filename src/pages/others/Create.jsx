import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { createQRcode } from '../../services/slices/UtilitySlice';

const Create = () => {
  const [formData, setFormData] = useState({
    tag: "",
    count: ""
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
      count: ""
    })
  };


  return (
    <>

      <div className="content-wrap">
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8 p-r-0 title-margin-right">
                <div className="page-header">
                  <div className="page-title">
                    <h1>Hello, <span>Welcome Here</span></h1>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 p-l-0 title-margin-left">
                <div className="page-header">
                  <div className="page-title">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><Link to="#">Dashboard</Link></li>
                      <li className="breadcrumb-item active">Home</li>
                    </ol>
                  </div>
                </div>
              </div>

            </div>

            <section id="main-content">
              <div className="row">
                <div className="col-md-6 m-auto">
                  <div className="card">
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>

                        <div className="form-group">
                          <label htmlFor='tag'> Tag </label>
                          <input
                            id='tag'
                            type="text"
                            className="form-control"
                            placeholder="Enter Tag"
                            name='tag'
                            value={formData.tag}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor='count'>Tag Number</label>
                          <input
                            id='count'
                            type="text"
                            className="form-control"
                            placeholder="Enter Tag Number"
                            name='count'
                            value={formData.count}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <button type="submit" className="btn btn-primary btn-flat m-b-30 m-t-30">Create</button>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default Create