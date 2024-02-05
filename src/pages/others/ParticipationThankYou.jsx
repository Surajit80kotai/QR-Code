import React, { useState, useEffect } from 'react';

const ParticipationThankYou = () => {
    const [isAnimated, setAnimated] = useState(false);

    useEffect(() => {
        setAnimated(true);
    }, []);

    return (
        <>
            <div className={`vh-100 d-flex justify-content-center align-items-center ${isAnimated ? 'overlay-show' : 'overlay-hide'}`}>
                <div className={`shadow-lg p-3 mb-5 bg-body rounded ${isAnimated ? 'popup-show' : 'popup-hide'}`} style={{ width: "800px", opacity: isAnimated ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}>
                    <div className="mb-4 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`text-success bi bi-check-circle-fill ${isAnimated ? 'popup-show' : 'popup-hide'}`} width="75" height="75"
                            fill="currentColor" viewBox="0 0 16 16"
                        >
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                    </div>
                    <div className="text-center">
                        <h1>Thank You !</h1>
                        <p>
                            Thank you for your participation. Unfortunately, you have not won the award this time. Should you be selected as a winner in the future, rest assured, you will be promptly notified. Better luck next time!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ParticipationThankYou;