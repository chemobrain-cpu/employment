import React, { useState, useEffect } from 'react';
import styles from '../../Login.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import SubmitBtn from "../../../component/common/Submit";
// importing modals
import LoadingModal from "../../../component/Modal/LoadingModal";
import { updateUser } from '../../../store/action/userAppStorage';
import ReactS3 from 'react-s3';

window.Buffer = window.Buffer || require("buffer").Buffer;
const imageMimeType = /image\/(png|jpg|jpeg)/i;

function EditPage() {
    let { color, user } = useSelector(state => state.userAuth);

    // State for each form field (based on your patient schema)
    const [fullName, setFullName] = useState(user.fullName || "");
    const [patientId, setPatientId] = useState(user.patientId || "");
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth || "");
    const [gender, setGender] = useState(user.gender || "");
    const [contactInfo_phoneNumber, setPhoneNumber] = useState(user.contactInfo_phoneNumber || "");
    const [contactInfo_email, setEmail] = useState(user.contactInfo_email || "");
    const [contactInfo_address, setAddress] = useState(user.contactInfo_address || "");
    const [emergencyContact_name, setEmergencyContactName] = useState(user.emergencyContact_name || "");
    const [emergencyContact_relationship, setEmergencyContactRelationship] = useState(user.emergencyContact_relationship || "");
    const [emergencyContact_phoneNumber, setEmergencyContactPhoneNumber] = useState(user.emergencyContact_phoneNumber || "");

    const [allergies, setAllergies] = useState(user.allergies || "");
    const [chronicConditions, setChronicConditions] = useState(user.chronicConditions || "");
    const [pastSurgeries, setPastSurgeries] = useState(user.pastSurgeries || "");
    const [familyMedicalHistory, setFamilyMedicalHistory] = useState(user.familyMedicalHistory || "");

    const [reasonForVisit, setReasonForVisit] = useState(user.reasonForVisit || "");
    const [currentMedications, setCurrentMedications] = useState(user.currentMedications || "");
    const [vitals_bloodPressure, setBloodPressure] = useState(user.vitals_bloodPressure || "");
    const [vitals_bheartRate, setHeartRate] = useState(user.vitals_bheartRate || "");
    const [vitals_btemperature, setTemperature] = useState(user.vitals_btemperature || "");
    const [vitals_brespiratoryRate, setRespiratoryRate] = useState(user.vitals_brespiratoryRate || "");
    const [attendingPhysician, setAttendingPhysician] = useState(user.attendingPhysician || "");
    const [department, setDepartment] = useState(user.department || "");

    const [labTestResults, setLabTestResults] = useState(user.labTestResults || "");
    const [imagingResults, setImagingResults] = useState(user.imagingResults || "");
    const [prescribedMedications, setPrescribedMedications] = useState(user.prescribedMedications || "");
    const [ongoingTreatments, setOngoingTreatments] = useState(user.ongoingTreatments || "");

    const [pastVisits_date, setPastVisitsDate] = useState(user.pastVisits_date || "");
    const [pastVisits_department, setPastVisitsDepartment] = useState(user.pastVisits_department || "");
    const [pastVisits_doctor, setPastVisitsDoctor] = useState(user.pastVisits_doctor || "");

    const [upcomingAppointments_date, setUpcomingAppointmentsDate] = useState(user.upcomingAppointments_date || "");
    const [upcomingAppointments_department, setUpcomingAppointmentsDepartment] = useState(user.upcomingAppointments_department || "");
    const [upcomingAppointments_doctor, setUpcomingAppointmentsDoctor] = useState(user.upcomingAppointments_doctor || "");

    const [billingSummary_charges, setBillingSummaryCharges] = useState(user.billingSummary_charges || "");
    const [billingSummary_payments, setBillingSummaryPayments] = useState(user.billingSummary_payments || "");
    const [billingSummary_outstandingBalance, setBillingSummaryOutstandingBalance] = useState(user.billingSummary_outstandingBalance || "");

    const [insurance_provider, setInsuranceProvider] = useState(user.insurance_provider || "");
    const [insurance_policyNumber, setInsurancePolicyNumber] = useState(user.insurance_policyNumber || "");

    const [dischargeSummary_diagnosis, setDischargeSummaryDiagnosis] = useState(user.dischargeSummary_diagnosis || "");
    const [dischargeSummary_treatmentReceived, setDischargeSummaryTreatmentReceived] = useState(user.dischargeSummary_treatmentReceived || "");
    const [dischargeSummary_followUpCare, setDischargeSummaryFollowUpCare] = useState(user.dischargeSummary_followUpCare || "");
    const [postDischargeMedications, setPostDischargeMedications] = useState(user.postDischargeMedications || "");

    const [photo, setPhoto] = useState(false);
    const [photoDataURL, setPhotoDataURL] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isErrorInfo, setIsErrorInfo] = useState('');

    // Initialize redux and router
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // S3 upload configuration
    const config = {
        dirName: 'bucket/',
        bucketName: 'coinbasebuckets',
        region: 'us-east-1',
        accessKeyId: 'AKIAZZTWQ7HAPRYD3APX',
        secretAccessKey: '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',
    };

const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let imgUrl = user.imgurl;

        const upload = async () => {
            if (!photo) return;

            return ReactS3.uploadFile(photo, config).then(response => {
                if (response.result.status !== 204) {
                    throw new Error("Failed to upload image to S3");
                } else {
                    imgUrl = response.location;
                }
            }).catch(error => {
                console.log(error);
            });
        };

        await upload();

        if(imgUrl){
            const response = await dispatch(updateUser({
                fullName,
                patientId,
                dateOfBirth,
                gender,
                contactInfo_phoneNumber,
                contactInfo_email,
                contactInfo_address,
                emergencyContact_name,
                emergencyContact_relationship,
                emergencyContact_phoneNumber,
                allergies,
                chronicConditions,
                pastSurgeries,
                familyMedicalHistory,
                reasonForVisit,
                currentMedications,
                vitals_bloodPressure,
                vitals_bheartRate,
                vitals_btemperature,
                vitals_brespiratoryRate,
                attendingPhysician,
                department,
                labTestResults,
                imagingResults,
                prescribedMedications,
                ongoingTreatments,
                pastVisits_date,
                pastVisits_department,
                pastVisits_doctor,
                upcomingAppointments_date,
                upcomingAppointments_department,
                upcomingAppointments_doctor,
                billingSummary_charges,
                billingSummary_payments,
                billingSummary_outstandingBalance,
                insurance_provider,
                insurance_policyNumber,
                dischargeSummary_diagnosis,
                dischargeSummary_treatmentReceived,
                dischargeSummary_followUpCare,
                postDischargeMedications,
                profilePhoto: imgUrl?imgUrl:'',
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

        }else{

            const response = await dispatch(updateUser({
                fullName,
                patientId,
                dateOfBirth,
                gender,
                contactInfo_phoneNumber,
                contactInfo_email,
                contactInfo_address,
                emergencyContact_name,
                emergencyContact_relationship,
                emergencyContact_phoneNumber,
                allergies,
                chronicConditions,
                pastSurgeries,
                familyMedicalHistory,
                reasonForVisit,
                currentMedications,
                vitals_bloodPressure,
                vitals_bheartRate,
                vitals_btemperature,
                vitals_brespiratoryRate,
                attendingPhysician,
                department,
                labTestResults,
                imagingResults,
                prescribedMedications,
                ongoingTreatments,
                pastVisits_date,
                pastVisits_department,
                pastVisits_doctor,
                upcomingAppointments_date,
                upcomingAppointments_department,
                upcomingAppointments_doctor,
                billingSummary_charges,
                billingSummary_payments,
                billingSummary_outstandingBalance,
                insurance_provider,
                insurance_policyNumber,
                dischargeSummary_diagnosis,
                dischargeSummary_treatmentReceived,
                dischargeSummary_followUpCare,
                postDischargeMedications,
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

        }

       
    };

    const changePhotoHandler = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setPhoto(file);
    };

    useEffect(() => {
        let fileReader, isCancel = false;

        if (photo) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setPhotoDataURL(result);
                }
            };
            fileReader.readAsDataURL(photo);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        };
    }, [photo]);

    return (
        <div className={styles.screenContainer}>
            {isLoading && <LoadingModal />}

            <div className={styles.rightContainer}>
                <form className={styles.rightformcontainer} onSubmit={submitHandler}>
                    <div className={styles.inputcontainer}>
                        <h2>Edit Patient Information</h2>

                        
                    {/* Profile Photo */}
                    <div className={styles.formCard}>
                        <label>Upload Profile Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={changePhotoHandler}
                        />
                    </div>

                        {/* Section 1: Patient Identification Information */}
                        <div className={styles.formCard}>
                            <label>Full Name</label>
                            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full name" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Patient ID</label>
                            <input type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)} placeholder="Enter patient ID" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Date of Birth</label>
                            <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                        </div>

                        <div className={styles.formCard}>
                            <label>Gender</label>
                            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className={styles.formCard}>
                            <label>Phone Number</label>
                            <input type="text" value={contactInfo_phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter phone number" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Email</label>
                            <input type="email" value={contactInfo_email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Address</label>
                            <input type="text" value={contactInfo_address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Emergency Contact Name</label>
                            <input type="text" value={emergencyContact_name} onChange={(e) => setEmergencyContactName(e.target.value)} placeholder="Enter emergency contact name" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Emergency Contact Relationship</label>
                            <input type="text" value={emergencyContact_relationship} onChange={(e) => setEmergencyContactRelationship(e.target.value)} placeholder="Enter emergency contact relationship" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Emergency Contact Phone</label>
                            <input type="text" value={emergencyContact_phoneNumber} onChange={(e) => setEmergencyContactPhoneNumber(e.target.value)} placeholder="Enter emergency contact phone" />
                        </div>

                        {/* Section 2: Medical History */}
                        <div className={styles.formCard}>
                            <label>Allergies</label>
                            <input type="text" value={allergies} onChange={(e) => setAllergies(e.target.value)} placeholder="Enter allergies" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Chronic Conditions</label>
                            <input type="text" value={chronicConditions} onChange={(e) => setChronicConditions(e.target.value)} placeholder="Enter chronic conditions" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Past Surgeries</label>
                            <input type="text" value={pastSurgeries} onChange={(e) => setPastSurgeries(e.target.value)} placeholder="Enter past surgeries" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Family Medical History</label>
                            <input type="text" value={familyMedicalHistory} onChange={(e) => setFamilyMedicalHistory(e.target.value)} placeholder="Enter family medical history" />
                        </div>

                        {/* Section 3: Current Visit Details */}
                        <div className={styles.formCard}>
                            <label>Reason for Visit</label>
                            <input type="text" value={reasonForVisit} onChange={(e) => setReasonForVisit(e.target.value)} placeholder="Enter reason for visit" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Current Medications</label>
                            <input type="text" value={currentMedications} onChange={(e) => setCurrentMedications(e.target.value)} placeholder="Enter current medications" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Blood Pressure</label>
                            <input type="text" value={vitals_bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} placeholder="Enter blood pressure" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Heart Rate</label>
                            <input type="number" value={vitals_bheartRate} onChange={(e) => setHeartRate(e.target.value)} placeholder="Enter heart rate" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Temperature</label>
                            <input type="number" value={vitals_btemperature} onChange={(e) => setTemperature(e.target.value)} placeholder="Enter temperature" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Respiratory Rate</label>
                            <input type="number" value={vitals_brespiratoryRate} onChange={(e) => setRespiratoryRate(e.target.value)} placeholder="Enter respiratory rate" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Attending Physician</label>
                            <input type="text" value={attendingPhysician} onChange={(e) => setAttendingPhysician(e.target.value)} placeholder="Enter attending physician" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Department</label>
                            <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Enter department" />
                        </div>

                        {/* Section 4: Treatment and Diagnostics */}
                        <div className={styles.formCard}>
                            <label>Lab Test Results</label>
                            <input type="text" value={labTestResults} onChange={(e) => setLabTestResults(e.target.value)} placeholder="Enter lab test results" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Imaging Results</label>
                            <input type="text" value={imagingResults} onChange={(e) => setImagingResults(e.target.value)} placeholder="Enter imaging results" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Prescribed Medications</label>
                            <input type="text" value={prescribedMedications} onChange={(e) => setPrescribedMedications(e.target.value)} placeholder="Enter prescribed medications" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Ongoing Treatments</label>
                            <input type="text" value={ongoingTreatments} onChange={(e) => setOngoingTreatments(e.target.value)} placeholder="Enter ongoing treatments" />
                        </div>

                        {/* Section 5: Appointment History */}
                        <div className={styles.formCard}>
                            <label>Past Visits Date</label>
                            <input type="date" value={pastVisits_date} onChange={(e) => setPastVisitsDate(e.target.value)} />
                        </div>

                        <div className={styles.formCard}>
                            <label>Past Visits Department</label>
                            <input type="text" value={pastVisits_department} onChange={(e) => setPastVisitsDepartment(e.target.value)} placeholder="Enter past visit department" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Past Visits Doctor</label>
                            <input type="text" value={pastVisits_doctor} onChange={(e) => setPastVisitsDoctor(e.target.value)} placeholder="Enter past visit doctor" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Upcoming Appointments Date</label>
                            <input type="date" value={upcomingAppointments_date} onChange={(e) => setUpcomingAppointmentsDate(e.target.value)} />
                        </div>

                        <div className={styles.formCard}>
                            <label>Upcoming Appointments Department</label>
                            <input type="text" value={upcomingAppointments_department} onChange={(e) => setUpcomingAppointmentsDepartment(e.target.value)} placeholder="Enter upcoming appointment department" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Upcoming Appointments Doctor</label>
                            <input type="text" value={upcomingAppointments_doctor} onChange={(e) => setUpcomingAppointmentsDoctor(e.target.value)} placeholder="Enter upcoming appointment doctor" />
                        </div>

                        {/* Section 6: Billing and Insurance Information */}
                        <div className={styles.formCard}>
                            <label>Billing Charges</label>
                            <input type="number" value={billingSummary_charges} onChange={(e) => setBillingSummaryCharges(e.target.value)} placeholder="Enter billing charges" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Billing Payments</label>
                            <input type="number" value={billingSummary_payments} onChange={(e) => setBillingSummaryPayments(e.target.value)} placeholder="Enter billing payments" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Outstanding Balance</label>
                            <input type="number" value={billingSummary_outstandingBalance} onChange={(e) => setBillingSummaryOutstandingBalance(e.target.value)} placeholder="Enter outstanding balance" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Insurance Provider</label>
                            <input type="text" value={insurance_provider} onChange={(e) => setInsuranceProvider(e.target.value)} placeholder="Enter insurance provider" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Insurance Policy Number</label>
                            <input type="text" value={insurance_policyNumber} onChange={(e) => setInsurancePolicyNumber(e.target.value)} placeholder="Enter insurance policy number" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Diagnosis</label>
                            <input type="text" value={dischargeSummary_diagnosis} onChange={(e) => setDischargeSummaryDiagnosis(e.target.value)} placeholder="Enter diagnosis" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Treatment Received</label>
                            <input type="text" value={dischargeSummary_treatmentReceived} onChange={(e) => setDischargeSummaryTreatmentReceived(e.target.value)} placeholder="Enter treatment received" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Follow-up Care</label>
                            <input type="text" value={dischargeSummary_followUpCare} onChange={(e) => setDischargeSummaryFollowUpCare(e.target.value)} placeholder="Enter follow-up care" />
                        </div>

                        <div className={styles.formCard}>
                            <label>Post-Discharge Medications</label>
                            <input type="text" value={postDischargeMedications} onChange={(e) => setPostDischargeMedications(e.target.value)} placeholder="Enter post-discharge medications" />
                        </div>



                        {/* Submit Button */}
                        <SubmitBtn text="Update Patient Info" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPage;

