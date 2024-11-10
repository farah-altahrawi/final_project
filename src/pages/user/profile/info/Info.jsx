import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function ProfileInfo() {
    const userData = useOutletContext(); 

    return (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', color: '#343a40', marginBottom: '15px' }}>User Info</h3>
            {userData ? (
                <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: '0.3s' }}>
                    <p style={{ fontSize: '1.2rem', color: '#495057' }}>
                        <strong style={{ color: '#007bff' }}>Name:</strong> {userData.userName}
                    </p>
                </div>
            ) : (
                <div style={{ fontSize: '1.2rem', color: '#6c757d' }}>
                    Loading...
                </div>
            )}
        </div>
    );
}    
