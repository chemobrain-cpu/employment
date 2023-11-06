import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';



export const ProfileComponent = ({ updateHandler, }) => {

    let [isData, setIsData] = useState(null)
    let { color, user } = useSelector(state => state.userAuth)
    let { id } = useParams()


    let handleChangeHandler = (e, nameField) => {
        let val = e.target.value

        setIsData(prev => {
            prev[`${nameField}`] = val
            let newData = { ...prev }
            return newData
        })

    }


    useEffect(() => {
        setIsData(user)
    }, [id])



    let submitHandler = (e) => {
        e.preventDefault()
        updateHandler(isData)
        return
    }


    return (<>
        <div className={styles.homeScreen} >

            <div className={styles.innercontainer}>
                <div className={styles.img}>
                <img src={user.imgurl} />

                </div>
               

                <div className={styles.outercard}>
                    <h3>Full Name</h3>

                    <div className={styles.card}>
                        <textarea value={user.fullname} readOnly/>


                    </div>

                </div>

                


                <div className={styles.outercard}>
                    <h3>Age</h3>

                    <div className={styles.card}>
                        <textarea value={user.age} readOnly/>


                    </div>

                </div>

                <div className={styles.outercard}>
                    <h3>Gender</h3>

                    <div className={styles.card}>
                        <textarea value={user.gender} readOnly/>


                    </div>

                </div>

                <div className={styles.outercard}>
                    <h3>Address</h3>

                    <div className={styles.card}>
                        <textarea value={user.address} readOnly/>


                    </div>

                </div>

              

                <div className={styles.outercard}>
                    <h3>Date Of Employment</h3>

                    <div className={styles.card}>
                        <textarea value={user.dateofemployment} readOnly/>


                    </div>

                </div>



               

                
                


                <div className={styles.outercard}>
                    <h3>Current Position</h3>

                    <div className={styles.card}>
                        <textarea value={user.currentposition} readOnly/>


                    </div>

                </div>


                
                

                <div className={styles.outercard}>
                    <h3>Biography</h3>

                    <div className={styles.card}>
                        <textarea value={user.biography} readOnly/>


                    </div>

                </div>


            

                

            </div>






        </div></>)




}