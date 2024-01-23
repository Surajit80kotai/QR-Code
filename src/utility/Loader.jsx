import React from 'react'

const Loader = () => {
    return (
        <>
            <div className="loading-container">
                <div className="i-loader-inf-horizontal-container">
                    <div className="i-loader-inf-horizontal"></div>
                    <div className="pt-8px">
                        <span style={{ fontSize: "14px", fontWeight: "400" }}>Processing...</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loader