import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Payment: React.FC = () => {
    const { ref } = useParams();
    const [hasRedirected, setHasRedirected] = useState<boolean>(
        localStorage.getItem('paymentRedirected') === 'true'
    );

    useEffect(() => {
        const initiatePayment = async () => {
            try {
                const response = await axios.post('/payment', { ref });
                if (response.data.url) {
                    localStorage.setItem('paymentRedirected', 'true');
                    window.location.href = response.data.url;
                }
            } catch (error) {
                console.error('Error initiating payment:', error);
            }
        };

        if (ref && !hasRedirected) {
            initiatePayment();
        }
    }, [ref, hasRedirected]);

    const handleRetry = () => {
        localStorage.removeItem('paymentRedirected');
        setHasRedirected(false);
    };

    return (
        <div className="screen-height flex items-center justify-center flex-col gap-8">
            {hasRedirected ? (
                <div className="text-center">
                    <h1 className="text-2xl font-semibold mb-4">
                        Payment process completed or in progress.<br/>
                        Click below to retry if you were unable to complete the payment.
                    </h1>
                    <button
                        onClick={handleRetry}
                        className="px-6 py-2 bg-primary text-white rounded-md"
                    >
                        Retry Payment
                    </button>
                </div>
            ) : (
                <>
                    <FontAwesomeIcon
                        icon={faSpinner}
                        size="2x"
                        className="animate-spin text-primary"
                    />
                    <h1 className="text-2xl font-semibold">Redirecting to payment...</h1>
                </>
            )}
        </div>
    );
};

export default Payment;
