import { QRCodeSVG } from 'qrcode.react';
import React from 'react'
import { Link } from 'react-router-dom'

const CreateQR = ({ item }) => {

    return (
        <>
            <div className="col-md-3 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="qr_code_area">
                            <div className="Qr_code">
                                <QRCodeSVG
                                    className={item?.link !== '' ? '' : 'code__qr_disabled'}
                                    value={
                                        item?.shortLink
                                            ? `${item?.link}${process.env.REACT_APP_BASE_URL_PREFIX}/fd/${item?.shortLink}`
                                            : item?.link
                                    }
                                    bgColor={item?.style?.bgColor}
                                    fgColor={item?.style?.patternColor}
                                    size={370}
                                    includeMargin={true}
                                />
                            </div>
                            <div className="url" style={{ width: "160px" }}>
                                <Link to="#" style={{ textDecoration: "none", fontSize:"13px" }}>{item?.shortLink}</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateQR