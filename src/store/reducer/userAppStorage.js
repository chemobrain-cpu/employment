import {
    LOGIN_USER,
    FETCH_USER,
    UPDATE_USER
} from "../action/userAppStorage";



const initialState = {
    userToken: "",
    user: null,
    color: {
        background: '',
        importantText: '',
        normalText: '',
        fadeColor: '',
        blue: '',
        fadeButtonColor: '',
    }
}



export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_USER:
            return {
                ...state,
                user: action.payload.user,
                userToken: action.payload.token
            }

        case FETCH_USER:
            return {
                ...state,
                user: action.payload,
            }

        case UPDATE_USER:
            return {
                ...state,
                user: action.payload,
            }

  

        default:
            return state
    }
}





