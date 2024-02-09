import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReportData } from '../../services/slices/UtilitySlice';
import UserReportList from '../../components/core/reportPage/UserReportList';
import ReactPagination from '../../utility/ReactPagination';

const UserDataReportPage = () => {
    // header
    const header = useMemo(() => {
        return {
            headers: {
                Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
            }
        };
    }, []);

    // State for current page
    const [pageNumber, setPageNumber] = useState(0);

    const dispatch = useDispatch();
    const { UserReportData } = useSelector(state => state.UtilitySlice);

    // pagination
    const dataPerPage = process.env.REACT_APP_PAGE_SIZE;
    const pagesVisited = pageNumber * dataPerPage;
    const newTagData = UserReportData?.data?.slice(pagesVisited, pagesVisited + dataPerPage);
    const pageCount = Math.ceil((UserReportData?.data?.length || 0) / dataPerPage);


    const changePage = (newData) => {
        setPageNumber(newData?.selected)
    }


    useEffect(() => {
        dispatch(getUserReportData({ header, pageNumber, dataPerPage }));
    }, [dispatch, header, pageNumber, dataPerPage]);

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
                                        {
                                            newTagData?.length > 0 &&
                                            newTagData?.map((item, index) => (
                                                <UserReportList
                                                    key={index}
                                                    item={item}
                                                />
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="d-flex justify-content-start mb-3">
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

export default UserDataReportPage;