import React, { useState, useEffect } from 'react';

const Expired = () => {
    const [isAnimated, setAnimated] = useState(false);

    useEffect(() => {
        // Set isAnimated to true after the component mounts
        setAnimated(true);
    }, []);

    return (
        <>
            <div className={`vh-100 d-flex justify-content-center align-items-center ${isAnimated ? 'overlay-show' : 'overlay-hide'}`}>
                <div className={`shadow-lg p-3 mb-5 bg-body rounded ${isAnimated ? 'popup-show' : 'popup-hide'}`} style={{ width: "800px", opacity: isAnimated ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}>
                    <div className="mb-4 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-danger bi bi-x-circle-fill" width="75" height="75"
                            fill="currentColor" viewBox="0 0 16 16">
                            <path
                                d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm3.354-11.354a.5.5 0 0 0-.708 0L8 7.293 5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0 0-.708z" />
                        </svg>
                    </div>
                    <div className="text-center">
                        <h1>Link Expired !</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Expired;
