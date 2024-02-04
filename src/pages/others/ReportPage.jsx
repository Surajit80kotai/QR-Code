import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getReportData } from '../../services/slices/UtilitySlice';
import ReportList from '../../components/core/reportPage/ReportList';
import ReactPagination from '../../utility/ReactPagination';

const ReportPage = () => {
    const [ReportData, setReportData] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);

    const dispatch = useDispatch();
    const { reportData } = useSelector(state => state.UtilitySlice);

    // pagination
    const dataPerPage = process.env.REACT_APP_PAGE_SIZE;
    const pagesVisited = pageNumber * dataPerPage;
    const newReportData = ReportData?.slice(pagesVisited, pagesVisited + dataPerPage);
    const pageCount = Math.ceil((ReportData?.length || 0) / dataPerPage);

    const changePage = (newData) => {
        setPageNumber(newData?.selected)
    }


    useEffect(() => {
        dispatch(getReportData());
    }, [dispatch]);

    useEffect(() => {
        setReportData(reportData);
    }, [reportData]);


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
                                        {
                                            newReportData?.length > 0 &&
                                            newReportData?.map((item, index) => {
                                                return (
                                                    <ReportList
                                                        key={index}
                                                        item={item}
                                                    />
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>



                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="d-flex justify-content-start">
                            <div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                                <ReactPagination
                                    pageCount={pageCount}
                                    changePage={changePage}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ReportPage