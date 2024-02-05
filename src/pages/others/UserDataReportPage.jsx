import React from 'react'
import ReactPagination from '../../utility/ReactPagination';
import { Link } from 'react-router-dom';

const UserDataReportPage = () => {
    return (
        <>
            <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">User Data Report</h1>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="./">User Data Report</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                    </ol>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="card mb-4">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-end">
                                <Link to="#" className="btn btn-primary btn-icon-split">
                                    <span className="icon text-white-50">
                                        <i className="fas fa-download"></i>
                                    </span>
                                    <span className="text">Download</span>
                                </Link>
                            </div>
                            <div className="table-responsive p-3">
                                <table className="table align-items-center table-flush" id="dataTable" style={{ overflow: "scroll" }}>
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Mobile Number</th>
                                            <th>Recent Purchases</th>
                                            <th>Product Quality Feedback</th>
                                            <th>Purchase Location</th>
                                            <th>Purchase Price</th>
                                            <th>Future Purchases</th>
                                            <th>Additional Comments</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>N/A</td>
                                            <td>N/A</td>
                                            <td>N/A</td>
                                            <td>N/A</td>
                                            <td>N/A</td>
                                            <td>N/A</td>
                                            <td>N/A</td>
                                            <td>N/A</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="d-flex justify-content-start">
                            <div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                                <ReactPagination
                                // pageCount={pageCount}
                                // changePage={changePage}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default UserDataReportPage;