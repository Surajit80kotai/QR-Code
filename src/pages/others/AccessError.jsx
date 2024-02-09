import React from 'react'
import { Link } from 'react-router-dom'

const AccessError = () => {
    return (
        <>
            <div className='mt-5'>
                <div className="container-fluid" id="container-wrapper">
                    <div className="text-center">
                        <img src="/assets/img/error.svg" style={{ maxHeight: "100px" }} className="mb-3" alt='' />
                        <h3 className="text-gray-800 font-weight-bold">Oopss!</h3>
                        <p className="lead text-gray-800 mx-auto"> 403 Uh oh! Looks like you don't have access to this page.</p>
                        <Link to={`${process.env.REACT_APP_BASE_URL_PREFIX}/dashboard`}>&larr; Back to Dashboard</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccessError