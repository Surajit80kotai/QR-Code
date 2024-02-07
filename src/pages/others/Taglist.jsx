import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import List from '../../components/core/tagList/List';
import { useDispatch, useSelector } from 'react-redux';
import { getQRcodeTags } from '../../services/slices/UtilitySlice';
import ReactPagination from '../../utility/ReactPagination';

const Taglist = () => {
    // header
    const header = useMemo(() => {
        return {
            headers: {
                Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
            }
        };
    }, []);

    const [tagData, setTagData] = useState();
    const [pageNumber, setPageNumber] = useState(0);
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.UtilitySlice);

    // pagination
    const dataPerPage = process.env.REACT_APP_PAGE_SIZE;
    const pagesVisited = pageNumber * dataPerPage;
    const newTagData = tagData?.slice(pagesVisited, pagesVisited + dataPerPage);
    const pageCount = Math.ceil((tagData?.length || 0) / dataPerPage);

    const changePage = (newData) => {
        setPageNumber(newData?.selected)
    }

    useEffect(() => {
        dispatch(getQRcodeTags(header));
    }, [dispatch, header]);

    useEffect(() => {
        setTagData(data)
    }, [data]);

    return (
        <>
            <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Tag List</h1>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="./">Tag List</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                    </ol>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="table-responsive p-3">
                                <table className="table align-items-center table-flush" id="dataTable">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>SL. No.</th>
                                            <th>Tag</th>
                                            <th>Number of QR</th>
                                            <th>Total On Cashback</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {newTagData?.length > 0 &&
                                            newTagData?.map((item, index) => {
                                                return (
                                                    <List
                                                        key={index}
                                                        item={item}
                                                        index={index}
                                                    />
                                                )
                                            })
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

export default Taglist