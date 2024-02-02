import React from 'react'

const QRLoader = () => {
    return (
        <>
            <div className="loading-container">
                <div className="i-loader-inf-horizontal-container">
                    <div className="i-loader-inf-horizontal"></div>
                    <div className="pt-8px">
                        <span>
                            Processing Please Wait...
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QRLoader;