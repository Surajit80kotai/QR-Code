import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';
import React from 'react';

const Map = ({ data }) => {
    const mapContainerStyle = {
        height: '100%',
        width: '100%',
        aspectRatio: 1, // Ensure the map is square
    };

    const center = {
        lat: 20.5937, // Latitude for India
        lng: 78.9629, // Longitude for India
    };

    return (
        <>
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
                loadingElement={<div style={{ height: '100%' }} />}
                onLoad={() => console.log('Google Maps API loaded successfully')}
            >
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={5}
                >
                    {/* Render markers on the map based on the dashboardData?.HighlightedLocations data */}
                    <MarkerClusterer
                        gridSize={30}
                        minimumClusterSize={2}
                        enableRetinaIcons={true}
                        zoomOnClick={true}
                        maxZoom={10}
                        styles={[
                            {
                                textColor: 'white',
                                url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
                                height: 53,
                                width: 53,
                            },
                        ]}
                    >
                        {(clusterer) =>
                            data?.map((location) => (
                                <Marker
                                    key={location.id}
                                    position={{ lat: location.lat, lng: location.lng }}
                                    label={location.label}
                                    clusterer={clusterer}
                                />
                            ))
                        }
                    </MarkerClusterer>
                </GoogleMap>
            </LoadScript>
        </>
    )
}

export default Map