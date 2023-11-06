import React, { useState, useCallback } from 'react';
import styles from '../../Login.module.css';
import FormInput from '../../../component/common/input';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import SubmitBtn from "../../../component/common/Submit";


//importing modals
import LoadingModal from "../../../component/Modal/LoadingModal";
import { login } from '../../../store/action/userAppStorage';




function LoginPage() {
    let [adminEmail, setAdminEmail] = useState("")
    let [adminEmailError, setAdminEmailError] = useState("")
    let [adminPassword, setAdminPassword] = useState("")
    let [adminPasswordError, setAdminPasswordError] = useState("")

    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')
    let [isLoading, setIsLoading] = useState(false)
    //initialising reduzx
    let dispatch = useDispatch()
    //initialise router
    let navigate = useNavigate()
    //loaders state

    let isFormValid =  adminPassword && !adminPasswordError && !adminEmailError && adminEmail

    let toLogin = ()=>{
        navigate('/register')
    }

    let setFormDetails = useCallback(e => {
        if (e.formName === "Email") {
            let formValue = e.value
            setAdminEmail(formValue)
            setAdminEmailError(e.error)
        } else if (e.formName === "Password") {
            let formValue = e.value
            setAdminPassword(formValue)
            setAdminPasswordError(e.error)
        }
    }, [])


    const submitHandler = async (e) => {
        e.preventDefault()
        if (!isFormValid) {
            return
        }
        setIsLoading(true)

        let response = await dispatch(login({
            email: adminEmail,
            password: adminPassword
        }))

        if (!response.bool) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(response.message)
            setTimeout(() => {
                navigate(`${response.url}`)
            }, 3000)


        }else{
            setTimeout(() => {
                navigate(`${response.url}`)
            }, 3000)

        }
    }

    return (<>

        <div className={styles.screenContainer}>
          
            <div className={styles.rightContainer}>
                {isLoading && <LoadingModal />}

                <form className={styles.rightformcontainer} onSubmit={submitHandler}>
                    


                    <div className={styles.inputcontainer}>
                        <h2>Login</h2>

                        <div className={styles.formCard}>
                            <FormInput
                                icon='edit'
                                label='Email'
                                type='email'
                                types="email"
                                className="formcard"
                                formName="Email"
                                placeholder='Enter your email address'
                                setFormDetails={setFormDetails}
                            />

                        </div>


                        <div className={styles.formCard}>
                            <FormInput
                                icon='edit'
                                label='Password'
                                type='number'
                                types='password'
                                className="formcard"
                                setFormDetails={setFormDetails}
                                formName="Password"
                                placeholder='Enter your password'
                            />

                        </div>

                    </div>







                    <div className={styles.submit}>
                        <SubmitBtn style={{ opacity: isFormValid ? 1 : 0.5, borderRadius: '8px' }} text="Create your account" />

                        {isError && <p className={styles.errorText} >{isErrorInfo}</p>}
                    </div>
                  


                    <p className={styles.alternative}>Don't have an account? <span onClick={toLogin}>Register</span></p>

                </form>

            </div>


        </div>
    </>

    );
}

export default LoginPage