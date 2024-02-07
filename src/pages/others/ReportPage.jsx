import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getReportData, setDownloadError, setDownloading } from '../../services/slices/UtilitySlice';
import ReportList from '../../components/core/reportPage/ReportList';
import ReactPagination from '../../utility/ReactPagination';

const ReportPage = () => {
    // header
    const header = useMemo(() => {
        return {
            headers: {
                Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
            }
        };
    }, []);

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

    // handleDownloadReport function
    const handleDownloadReport = async () => {
        try {
            dispatch(setDownloading(true)); // Set the state to indicate that download is in progress

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/report/download-excel`, {
                method: 'GET',
                headers: header.headers
            });

            if (response.ok) {
                const blob = await response.blob();

                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = new Date() + ".xlsx";

                document.body.appendChild(a);
                a.click();

                document.body.removeChild(a);
            } else {
                console.error('Download failed:', response.statusText);
                dispatch(setDownloadError('Download failed: ' + response.statusText));
            }
        } catch (error) {
            console.error('Error:', error.message);
            dispatch(setDownloadError('Error: ' + error.message));
        } finally {
            dispatch(setDownloading(false));
        }
    };


    useEffect(() => {
        dispatch(getReportData(header));
    }, [dispatch, header]);

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
                                <Link to="#" onClick={handleDownloadReport} className="btn btn-primary btn-icon-split">
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