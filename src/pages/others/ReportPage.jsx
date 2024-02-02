import React from 'react'
import { Link } from 'react-router-dom'

const ReportPage = () => {
    return (
        <>
            <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Cashback Report</h1>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="./">Cashback Report</Link></li>
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
                                <table className="table align-items-center table-flush" id="dataTable">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Transaction ID</th>
                                            <th>Transaction Date</th>
                                            <th>Transaction Amount</th>
                                            <th>No of QR</th>
                                            <th>QR ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>01-02-2024</td>
                                            <td><span className="badge badge-success">₹ 23541</span></td>
                                            <td>12456</td>
                                            <td>1564</td>
                                        </tr>

                                    </tbody>
                                </table>



                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="d-flex justify-content-start">
                            <div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                                <ul className="pagination">
                                    <li className="paginate_button page-item previous disabled" id="dataTable_previous"><Link to="#"
                                        aria-controls="dataTable" data-dt-idx="0" tabIndex="0" className="page-link">Previous</Link></li>
                                    <li className="paginate_button page-item active"><Link to="#" aria-controls="dataTable" data-dt-idx="1"
                                        tabIndex="0" className="page-link">1</Link></li>
                                    <li className="paginate_button page-item "><Link to="#" aria-controls="dataTable" data-dt-idx="2"
                                        tabIndex="0" className="page-link">2</Link></li>
                                    <li className="paginate_button page-item "><Link to="#" aria-controls="dataTable" data-dt-idx="3"
                                        tabIndex="0" className="page-link">3</Link></li>
                                    <li className="paginate_button page-item "><Link to="#" aria-controls="dataTable" data-dt-idx="4"
                                        tabIndex="0" className="page-link">4</Link></li>
                                    <li className="paginate_button page-item "><Link to="#" aria-controls="dataTable" data-dt-idx="5"
                                        tabIndex="0" className="page-link">5</Link></li>
                                    <li className="paginate_button page-item "><Link to="#" aria-controls="dataTable" data-dt-idx="6"
                                        tabIndex="0" className="page-link">6</Link></li>
                                    <li className="paginate_button page-item next" id="dataTable_next"><Link to="#" aria-controls="dataTable"
                                        data-dt-idx="7" tabIndex="0" className="page-link">Next</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ReportPage