import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
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
        <div className={styles.homeScreen}>
            <div className={styles.innercontainer}>

                {/* Profile Image */}
                <div className={styles.img}>
                    <img src={isData.profilePhoto || 'https://via.placeholder.com/150'} alt="Profile" />
                </div>

                {/* Patient Information */}
                <div className={styles.outercard}>
                    <h3>Full Name</h3>
                    <div className={styles.card}>
                        <p>{isData?.fullName || 'N/A'}</p>
                    </div>
                </div>

                <div className={styles.outercard}>
                    <h3>Patient ID</h3>
                    <div className={styles.card}>
                        <p>{isData?.patientId || 'N/A'}</p>
                    </div>
                </div>

                <div className={styles.outercard}>
                    <h3>Date of Birth</h3>
                    <div className={styles.card}>
                        <p>{formatDate(isData?.dateOfBirth) || 'N/A'}</p>
                    </div>
                </div>

                <div className={styles.outercard}>
                    <h3>Gender</h3>
                    <div className={styles.card}>
                        <p>{isData?.gender || 'N/A'}</p>
                    </div>
                </div>

                {/* Contact Information */}
                <div className={styles.outercard}>
                    <h3>Phone Number</h3>
                    <div className={styles.card}>
                        <p>{isData?.contactInfo_phoneNumber || 'N/A'}</p>
                    </div>
                </div>

                <div className={styles.outercard}>
                    <h3>Email</h3>
                    <div className={styles.card}>
                        <p>{isData?.contactInfo_email || 'N/A'}</p>
                    </div>
                </div>

                <div className={styles.outercard}>
                    <h3>Address</h3>
                    <div className={styles.card}>
                        <p>{isData?.contactInfo_address || 'N/A'}</p>
                    </div>
                </div>

                {/* Emergency Contact */}
                <div className={styles.outercard}>
                    <h3>Emergency Contact</h3>
                    <div className={styles.card}>
                        <p><strong>Name:</strong> {isData?.emergencyContact_name || 'N/A'}</p>
                        <p><strong>Relationship:</strong> {isData?.emergencyContact_relationship || 'N/A'}</p>
                        <p><strong>Phone Number:</strong> {isData?.emergencyContact_phoneNumber || 'N/A'}</p>
                    </div>
                </div>

                {/* Medical History */}
                <div className={styles.outercard}>
                    <h3>Allergies</h3>
                    <div className={styles.card}>
                        <p>{isData?.allergies || 'N/A'}</p>
                    </div>
                </div>

                <div className={styles.outercard}>
                    <h3>Chronic Conditions</h3>
                    <div className={styles.card}>
                        <p>{isData?.chronicConditions || 'N/A'}</p>
                    </div>
                </div>

                <div className={styles.outercard}>
                    <h3>Past Surgeries</h3>
                    <div className={styles.card}>
                        <p>{isData?.pastSurgeries || 'N/A'}</p>
                    </div>
                </div>

                <div className={styles.outercard}>
                    <h3>Family Medical History</h3>
                    <div className={styles.card}>
                        <p>{isData?.familyMedicalHistory || 'N/A'}</p>
                    </div>
                </div>

                {/* Current Visit Details */}
                <div className={styles.outercard}>
                    <h3>Reason for Visit</h3>
                    <div className={styles.card}>
                        <p>{isData?.reasonForVisit || 'N/A'}</p>
                    </div>
                </div>

                <div className={styles.outercard}>
                    <h3>Current Medications</h3>
                    <div className={styles.card}>
                        <p>{isData?.currentMedications || 'N/A'}</p>
                    </div>
                </div>

                <div className={styles.outercard}>
                    <h3>Vitals</h3>
                    <div className={styles.card}>
                        <p><strong>Blood Pressure:</strong> {isData?.vitals_bloodPressure || 'N/A'}</p>
                        <p><strong>Heart Rate:</strong> {isData?.vitals_bheartRate || 'N/A'}</p>
                        <p><strong>Temperature:</strong> {isData?.vitals_btemperature || 'N/A'}</p>
                        <p><strong>Respiratory Rate:</strong> {isData?.vitals_brespiratoryRate || 'N/A'}</p>
                    </div>
                </div>

                <div className={styles.outercard}>
                    <h3>Attending Physician</h3>
                    <div className={styles.card}>
                        <p>{isData?.attendingPhysician || 'N/A'}</p>
                    </div>
                </div>

                <div className={styles.outercard}>
                    <h3>Department</h3>
                    <div className={styles.card}>
                        <p>{isData?.department || 'N/A'}</p>
                    </div>
                </div>

                {/* Treatment and Diagnostics */}
                <div className={styles.outercard}>
                    <h3>Lab Test Results</h3>
                    <div className={styles.card}>
                        <p>{isData?.labTestResults || 'N/A'}</p>
                    </div>
                </div>

                <div className={styles.outercard}>
                    <h3>Imaging Results</h3>
                    <div className={styles.card}>
                        <p>{isData?.imagingResults || 'N/A'}</p>
                    </div>
                </div>

                <div className={styles.outercard}>
                    <h3>Prescribed Medications</h3>
                    <div className={styles.card}>
                        <p>{isData?.prescribedMedications || 'N/A'}</p>
                    </div>
                </div>

                <div className={styles.outercard}>
                    <h3>Ongoing Treatments</h3>
                    <div className={styles.card}>
                        <p>{isData?.ongoingTreatments || 'N/A'}</p>
                    </div>
                </div>

                {/* Appointment History */}
                <div className={styles.outercard}>
                    <h3>Past Visits</h3>
                    <div className={styles.card}>
                        <p><strong>Date:</strong> {formatDate(isData?.pastVisits_date) || 'N/A'}</p>
                        <p><strong>Department:</strong> {isData?.pastVisits_department || 'N/A'}</p>
                        <p><strong>Doctor:</strong> {isData?.pastVisits_doctor || 'N/A'}</p>
                    </div>
                </div>

                <div className={styles.outercard}>
                    <h3>Upcoming Appointments</h3>
                    <div className={styles.card}>
                        <p><strong>Date:</strong> {formatDate(isData?.upcomingAppointments_date) || 'N/A'}</p>
                        <p><strong>Department:</strong> {isData?.upcomingAppointments_department || 'N/A'}</p>
                        <p><strong>Doctor:</strong> {isData?.upcomingAppointments_doctor || 'N/A'}</p>
                    </div>
                </div>

                {/* Billing and Insurance Information */}
                <div className={styles.outercard}>
                    <h3>Billing Summary</h3>
                    <div className={styles.card}>
                        <p><strong>Charges:</strong> {isData?.billingSummary_charges || 'N/A'}</p>
                        <p><strong>Payments:</strong> {isData?.billingSummary_payments || 'N/A'}</p>
                        <p><strong>Outstanding Balance:</strong> {isData?.billingSummary_outstandingBalance || 'N/A'}</p>
                    </div>
                </div>

                <div className={styles.outercard}>
                    <h3>Insurance</h3>
                    <div className={styles.card}>
                        <p><strong>Provider:</strong> {isData?.insurance_provider || 'N/A'}</p>
                        <p><strong>Policy Number:</strong> {isData?.insurance_policyNumber || 'N/A'}</p>
                    </div>
                </div>

                {/* Discharge Summary */}
                <div className={styles.outercard}>
                    <h3>Discharge Summary</h3>
                    <div className={styles.card}>
                        <p><strong>Diagnosis:</strong> {isData?.dischargeSummary_diagnosis || 'N/A'}</p>
                        <p><strong>Treatment Received:</strong> {isData?.dischargeSummary_treatmentReceived || 'N/A'}</p>
                        <p><strong>Follow-Up Care:</strong> {isData?.dischargeSummary_followUpCare || 'N/A'}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

