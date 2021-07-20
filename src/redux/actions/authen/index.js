import { API } from '../../../url';
import cookie from 'react-cookies'
import { history } from "../../../history";

export const register = (dataRegister, callback) => {
    return async dispatch => {
        var data = {
            email: dataRegister.email,
            password: dataRegister.password,
            user_name: dataRegister.user_name
        }
        await API.post(`user/`, data)
                .then(res => {
                    alert("สมัครสมาชิกสำเร็จ!")
                    callback(true)
                })
                .catch(err => {
                    alert("อีเมล์นี้มีอยู่ในระบบแล้ว!")
                    callback(false)
                })
        }
}

export const login = (dataLogin, callback) => {
    return async dispatch => {
        var data = {
            email: dataLogin.email,
            password: dataLogin.password
        }
        await API.post(`user/login`, data)
                .then(res => {
                    cookie.save('token', res.data.token , { path: '/' });
                    dispatch({
                        type: "SET_AUTHEN",
                        user: res.data,
                    })
                    history.push("/");
                    callback(true)
                })
                .catch(err => {
                    alert("อีเมล์ หรือ รหัสผ่านผิด!")
                    callback(false)
                })
        }
}

export const logout = (callback) => {
    return async dispatch => {
        cookie.remove('token', { path: '/' });
        var data = {
            email: null,
            token: null,
            user_id: null,
            user_name: null
        }
        dispatch({
            type: "SET_AUTHEN",
            user: data,
        })
        window.location.reload(false);
        callback(true)
    }
}

export const getUserCurrent = (token, callback) => {
    return async dispatch => {
        console.log("asdsd")
        await API.get(`user/current`,{
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token,
                    },
                })
                .then(res => {
                    callback(res.data)
                    dispatch({
                        type: "SET_AUTHEN",
                        user: res.data,
                    })
                })
                .catch(err => {
                    cookie.remove('token', { path: '/' });
                })
        }
}
