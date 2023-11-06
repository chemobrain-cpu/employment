import React from 'react'
import styles from './Drawer.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


let topMenu = [
  {
    icon: 'home',
    title: 'Profile',
    link: '/profile'
  },
  {
    icon: 'edit',
    title: 'Edit',
    link: '/edit'
  },
  {
    icon: 'key',
    title: 'Logout',
    link: '/'
  },
  
  
]


let bottomMenu = [
  /*
  {

    title: 'Transactions',
    link: '/transactions'
  },

  {

    title: 'Signout',
    link: 'signout'
  }
  */

]

const DashboardDrawer = ({ showmenuHandler }) => {

  let navigate = useNavigate()
  const dispatch = useDispatch()
  let { color } = useSelector(state => state.userAuth)

  let navigateHandler = async (data) => {
    if (data === 'signout') {
      navigate('/')

    } else {
      navigate(data)
    }
  }



  return (<div className='drawerCon' style={{ backgroundColor: color.background }}>

    <div className={styles.drawer} style={{ backgroundColor: color.background }}>
      <div className={styles.cancel} onClick={showmenuHandler}>

        <span className='material-icons' style={{ color: color.importantText }}>
          close
        </span>
      </div>


      <ul className={styles.drawerMenuCon}>
        {topMenu.map(data => <li className={styles.drawerMenu} onClick={() => navigateHandler(data.link)} key={data.link} style={{ color: color.blue }}><span className='material-icons' key={data.title} style={{ backgroundColor: color.fadeColor, color: color.normalText }} >{data.icon}</span>{data.title}</li>)}

      </ul>

      <div className={styles.boxunderline}>
      </div>



      <div className={styles.boxunderline}>
      </div>




    </div>
  </div>)
}

export default DashboardDrawer