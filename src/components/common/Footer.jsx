import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <div className="content-wrap">
                <div className="main">
                    <div className="container-fluid">
                        <section id="main-content">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="footer">
                                        <p>2018 © Admin Board. - <Link to="#">example.com</Link></p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer