import { QRCodeSVG } from 'qrcode.react';
import React from 'react'
import { Link } from 'react-router-dom'

const CreateQR = ({ item }) => {

    return (
        <>
            <div className="col-md-3" >
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
                                    // level={`/assets/images/barnd-logo.png` ? 'M' : 'L'}
                                    size={370}
                                    includeMargin={true}
                                // imageSettings={
                                //     !!item?.logo?.src
                                //         ? {
                                //             src: "/assets/images/barnd-logo.png",
                                //             height: 64,
                                //             width: 64,
                                //             excavate: true,
                                //         }
                                //         : undefined
                                // }
                                />
                            </div>
                            <div className="url" style={{ width: "160px" }}>
                                <Link to="#">{item?.shortLink}</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateQR