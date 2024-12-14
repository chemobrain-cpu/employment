import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SubmitBtn from "../../../component/common/Submit";
import LoadingModal from "../../../component/Modal/LoadingModal";
import { signup } from '../../../store/action/userAppStorage';
import ReactS3 from 'react-s3';
import styles from '../../Login.module.css';

window.Buffer = window.Buffer || require("buffer").Buffer;
const imageMimeType = /image\/(png|jpg|jpeg)/i;


function SignupPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        patientId: '',
        dateOfBirth: '',
        gender: 'Male',
        contactInfo_phoneNumber: '',
        contactInfo_email: '',
        contactInfo_address: '',
        emergencyContact_name: '',
        emergencyContact_relationship: '',
        emergencyContact_phoneNumber: '',
        allergies: '',
        chronicConditions: '',
        pastSurgeries: '',
        familyMedicalHistory: '',
        reasonForVisit: '',
        currentMedications: '',
        vitals_bloodPressure: '',
        vitals_bheartRate: '',
        vitals_btemperature: '',
        vitals_brespiratoryRate: '',
        attendingPhysician: '',
        department: '',
        labTestResults: '',
        imagingResults: '',
        prescribedMedications: '',
        ongoingTreatments: '',
        pastVisits_date: '',
        pastVisits_department: '',
        pastVisits_doctor: '',
        upcomingAppointments_date: '',
        upcomingAppointments_department: '',
        upcomingAppointments_doctor: '',
        billingSummary_charges: '',
        billingSummary_payments: '',
        billingSummary_outstandingBalance: '',
        insurance_provider: '',
        insurance_policyNumber: '',
        dischargeSummary_diagnosis: '',
        dischargeSummary_treatmentReceived: '',
        dischargeSummary_followUpCare: '',
        postDischargeMedications: '',
        profilePhoto: ''
    });

    const [photo, setPhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isErrorInfo, setIsErrorInfo] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const changePhotoHandler = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setPhoto(file);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let imgUrl

        const config = {
            dirName: 'bucket/',
            bucketName: 'coinbasebuckets',
            region: 'us-east-1',
            accessKeyId: 'AKIAZZTWQ7HAPRYD3APX',
            secretAccessKey: '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'
        }

        let upload = async () => {
            if (!photo) {
                return
            }

            return ReactS3.uploadFile(photo, config).then(response => {

                if (response.result.status !== 204)
                    throw new Error("Failed to upload image to S3");
                else {

                    imgUrl = (response.location)
                }
            })
                .catch(error => {
                    console.log(error);
                })
        }

        await upload()

        const response = await dispatch(signup({
            ...formData,
            profilePhoto: imgUrl
        }));

        if (!response.bool) {
            setIsLoading(false);
            setIsError(true);
            setIsErrorInfo(response.message);
            setTimeout(() => {
                navigate(`${response.url}`);
            }, 3000);
        } else {
            setTimeout(() => {
                navigate(`${response.url}`);
            }, 3000);
        }
    };

    return (
        <div className={styles.screenContainer}>
            {isLoading && <LoadingModal />}
            <div className={styles.rightContainer}>
                <form className={styles.rightformcontainer} onSubmit={submitHandler}>
                    <h2>Create a new patient profile</h2>

                    {/* Patient Identification Information */}
                    <div className={styles.formCard}>
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter full name"

                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Patient ID</label>
                        <input
                            type="text"
                            name="patientId"
                            value={formData.patientId}
                            onChange={handleChange}
                            placeholder="Enter patient ID"

                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}

                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Gender</label>
                        <select
                            name="gender"
                            value={formData.gender || 'Male'}  // Set default value to "Male" if formData.gender is undefined
                            onChange={handleChange}

                        >
                            <option value="Male" selected>Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>


                    {/* Contact Information */}
                    <div className={styles.formCard}>
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="contactInfo_phoneNumber"
                            value={formData.contactInfo_phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter phone number"

                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="contactInfo_email"
                            value={formData.contactInfo_email}
                            onChange={handleChange}
                            placeholder="Enter email address"

                        required/>
                    </div>

                    <div className={styles.formCard}>
                        <label>Address</label>
                        <input
                            type="text"
                            name="contactInfo_address"
                            value={formData.contactInfo_address}
                            onChange={handleChange}
                            placeholder="Enter address"

                        />
                    </div>

                    {/* Emergency Contact */}
                    <h3>Emergency Contact</h3>
                    <div className={styles.formCard}>
                        <label>Contact Name</label>
                        <input
                            type="text"
                            name="emergencyContact_name"
                            value={formData.emergencyContact_name}
                            onChange={handleChange}
                            placeholder="Enter contact name"

                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Relationship</label>
                        <input
                            type="text"
                            name="emergencyContact_relationship"
                            value={formData.emergencyContact_relationship}
                            onChange={handleChange}
                            placeholder="Enter relationship"

                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="emergencyContact_phoneNumber"
                            value={formData.emergencyContact_phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter phone number"

                        />
                    </div>

                    {/* Medical History */}
                    <h3>Medical History</h3>
                    <div className={styles.formCard}>
                        <label>Allergies</label>
                        <input
                            type="text"
                            name="allergies"
                            value={formData.allergies}
                            onChange={handleChange}
                            placeholder="Enter allergies"
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Chronic Conditions</label>
                        <input
                            type="text"
                            name="chronicConditions"
                            value={formData.chronicConditions}
                            onChange={handleChange}
                            placeholder="Enter chronic conditions"
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Past Surgeries</label>
                        <input
                            type="text"
                            name="pastSurgeries"
                            value={formData.pastSurgeries}
                            onChange={handleChange}
                            placeholder="Enter past surgeries"
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Family Medical History</label>
                        <input
                            type="text"
                            name="familyMedicalHistory"
                            value={formData.familyMedicalHistory}
                            onChange={handleChange}
                            placeholder="Enter family medical history"
                        />
                    </div>

                    {/* Current Visit Details */}
                    <h3>Current Visit Details</h3>
                    <div className={styles.formCard}>
                        <label>Reason for Visit</label>
                        <input
                            type="text"
                            name="reasonForVisit"
                            value={formData.reasonForVisit}
                            onChange={handleChange}
                            placeholder="Enter reason for visit"

                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Current Medications</label>
                        <input
                            type="text"
                            name="currentMedications"
                            value={formData.currentMedications}
                            onChange={handleChange}
                            placeholder="Enter current medications"
                        />
                    </div>

                    {/* Vitals */}
                    <h3>Vitals</h3>
                    <div className={styles.formCard}>
                        <label>Blood Pressure</label>
                        <input
                            type="text"
                            name="vitals_bloodPressure"
                            value={formData.vitals_bloodPressure}
                            onChange={handleChange}
                            placeholder="Enter blood pressure"
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Heart Rate</label>
                        <input
                            type="number"
                            name="vitals_bheartRate"
                            value={formData.vitals_bheartRate}
                            onChange={handleChange}
                            placeholder="Enter heart rate"
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Temperature</label>
                        <input
                            type="number"
                            name="vitals_btemperature"
                            value={formData.vitals_btemperature}
                            onChange={handleChange}
                            placeholder="Enter temperature"
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Respiratory Rate</label>
                        <input
                            type="number"
                            name="vitals_brespiratoryRate"
                            value={formData.vitals_brespiratoryRate}
                            onChange={handleChange}
                            placeholder="Enter respiratory rate"
                        />
                    </div>

                    {/* Physician and Department */}
                    <div className={styles.formCard}>
                        <label>Attending Physician</label>
                        <input
                            type="text"
                            name="attendingPhysician"
                            value={formData.attendingPhysician}
                            onChange={handleChange}
                            placeholder="Enter attending physician"
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Department</label>
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            placeholder="Enter department"
                        />
                    </div>

                    {/* Lab Test and Imaging Results */}
                    <div className={styles.formCard}>
                        <label>Lab Test Results</label>
                        <input
                            type="text"
                            name="labTestResults"
                            value={formData.labTestResults}
                            onChange={handleChange}
                            placeholder="Enter lab test results"
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Imaging Results</label>
                        <input
                            type="text"
                            name="imagingResults"
                            value={formData.imagingResults}
                            onChange={handleChange}
                            placeholder="Enter imaging results"
                        />
                    </div>

                    {/* Prescribed Medications */}
                    <div className={styles.formCard}>
                        <label>Prescribed Medications</label>
                        <input
                            type="text"
                            name="prescribedMedications"
                            value={formData.prescribedMedications}
                            onChange={handleChange}
                            placeholder="Enter prescribed medications"
                        />
                    </div>

                    {/* Ongoing Treatments */}
                    <div className={styles.formCard}>
                        <label>Ongoing Treatments</label>
                        <input
                            type="text"
                            name="ongoingTreatments"
                            value={formData.ongoingTreatments}
                            onChange={handleChange}
                            placeholder="Enter ongoing treatments"
                        />
                    </div>

                    {/* Appointment History */}
                    <h3>Appointment History</h3>
                    <div className={styles.formCard}>
                        <label>Past Visits Date</label>
                        <input
                            type="date"
                            name="pastVisits_date"
                            value={formData.pastVisits_date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Past Visits Department</label>
                        <input
                            type="text"
                            name="pastVisits_department"
                            value={formData.pastVisits_department}
                            onChange={handleChange}
                            placeholder="Enter past visit department"
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Past Visits Doctor</label>
                        <input
                            type="text"
                            name="pastVisits_doctor"
                            value={formData.pastVisits_doctor}
                            onChange={handleChange}
                            placeholder="Enter past visit doctor"
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Upcoming Appointments Date</label>
                        <input
                            type="date"
                            name="upcomingAppointments_date"
                            value={formData.upcomingAppointments_date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Upcoming Appointments Department</label>
                        <input
                            type="text"
                            name="upcomingAppointments_department"
                            value={formData.upcomingAppointments_department}
                            onChange={handleChange}
                            placeholder="Enter upcoming appointments department"
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Upcoming Appointments Doctor</label>
                        <input
                            type="text"
                            name="upcomingAppointments_doctor"
                            value={formData.upcomingAppointments_doctor}
                            onChange={handleChange}
                            placeholder="Enter upcoming appointments doctor"
                        />
                    </div>

                    {/* Billing and Insurance Information */}
                    {/* Billing and Insurance Information */}
                    <h3>Billing and Insurance Information</h3>
                    <div className={styles.formCard}>
                        <label>Billing Charges</label>
                        <textarea
                            name="billingSummary_charges"
                            value={formData.billingSummary_charges}
                            onChange={handleChange}
                            placeholder="Enter billing charges"
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Billing Payments</label>
                        <textarea
                            name="billingSummary_payments"
                            value={formData.billingSummary_payments}
                            onChange={handleChange}
                            placeholder="Enter billing payments"
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Outstanding Balance</label>
                        <textarea
                            name="billingSummary_outstandingBalance"
                            value={formData.billingSummary_outstandingBalance}
                            onChange={handleChange}
                            placeholder="Enter outstanding balance"
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Insurance Provider</label>
                        <textarea
                            name="insurance_provider"
                            value={formData.insurance_provider}
                            onChange={handleChange}
                            placeholder="Enter insurance provider"
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Insurance Policy Number</label>
                        <textarea
                            name="insurance_policyNumber"
                            value={formData.insurance_policyNumber}
                            onChange={handleChange}
                            placeholder="Enter insurance policy number"
                        />
                    </div>

                    {/* Discharge Summary */}
                    <h3>Discharge Summary</h3>
                    <div className={styles.formCard}>
                        <label>Diagnosis</label>
                        <input
                            type="text"
                            name="dischargeSummary_diagnosis"
                            value={formData.dischargeSummary_diagnosis}
                            onChange={handleChange}
                            placeholder="Enter diagnosis"
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Treatment Received</label>
                        <input
                            type="text"
                            name="dischargeSummary_treatmentReceived"
                            value={formData.dischargeSummary_treatmentReceived}
                            onChange={handleChange}
                            placeholder="Enter treatment received"
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Follow-up Care</label>
                        <input
                            type="text"
                            name="dischargeSummary_followUpCare"
                            value={formData.dischargeSummary_followUpCare}
                            onChange={handleChange}
                            placeholder="Enter follow-up care"
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label>Post Discharge Medications</label>
                        <input
                            type="text"
                            name="postDischargeMedications"
                            value={formData.postDischargeMedications}
                            onChange={handleChange}
                            placeholder="Enter post discharge medications"
                        />
                    </div>

                    {/* Profile Photo */}
                    <div className={styles.formCard}>
                        <label>Upload Profile Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={changePhotoHandler}
                        />
                    </div>

                    {/* Submit Button */}
                    <SubmitBtn text="Create Profile" />
                </form>
            </div>
        </div>
    );
}

export default SignupPage;