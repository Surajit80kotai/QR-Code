import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import List from '../../components/core/tagList/List';
import { useDispatch, useSelector } from 'react-redux';
import { getQRcodeTags } from '../../services/slices/UtilitySlice';

const Taglist = () => {
    const [tagData, setTagData] = useState();
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.UtilitySlice);

    useEffect(() => {
        dispatch(getQRcodeTags());
    }, [dispatch]);

    useEffect(() => {
        setTagData(data)
    }, [data]);

    return (
        <>
            <div className="content-wrap">
                <div className="main">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-8 p-r-0 title-margin-right">
                                <div className="page-header">
                                    <div className="page-title">
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
                            </div>
                        </div>
                        <section id="main-content">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-title">
                                            <h4>Table Bordered </h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>Sl</th>
                                                            <th>Tag</th>
                                                            <th>Number Of OR</th>
                                                            <th>Date</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {tagData &&
                                                            tagData?.map((item, index) => {
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
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Taglist