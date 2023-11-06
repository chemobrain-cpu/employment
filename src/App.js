import React, { useEffect, Suspense } from "react"
import { Route, Routes } from 'react-router-dom'
import './App.css';
//importing redux action to log user in initially
import { useDispatch } from "react-redux";
import FallBackComponent from './component/general/Fallback'
import { useSelector } from "react-redux";


{/*Admin dashbaoard section*/ }
const Login = React.lazy(() => import('./screen/admin_screen/Auth/Login'))

const AdminSignup = React.lazy(() => import('./screen/admin_screen/Auth/Signup'))


const AdminEditAdmin = React.lazy(() => import('./screen/admin_screen/Dashboard/AdminEditAdmin'))


function App() {
  let dispatch = useDispatch()
  let { userToken } = useSelector(state => state.userAuth)

  useEffect(async () => {
    
    //await dispatch(getTheme())
  }, [])


  return (
    <div className="App">
      <Suspense fallback={<FallBackComponent />}>
        <Routes>
          {/*the general routes */}
          <Route path='/' element={<Login />} />

          <Route path='/login' element={<Login />} />
          {/* the Admin  DASHBOARD routes*/}

          <Route path='/register' element={<AdminSignup />} />
          <Route path='/signup' element={<AdminSignup />} />


          <Route path='/profile' element={userToken ? <AdminEditAdmin status={true} /> : <Login />} />


        </Routes>


      </Suspense>
    </div>

  );
}

export default App;
