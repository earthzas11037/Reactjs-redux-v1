import { action, decorate, observable } from "mobx";
import { history } from "../history";
import instanceAPI from './units/instanceAPI';
import cookie from 'react-cookies'

export class AuthenStore {
    email = null;
    token = null;
    user_id = null;
    user_name = null;
    loginFail = false;
    registeFail = false;
    data_register = {
        email: "",
        password: "",
        confirmPassword: "",
        user_name: "",
    }

    async register(){
        try{
            var data = {
                email: this.data_register.email,
                password: this.data_register.password,
                user_name: this.data_register.user_name
            }
            const res = await instanceAPI.post(`user/`, data)
            if(res !== null) {
                alert("สมัครสมาชิกสำเร็จ!")
                this.data_register = {
                    email: "",
                    password: "",
                    confirmPassword: "",
                    user_name: "",
                }
                return true
            }
        }catch(e) {
            alert("อีเมล์นี้มีอยู่ในระบบแล้ว!")
            this.registeFail = true
            return false;
        }
    }

    async login(email, password){
        var data = {
            email: email,
            password: password
        }
        try{
            const res = await instanceAPI.post(`user/login`, data)
            if(res !== null) {
                cookie.save('token', res.data.token , { path: '/' });
                this.email = res.data.email;
                this.token = res.data.token;
                this.user_id = res.data.user_id;
                this.user_name = res.data.user_name;
                history.push("/");
            }
        }catch(e) {
            // // console.log(e);
            alert("อีเมล์ หรือ รหัสผ่านผิด!")
            return false;
        }
    }


    async logout(){
        try{
            await this.removeCookie();
            window.location.reload(false);
        }catch(e) {
            // // console.log(e);
            return false;
        }
    }

    async removeCookie(){
        return new Promise((resolve, reject) => {
                cookie.remove('token', { path: '/' });
                this.email = null;
                this.token = null;
                this.user_id = null;
                this.user_name = null;
                resolve();
            }
        )  
    }

    async getUserCurrent(token){
        try{
            const res = await instanceAPI.get(`user/current`,{
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": token,
                },
            })
            this.email = res.data.email;
            this.token = token;
            this.user_id = res.data.user_id;
            this.user_name = res.data.user_name;
        }catch(err){
            await this.removeCookie();
        }
    }


}

decorate(AuthenStore, {
    email: observable,
    token: observable,
    user_id: observable,
    user_name: observable,
    loginFail: observable,
    data_register: observable,
    register: action,
    login: action,
    logout: action,
    getUserCurrent: action,
});

export default AuthenStore;
