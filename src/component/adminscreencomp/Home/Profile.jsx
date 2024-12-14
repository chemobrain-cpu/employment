import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

export const ProfileComponent = () => {
    let [isData, setIsData] = useState(null);
    let { user } = useSelector(state => state.userAuth);
    let { id } = useParams();

    useEffect(() => {
        if (user) {
            setIsData(user);
        }
    }, [id, user]);

    // Function to format dates
    const formatDate = (date) => {
        if (!date) return 'N/A';
        const newDate = new Date(date);
        return newDate.toLocaleDateString(); // Formats to MM/DD/YYYY
    };

    if (!isData) {
        return <div>Loading...</div>; // Show loading message until data is available
    }

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#fff', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Profile Section */}
                <div style={{ width: '100%', marginBottom: '20px', animation: 'fadeIn 0.6s ease' }}>
                    <div style={{
                        backgroundColor: '#87CEEB', // Lighter blue
                        padding: '20px',
                        borderRadius: '8px',
                        
                    }}>
                        <h2 style={{ fontSize: '1.8rem', color: '#3a4d6c', marginBottom: '10px' }}>Profile</h2>
                        <div style={{ textAlign: 'center' }}>
                            <img
                                src={isData.profilePhoto || 'https://via.placeholder.com/150'}
                                alt="Profile"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    border: '2px solid #3a4d6c',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            <h3 style={{ fontSize: '1.4rem', color: '#3a4d6c' }}>{isData.fullName || 'Full Name'}</h3>
                            <p style={{ fontSize: '1rem', color: '#555' }}>Patient ID: {isData.patientId || 'N/A'}</p>
                            <p style={{ fontSize: '1rem', color: '#555' }}>Gender: {isData.gender || 'N/A'}</p>
                            <p style={{ fontSize: '1rem', color: '#555' }}>Date of Birth: {formatDate(isData.dateOfBirth) || 'N/A'}</p>
                        </div>
                    </div>
                </div>

                {/* Patient Identification Information Section */}
                <div style={{ width: '100%', marginBottom: '20px', animation: 'fadeIn 0.6s ease 0.2s' }}>
                    <div style={{
                        backgroundColor: '#87CEEB',
                        padding: '20px',
                        borderRadius: '8px',
                        
                    }}>
                        <h2 style={{ fontSize: '1.8rem', color: '#3a4d6c', marginBottom: '10px' }}>Patient Information</h2>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Full Name:</strong> {isData?.fullName || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Patient ID:</strong> {isData?.patientId || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Date of Birth:</strong> {formatDate(isData?.dateOfBirth) || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Gender:</strong> {isData?.gender || 'N/A'}</div>
                    </div>
                </div>

                {/* Contact Information Section */}
                <div style={{ width: '100%', marginBottom: '20px', animation: 'fadeIn 0.6s ease 0.4s' }}>
                    <div style={{
                        backgroundColor: '#87CEEB',
                        padding: '20px',
                        borderRadius: '8px',
                        
                    }}>
                        <h2 style={{ fontSize: '1.8rem', color: '#3a4d6c', marginBottom: '10px' }}>Contact Information</h2>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Phone Number:</strong> {isData?.contactInfo_phoneNumber || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Email:</strong> {isData?.contactInfo_email || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Address:</strong> {isData?.contactInfo_address || 'N/A'}</div>
                    </div>
                </div>

                {/* Emergency Contact Section */}
                <div style={{ width: '100%', marginBottom: '20px', animation: 'fadeIn 0.6s ease 0.6s' }}>
                    <div style={{
                        backgroundColor: '#87CEEB',
                        padding: '20px',
                        borderRadius: '8px',
                        
                    }}>
                        <h2 style={{ fontSize: '1.8rem', color: '#3a4d6c', marginBottom: '10px' }}>Emergency Contact</h2>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Name:</strong> {isData?.emergencyContact_name || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Relationship:</strong> {isData?.emergencyContact_relationship || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Phone Number:</strong> {isData?.emergencyContact_phoneNumber || 'N/A'}</div>
                    </div>
                </div>

                {/* Medical History Section */}
                <div style={{ width: '100%', marginBottom: '20px', animation: 'fadeIn 0.6s ease 0.8s' }}>
                    <div style={{
                        backgroundColor: '#87CEEB',
                        padding: '20px',
                        borderRadius: '8px',
                        
                    }}>
                        <h2 style={{ fontSize: '1.8rem', color: '#3a4d6c', marginBottom: '10px' }}>Medical History</h2>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Allergies:</strong> {isData?.allergies || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Chronic Conditions:</strong> {isData?.chronicConditions || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Past Surgeries:</strong> {isData?.pastSurgeries || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Family Medical History:</strong> {isData?.familyMedicalHistory || 'N/A'}</div>
                    </div>
                </div>

                {/* Current Visit Details Section */}
                <div style={{ width: '100%', marginBottom: '20px', animation: 'fadeIn 0.6s ease 1s' }}>
                    <div style={{
                        backgroundColor: '#87CEEB',
                        padding: '20px',
                        borderRadius: '8px',
                        
                    }}>
                        <h2 style={{ fontSize: '1.8rem', color: '#3a4d6c', marginBottom: '10px' }}>Current Visit Details</h2>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Reason for Visit:</strong> {isData?.reasonForVisit || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Current Medications:</strong> {isData?.currentMedications || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Blood Pressure:</strong> {isData?.vitals_bloodPressure || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Heart Rate:</strong> {isData?.vitals_bheartRate || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Temperature:</strong> {isData?.vitals_btemperature || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Respiratory Rate:</strong> {isData?.vitals_brespiratoryRate || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Attending Physician:</strong> {isData?.attendingPhysician || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Department:</strong> {isData?.department || 'N/A'}</div>
                    </div>
                </div>

                {/* Treatment and Diagnostics Section */}
                <div style={{ width: '100%', marginBottom: '20px', animation: 'fadeIn 0.6s ease 1.2s' }}>
                    <div style={{
                        backgroundColor: '#87CEEB',
                        padding: '20px',
                        borderRadius: '8px',
                        
                    }}>
                        <h2 style={{ fontSize: '1.8rem', color: '#3a4d6c', marginBottom: '10px' }}>Treatment and Diagnostics</h2>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Lab Test Results:</strong> {isData?.labTestResults || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Imaging Results:</strong> {isData?.imagingResults || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Prescribed Medications:</strong> {isData?.prescribedMedications || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Ongoing Treatments:</strong> {isData?.ongoingTreatments || 'N/A'}</div>
                    </div>
                </div>

                {/* Appointment History Section */}
                <div style={{ width: '100%', marginBottom: '20px', animation: 'fadeIn 0.6s ease 1.4s' }}>
                    <div style={{
                        backgroundColor: '#87CEEB',
                        padding: '20px',
                        borderRadius: '8px',
                        
                    }}>
                        <h2 style={{ fontSize: '1.8rem', color: '#3a4d6c', marginBottom: '10px' }}>Appointment History</h2>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Past Visits Date:</strong> {formatDate(isData?.pastVisits_date) || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Department:</strong> {isData?.pastVisits_department || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Doctor:</strong> {isData?.pastVisits_doctor || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Upcoming Appointments Date:</strong> {formatDate(isData?.upcomingAppointments_date) || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Upcoming Department:</strong> {isData?.upcomingAppointments_department || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Upcoming Doctor:</strong> {isData?.upcomingAppointments_doctor || 'N/A'}</div>
                    </div>
                </div>

                {/* Billing and Insurance Information Section */}
                <div style={{ width: '100%', marginBottom: '20px', animation: 'fadeIn 0.6s ease 1.6s' }}>
                    <div style={{
                        backgroundColor: '#87CEEB',
                        padding: '20px',
                        borderRadius: '8px',
                        
                    }}>
                        <h2 style={{ fontSize: '1.8rem', color: '#3a4d6c', marginBottom: '10px' }}>Billing & Insurance</h2>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Charges:</strong> ${isData?.billingSummary_charges || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Payments:</strong> ${isData?.billingSummary_payments || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Outstanding Balance:</strong> ${isData?.billingSummary_outstandingBalance || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Insurance Provider:</strong> {isData?.insurance_provider || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Insurance Policy Number:</strong> {isData?.insurance_policyNumber || 'N/A'}</div>
                    </div>
                </div>

                {/* Discharge Summary Section */}
                <div style={{ width: '100%', marginBottom: '20px', animation: 'fadeIn 0.6s ease 1.8s' }}>
                    <div style={{
                        backgroundColor: '#87CEEB',
                        padding: '20px',
                        borderRadius: '8px',
                        
                    }}>
                        <h2 style={{ fontSize: '1.8rem', color: '#3a4d6c', marginBottom: '10px' }}>Discharge Summary</h2>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Diagnosis:</strong> {isData?.dischargeSummary_diagnosis || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Treatment Received:</strong> {isData?.dischargeSummary_treatmentReceived || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Follow-Up Care:</strong> {isData?.dischargeSummary_followUpCare || 'N/A'}</div>
                        <div style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#333' }}><strong>Post Discharge Medications:</strong> {isData?.postDischargeMedications || 'N/A'}</div>
                    </div>
                </div>

            </div>
        </div>
    );
};



