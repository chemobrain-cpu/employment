export const SIGNUP_USER = "SIGNUP_USER";
export const LOGIN_USER = 'LOGIN_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const FETCH_USER = 'FETCH_USER'

//https://greatgenius.onrender.llcom



export const login = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch('http://localhost:8080/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: '/register'
        }
      }

      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: '/login'
        }
      }


      if (response.status === 200) {
        let data = await response.json()
        //saving credentials to local storage


        console.log(data)
        dispatch({ type: LOGIN_USER, payload: data })

        return {
          bool: true,
          message: data.response,
          url: `/profile`
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message,
        url: `/login`
      }
    }
  }

}

export const signup = (data) => {
  let dataObj = data
  return async (dispatch, getState) => {
    try {
      let response = await fetch(`http://localhost:8080/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify(data)
      })

      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: '/signup'
        }
      }

      if (response.status === 301) {
        let data = await response.json()

        return {
          bool: false,
          message: data.response,
          url: '/login'
        }
      }


      if (response.status === 200) {
        let data = await response.json()


        localStorage.setItem("user", JSON.stringify(data.response.user))

        localStorage.setItem("user_token", JSON.stringify(data.response.token))

        localStorage.setItem("user_expiry", JSON.stringify(data.response.expiresIn))
        //dispatch login events
        dispatch({ type: LOGIN_USER, payload: data.response })


        return {
          bool: true,
          message: data.response,
          url: `/profile`
        }
      }

    }
    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message,
        url: `/signup`
      }
    }
  }
}
//http://localhost:8080
//http://localhost:8080



export const updateUser = (data) => {
  return async (dispatch, getState) => {
    let {
      userToken,
      user
    } = getState().userAuth

    try {
      let response = await fetch(`http://localhost:8080/users/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${userToken}`
        },
        body: JSON.stringify(data)
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: `/edit`
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: `/edit`
        }
      }

      if (response.status === 200) {
        let data = await response.json()

        dispatch({ type: UPDATE_USER, payload: data.response })
        return {
          bool: true,
          message: data.response,
          url: `/profile`
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message,
        url: `/edit`
      }
    }
  }

}
