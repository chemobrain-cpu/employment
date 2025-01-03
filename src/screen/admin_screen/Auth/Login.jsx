import React, { useState, useCallback,useEffect } from 'react';
import styles from '../../Login.module.css';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import SubmitBtn from "../../../component/common/Submit";

// importing modals
import LoadingModal from "../../../component/Modal/LoadingModal";
import { login, test } from '../../../store/action/userAppStorage';
import Modal from '../../../component/Modal/Modal';

function LoginPage() {
    let [patientId, setpatientId] = useState("");
    let [patientIdError, setpatientIdError] = useState("")

    let [isError, setIsError] = useState(false);
    let [isErrorInfo, setIsErrorInfo] = useState('');
    let [isLoading, setIsLoading] = useState(true);
    // initialising redux
    let dispatch = useDispatch();
    // initialise router
    let navigate = useNavigate();
    // loaders state

    let isFormValid =  !patientIdError && patientId;

    let toLogin = () => {
        navigate('/register');
    };

    let setFormDetails = useCallback(e => {
        if (e.target.name === "patientId") {
            let formValue = e.target.value;
            setpatientId(formValue);
        }
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!isFormValid) {
            return;
        }
        setIsLoading(true);

        let response = await dispatch(login({
           patientId,
        }));

        if (!response.bool) {
            setIsLoading(false);
            setIsError(true);
            setIsErrorInfo(response.message);
            console.log(response)
           
        } else {
            setTimeout(() => {
                navigate(`${response.url}`);
            }, 3000);
        }
    };

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false)
        },7000)
        let callAsyncTest = async()=>{
         await dispatch(test())
        }
        callAsyncTest()
     },[])

    return (
        <>
        {isError&&<Modal content={isErrorInfo} closeModal={()=>setIsError(false)}/>}
            <div className={styles.screenContainer}>
                <div className={styles.rightContainer}>
                    {isLoading && <LoadingModal />}

                    <form className={styles.rightformcontainer} onSubmit={submitHandler}>
                        <div className={styles.inputcontainer}>
                            <h2>Enter patientID</h2>

                            <div className={styles.formCard}>
                                <div className={styles.inputWrapper}>
                                    
                                    <input
                                        id="text"
                                        name="patientId"
                                        className="formcard"
                                        placeholder="Enter ID here"
                                        value={patientId}
                                        onChange={setFormDetails}
                                    />
                                   
                                </div>

                             
                            </div>
                        </div>
                        <div className={styles.submit}>
                            <SubmitBtn style={{ opacity: isFormValid ? 1 : 0.5, borderRadius: '8px' }} text="Submit" />

                            {isError && <p className={styles.errorText}>{isErrorInfo}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginPage;

