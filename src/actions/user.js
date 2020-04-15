import actionType from './actionTypes'

import { loginRequest } from '../requests'

const startLogin = () => {
    return {

        type: actionType.START_LOGIN
    }
}

const loginSuccess = (userInfo) => {
    return {
        type: actionType.LOGIN_SUCCCESS,
        payload: {
            userInfo
        }
    }
}

const loginFailed = () => {
    return {
        type: actionType.LOGIN_FAILED
    }
}

export const login = (userInfo) => {
    return dispatch => {
        dispatch(startLogin())
        loginRequest(userInfo)
            .then( res => {
                if (res.data.code ===200) {

                    dispatch(loginSuccess({
                        ...res.data.data,
                        // remember: userInfo.remember
                    }
                    ))
                } else {
                    dispatch(loginFailed())
                }
            })
           
    }
}