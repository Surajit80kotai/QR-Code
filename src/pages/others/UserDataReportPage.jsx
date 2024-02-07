import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReportData } from '../../services/slices/UtilitySlice';
import UserReportList from '../../components/core/reportPage/UserReportList';
import { Pagination } from 'react-bootstrap';

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
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    const dispatch = useDispatch();
    const { UserReportData } = useSelector(state => state.UtilitySlice);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        dispatch(getUserReportData({ header, currentPage, pageSize }));
    }, [dispatch, header, currentPage, pageSize]);

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
                                            UserReportData?.data?.length > 0 &&
                                            UserReportData?.data?.map((item, index) => (
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
                        <div className="d-flex justify-content-start">
                            <Pagination>
                                <Pagination.Prev
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                />
                                {UserReportData && Array.from({ length: UserReportData.pagination.totalPages }, (_, index) => (
                                    <Pagination.Item
                                        key={index}
                                        active={index + 1 === currentPage}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={UserReportData && currentPage === UserReportData.pagination.totalPages}
                                />
                            </Pagination>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default UserDataReportPage;