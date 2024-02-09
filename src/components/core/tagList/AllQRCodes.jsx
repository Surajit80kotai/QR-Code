import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import {
    downloadPdf, getQRcode,
    // setDownloadError, setDownloading
} from '../../../services/slices/UtilitySlice';
import CreateQR from '../QRCode/CreateQR';
import { Pagination } from 'react-bootstrap';


const AllQRCodes = () => {
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
    const [toogleButton, setToogleButton] = useState(true);
    const pageSize = process.env.REACT_APP_PAGE_SIZE;

    const { flag } = useParams();
    const dispatch = useDispatch();
    const { QRdata } = useSelector(state => state.UtilitySlice);
    // console.log(QRdata);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Function to generate an array of pagination items
    const generatePaginationItems = (totalPages) => {
        // console.log("totalPages", Math.ceil(totalPages));
        const items = [];
        const maxPagesToShow = 15;

        if (totalPages <= maxPagesToShow) {
            // If total pages are less than or equal to the maximum pages to show, display all pages
            for (let i = 1; i <= totalPages; i++) {
                items?.push(
                    <Pagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </Pagination.Item>
                );
            }
        } else {
            // If total pages are more than the maximum pages to show, display a subset
            const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
            const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

            // Add "First" pagination item
            items?.push(
                <Pagination.First
                    key="first"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                />
            );

            // Add pagination items for the subset of pages
            for (let i = startPage; i <= endPage; i++) {
                items?.push(
                    <Pagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </Pagination.Item>
                );
            }

            // Add "Last" pagination item
            items?.push(
                <Pagination.Last
                    key="last"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                />
            );
        }

        return items;
    };

    const handleDownloadPdf = () => {
        dispatch(downloadPdf({ flag, page: currentPage, pageSize, header }));
    };

    // refresh function
    const handlePageRefresh = () => {
        if (QRdata?.TOTAL_QRS_LENGTH !== QRdata?.TAG_DATA_COUNT) {
            dispatch(getQRcode({ flag, page: currentPage, pageSize }));
        }
    }

    // reload page
    const handleReloadClick = () => {
        window.location.reload(); // Reload the page
    };

    useEffect(() => {
        dispatch(getQRcode({ flag, page: currentPage, pageSize }));
    }, [dispatch, flag, currentPage, pageSize, header]);

    useEffect(() => {
        if (QRdata?.TOTAL_QRS_LENGTH !== QRdata?.TAG_DATA_COUNT) {
            setToogleButton(true);
        } else {
            setToogleButton(false);
        }
    }, [QRdata]);


    return (
        <>
            <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">

                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="./">Dashboard</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Scan</li>
                    </ol>
                    <div>
                        {
                            toogleButton ?
                                <Link to="#" onClick={handlePageRefresh} className="btn btn-primary btn-icon-split">
                                    <span className="icon text-white-50">
                                        <i className="fas fa-sync-alt"></i>
                                    </span>
                                    <span className="text">{`${QRdata?.TOTAL_QRS_LENGTH} QR Generated Please Refresh`}</span>
                                </Link>
                                :
<<<<<<< HEAD
                                QRdata?.isPDF === 'DONE' ?
=======
                                QRdata?.isPDF ?
>>>>>>> 9795d4824c77471327a26eaebffc94d9a471ae2f
                                    <a href={`${process.env.REACT_APP_BASE_URL}/qrcode/download/${flag}.pdf`} className="btn btn-success btn-icon-split">
                                        <span className="icon text-white-50">
                                            <i className="fas fa-download"></i>
                                        </span>
                                        <span className="text">Download PDF</span>
                                    </a>
<<<<<<< HEAD
                                    : QRdata?.isPDF === 'PENDING' ?
                                        <Link to="#" onClick={handleReloadClick} className="btn btn-warning btn-icon-split">
                                            <span className="icon text-white-50">
                                                <i className="fas fa-upload"></i>
                                            </span>
                                            <span className="text">Please Wait....</span>
                                        </Link>
                                        :
                                        <Link to="#" onClick={handleDownloadPdf} className="btn btn-warning btn-icon-split">
                                            <span className="icon text-white-50">
                                                <i className="fas fa-upload"></i>
                                            </span>
                                            <span className="text">Generate PDF For Download</span>
                                        </Link>
=======
                                    :
                                    <Link to="#" onClick={handleDownloadPdf} className="btn btn-warning btn-icon-split">
                                        <span className="icon text-white-50">
                                            <i className="fas fa-upload"></i>
                                        </span>
                                        <span className="text">Generate PDF For Download</span>
                                    </Link>
>>>>>>> 9795d4824c77471327a26eaebffc94d9a471ae2f
                        }
                    </div>

                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            {
                                QRdata?.QRS?.map((item, index) => {
                                    return (
                                        <CreateQR
                                            key={index}
                                            item={item}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="col-12 mt-4">
                        <Pagination>
                            <Pagination.Prev
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            />
                            {generatePaginationItems(Math.ceil(QRdata?.TAG_DATA_COUNT / pageSize))}
                            <Pagination.Next
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={QRdata?.QRS?.length < pageSize}
                            />
                        </Pagination>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllQRCodes