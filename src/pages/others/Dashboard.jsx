import React, { useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDashboardData } from '../../services/slices/UtilitySlice';

const Dashboard = () => {

    const mapContainerStyle = {
        height: '100%',
        width: '100%',
        aspectRatio: 1, // Ensure the map is square
    };

    const center = {
        lat: 20.5937, // Latitude for India
        lng: 78.9629, // Longitude for India
    };

    const dispatch = useDispatch();
    const { dashboardData } = useSelector(state => state.UtilitySlice);

    useEffect(() => {
        dispatch(getDashboardData());
    }, [dispatch]);

    return (
        <>
            <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="./">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                    </ol>
                </div>

                {/* <div className="d-flex justify-content-end mb-3">
                    <div className="dropdown no-arrow">
                        <Link className="dropdown-toggle btn btn-primary btn-sm" to="#" role="button" id="dropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Month <i className="fas fa-chevron-down"></i>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                            aria-labelledby="dropdownMenuLink">
                            <div className="dropdown-header">Select Periode</div>
                            <Link className="dropdown-item active" to="#">Today</Link>
                            <Link className="dropdown-item" to="#">Week</Link>
                            <Link className="dropdown-item" to="#">Month</Link>
                            <Link className="dropdown-item" to="#">This Year</Link>
                        </div>
                    </div>
                </div> */}

                <div className="row mb-3">
                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    <div className="col-xl-4 col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-uppercase mb-1">Total Cashback</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">₹{dashboardData?.TotalCashBack}</div>
                                        {/* <div className="mt-2 mb-0 text-muted text-xs">
                                            <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                                            <span>Since last month</span>
                                        </div> */}
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-wallet fa-2x text-primary"></i>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Earnings (Annual) Card Example --> */}
                    <div className="col-xl-4 col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-uppercase mb-1">Total QR Create</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{dashboardData?.AllQRCodesCount}</div>
                                        {/* <div className="mt-2 mb-0 text-muted text-xs">
                                            <span className="text-success mr-2"><i className="fas fa-arrow-up"></i> 12%</span>
                                            <span>Since last Month</span>
                                        </div> */}
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-qrcode fa-2x text-success"></i>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- New User Card Example --> */}
                    <div className="col-xl-4 col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-uppercase mb-1">Total QR Scaned</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{dashboardData?.UsedQRCodesCount}</div>
                                        {/* <div className="mt-2 mb-0 text-muted text-xs">
                                            <span className="text-success mr-2"><i className="fas fa-arrow-up"></i> 20.4%</span>
                                            <span>Since last month</span>
                                        </div> */}
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-qrcode fa-2x text-info"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Google map */}
                    <div className="col-xl-12 col-lg-7">
                        <LoadScript
                            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
                        >
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={center}
                                zoom={5}
                            >
                                {/* Render markers on the map based on the highlightedLocations data */}
                                {dashboardData?.HighlightedLocations?.map((location) => (
                                    <Marker
                                        key={location.id}
                                        position={{ lat: location.lat, lng: location.lng }}
                                        label={location.label}
                                    />
                                ))}
                            </GoogleMap>
                        </LoadScript>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Dashboard