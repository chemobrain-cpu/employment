import React, {useCallback,useEffect } from "react"
import styles from './select.module.css'


const SelectInput = (props) => {
   useEffect(()=>{
        props.setFormDetails({
            value: props.option_1,
            formName: props.formName
        })
    },[props])
    

    let selectFunction = useCallback((e) => {
        props.setFormDetails({
            value: e.target.value,
            formName: props.formName
        })
    },[props])


    return <div className={styles.form_selectcontainer} >

        <div className={styles.categoryhead}>
           
            <h3>{props.label}</h3>

        </div>


        <div className={styles.categorybody}>
            <select className={styles.selectInput} onChange={selectFunction}  >
                <option selected>
                    {props.option_1}
                </option>
                <option>
                    {props.option_2}
                </option>
                
               
            </select>
        </div>

    </div>

}

export default React.memo(SelectInput)