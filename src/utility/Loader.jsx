import React from 'react'

const Loader = () => {
    return (
        <>
            <div className="loading-container">
                <div className="i-loader-inf-horizontal-container">
                    <div className="i-loader-inf-horizontal"></div>
                    <div className="pt-8px">
                        <span>
                            Generating QR Codes. It may take some time up to 10 min.
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loader