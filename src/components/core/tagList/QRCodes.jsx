import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getQRcode } from '../../../services/slices/UtilitySlice';
import CreateQR from '../QRCode/CreateQR';


const QRCodes = () => {
    const { flag } = useParams();
    const dispatch = useDispatch();
    const { QRdata } = useSelector(state => state.UtilitySlice);

    useEffect(() => {
        dispatch(getQRcode({ flag }));
    }, [dispatch, flag]);


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
                                    <button className="btn btn-sm btn-success">
                                        Download PDF<i className="ml-2 ti ti-download"></i>
                                    </button>
                                </div>
                            </div>

                        </div>


                        <section id="main-content">
                            <div className="row">
                                {
                                    QRdata?.map((item, index) => {
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

                    </div>
                </div>
            </div>
        </>
    )
}

export default QRCodes