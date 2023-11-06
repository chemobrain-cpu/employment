import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';



export const AdminEditComponent = ({ updateHandler, }) => {

    let [isData, setIsData] = useState(null)
    let { color,user} = useSelector(state => state.userAuth)
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
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>
            <img src={user.imgurl} />

            <div className={styles.card}>
                <h3>Age</h3>

                <div className={styles.card}>
                <p>{user.imgurl}</p>


                </div>

            </div>



            

        </div></>)




}