import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getQRcode } from '../../../services/slices/UtilitySlice';
import CreateQR from '../QRCode/CreateQR';
import { Pagination } from 'react-bootstrap';


const QRCodes = () => {
    // State for current page
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = process.env.REACT_APP_PAGE_SIZE

    const { flag } = useParams();
    const dispatch = useDispatch();
    const { QRdata } = useSelector(state => state.UtilitySlice);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Function to generate an array of pagination items
    const generatePaginationItems = (totalPages) => {
        const items = [];
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
        return items;
    };

    // handleDownloadPdf for PDF download
    const handleDownloadPdf = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/qrcode/pdf/${flag}`, {
                method: 'GET',
            });

            if (response.ok) {
                const blob = await response.blob();

                // Create a download link
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = flag + '.pdf';

                document.body.appendChild(a);
                a.click();

                document.body.removeChild(a);
            } else {
                console.error('Download failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error.message);
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

                                {/* Pagination controls */}
                                <div className="col-12 mt-4">
                                    <Pagination>
                                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                                        {generatePaginationItems(QRdata?.QRS_LENGTH)} {/* Adjust the parameter based on your total number of pages */}
                                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={QRdata?.length < 10} />
                                    </Pagination>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </>
    )
}

export default QRCodes