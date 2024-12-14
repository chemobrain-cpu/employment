import React, { useState } from 'react';
import styles from '../../Home.module.css';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import Sidebar from '../../../component/adminscreencomp/sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import LoadingModal from "../../../component/Modal/LoadingModal";
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../store/action/userAppStorage';
import { Error } from '../../../component/common/Error';
import { ProfileComponent } from '../../../component/adminscreencomp/Home/Profile';


const ProfileEdit = ({ status }) => {
    //tradeModal and transfer modal
    let [isError, setIsError] = useState(false)
    let { } = useSelector(state => state.userAuth)
    let [isLoading, setIsLoading] = useState(false)
    let dispatch = useDispatch()
    let { id } = useParams()
    const navigate = useNavigate();
    const { color } = useSelector(state => state.userAuth);

    const navigateHandler = (data) => {
        navigate(data);
    };

    let showmenuHandler = () => {
        let drawer = document.querySelector('.drawerCon')
        drawer.classList.toggle('showdrawer')
    }




    let updateHandler = async (data) => {
        setIsLoading(true)
        let res = await dispatch(updateUser(data))
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        setIsLoading(false)
        navigate('/admindashboard/users')
    }



    if (isError) {
        return <Error />
    }

    return (<>
        {isLoading && <LoadingModal />}
        {/*<div className={styles.sidebar}>
                <Sidebar status='' />
    </div>*/}



        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 20px',
                backgroundColor: color.background || '#fff',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow to give it depth
                flexWrap: 'wrap', // Allow wrapping for small screens
                borderRadius: '10px', // Rounded corners for a modern feel
                marginBottom: '20px', // Space at the bottom for better separation from content
            }}
        >
            {/* Left section with title */}
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}
            >
                <h3
                    style={{
                        color: color.importantText || '#3a4d6c',
                        fontSize: '1.5rem',
                        margin: 0,
                        whiteSpace: 'nowrap', // Prevent text from wrapping
                        fontWeight: '600', // Make it bold for prominence
                        letterSpacing: '0.5px', // Slight letter spacing for style
                    }}
                >
                    {'Patient Information'}
                </h3>
            </div>

            {/* Right section for profile and menu icon */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '20px',
                    flex: '0 1 auto', // Prevent overflowing and ensure flexibility
                }}
            >
                {/* Menu Icon */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                    }}
                >

                </div>

                {/* Profile Image Icon */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <span
                        className="material-icons"
                        onClick={() => navigateHandler('/profilesettings')}
                        style={{
                            backgroundColor: color.fadeButtonColor || '#3a4d6c',
                            color: color.importantText || '#fff',
                            fontSize: '1.5rem',
                            padding: '14px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease, transform 0.3s ease',
                        }}
                        
                    >
                        person
                    </span>
                </div>
            </div>
        </div>

        <ProfileComponent updateHandler={updateHandler} />

    </>
    )
}

export default ProfileEdit