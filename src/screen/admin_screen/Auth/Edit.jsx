import React, { useState, useEffect, useCallback } from 'react';
import styles from '../../Login.module.css';
import FormInput from '../../../component/common/input';
import SelectInput from "../../../component/common/select";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import SubmitBtn from "../../../component/common/Submit";
//importing modals
import LoadingModal from "../../../component/Modal/LoadingModal";
import { updateUser } from '../../../store/action/userAppStorage';
import ReactS3 from 'react-s3';

window.Buffer = window.Buffer || require("buffer").Buffer;
const imageMimeType = /image\/(png|jpg|jpeg)/i;







function EditPage() {
    let { color,user } = useSelector(state => state.userAuth)

    let [fullname, setfullname] = useState("")
    let [fullnameerror, setfullnameerror] = useState("")





    let [address, setaddress] = useState("")
    let [addresserror, setaddresserror] = useState("")




    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')
    let [isLoading, setIsLoading] = useState(false)
    let [photo, setPhoto] = useState(false)
    let [isChangePhoto, setIsChangePhoto] = useState(false)
    const [photoDataURL, setPhotoDataURL] = useState(null);

    //initialising reduzx
    let dispatch = useDispatch()
    
    //initialise router
    let navigate = useNavigate()
    //loaders state

   

    let toLogin = () => {
        navigate('/login')
    }

    let setFormDetails = useCallback(e => {
        if (e.formName === "fullname") {
            let formValue = e.value
            setfullname(formValue)
            setfullnameerror(e.error)
        }  else if (e.formName === "address") {
            let formValue = e.value
            setaddress(formValue)

            setaddresserror(e.error)
        }

    }, [])

    


    const submitHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        let imgUrl = user.imgurl

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

        let response = await dispatch(updateUser({
            fullname,
            address,
            imgurl:imgUrl,

        }))

        if (!response.bool) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(response.message)
            setTimeout(() => {
                navigate(`${response.url}`)
            }, 3000)


        } else {
            setTimeout(() => {
                navigate(`${response.url}`)
            }, 3000)

        }
    }

    const changePhotoHandler = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setIsChangePhoto(true)
        setPhoto(file);
    }




    useEffect(() => {
        let fileReader, isCancel = false;

        if (photo) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {

                const { result } = e.target;

                if (result && !isCancel) {
                    console.log(result)
                    setPhotoDataURL(result)
                }
            }
            fileReader.readAsDataURL(photo);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [photo]);



    /*

    */



    return (<>

        <div className={styles.screenContainer}>
        {isLoading && <LoadingModal />}

            <div className={styles.rightContainer}>
                

                <form className={styles.rightformcontainer} onSubmit={submitHandler}>



                    <div className={styles.inputcontainer}>
                        <h2>Edit Information</h2>



                        <div className={styles.formCard}>
                            <FormInput
                                icon='edit'
                                label='Full Name'
                                type='text'
                                types='text'
                                className="formcard"
                                setFormDetails={setFormDetails}
                                formName="fullname"
                                placeholder='Enter your name'
                            />

                        </div>

                

                    





                        <div className={styles.formCard}>
                            <FormInput
                                icon='edit'
                                label='Address'
                                type='text'
                                types='text'
                                className="formcard"
                                setFormDetails={setFormDetails}
                                formName="address"
                                placeholder='Enter your address'
                            />

                        </div>

                      



                        <div className={styles.formCard}>
                            {photoDataURL ? <div className={styles.img}>
                                <img src={photoDataURL} />
                            </div> : <label>pick a profile image</label>}
                            <input type='file' onChange={changePhotoHandler} />
                        </div>





                    </div>







                    <div className={styles.submit}>
                        <SubmitBtn style={{  borderRadius: '8px' }} text="Submit" />

                        {isError && <p className={styles.errorText} >{isErrorInfo}</p>}
                    </div>




                </form>

            </div>


        </div>
    </>

    );
}

export default EditPage