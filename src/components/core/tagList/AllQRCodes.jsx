import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getQRcode, setDownloadError, setDownloading } from '../../../services/slices/UtilitySlice';
import CreateQR from '../QRCode/CreateQR';
import { Pagination } from 'react-bootstrap';


const AllQRCodes = () => {
    // State for current page
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = process.env.REACT_APP_PAGE_SIZE;

    const { flag } = useParams();
    const dispatch = useDispatch();
    const { QRdata } = useSelector(state => state.UtilitySlice);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Function to generate an array of pagination items
    const generatePaginationItems = (totalPages) => {
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

    // function for download pdf
    const handleDownloadPdf = async () => {
        try {
            dispatch(setDownloading(true)); // Set the state to indicate that download is in progress

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/qrcode/pdf/${flag}`, {
                method: 'GET',
            });

            if (response.ok) {
                const blob = await response.blob();

                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = flag + '.pdf';

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
            dispatch(setDownloading(false)); // Set the state to indicate that download is complete (whether successful or not)
        }
    };

    useEffect(() => {
        dispatch(getQRcode({ flag, page: currentPage, pageSize }));
    }, [dispatch, flag, currentPage, pageSize]);


    return (
        <>
            <div className="content-wrap">
                <div className="main">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-8 p-r-0 title-margin-right">
                                <div className="page-header">
                                    <div className="page-title d-flex">
                                        <h1>Taglist</h1>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 p-l-0 title-margin-left">
                                <div className="page-header">
                                    <div className="page-title">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="#">Taglist</Link></li>
                                            <li className="breadcrumb-item active">Home</li>
                                        </ol>

                                    </div>
                                </div>

                                <div className="d-flex justify-content-end mb-3 mx-4">
                                    <button className="btn btn-sm btn-success" onClick={handleDownloadPdf}>
                                        Download PDF<i className="ml-2 ti ti-download"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <section id="main-content">
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
                        </section>

                        {/* Pagination controls */}
                        <div className="col-12 mt-4">
                            <Pagination>
                                <Pagination.Prev
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                />
                                {generatePaginationItems(QRdata?.QRS_LENGTH)}
                                <Pagination.Next
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={QRdata?.QRS?.length < pageSize}
                                />
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllQRCodes