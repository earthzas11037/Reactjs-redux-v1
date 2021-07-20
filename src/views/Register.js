import React, { useState, useEffect } from 'react';
import { connect } from "react-redux"
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { NavLink } from "react-router-dom";
import * as EmailValidator from "email-validator";

import { 
    register,
} from "../redux/actions/authen/index"

function Register(props) {
    const [user_name, setUser_name] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [registerFail, setRegisterFail] = useState(false)

    useEffect(() => {

    },[] )

    const handleRegister = async(e) => {
        e.preventDefault()
        if(email === "" || password === "" || confirmPassword === "" || user_name === ""){
            alert("กรุณากรอกข้อมูลให้ครบ!")
            return
        }
        if(!EmailValidator.validate(email)){
            alert("กรุณากรอกอีเมล์ให้ถูกต้อง!")
            return
        }
        if(password !== confirmPassword){
            alert("ยืนยันรหัสผ่านไม่ถูกต้อง!")
            return
        }
        var dataRegister = {
            email: email,
            password: password,
            user_name: user_name
        }
        await props.register((dataRegister),(result) => {

        })
    }

    return(
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-end"
        >
            <Grid item xs={12} sm={12} md={6} lg={4}style={{backgroundColor:"WHITE",padding:50,marginTop:"5%",borderRadius:5}}>
                <Typography style={{fontSize:"2.0em",textAlign:"center",marginTop:50}}>
                    สมัครสมาชิก
                </Typography>
                <TextField
                    fullWidth
                    label={<div style={{fontSize:"1.5em",marginTop:-6}}>อีเมล์</div>}
                    name="email"
                    style={{marginTop:10}}
                    inputProps={{style: {fontSize: "1.2em"}}}
                    variant="outlined"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField 
                    fullWidth
                    label={<div style={{fontSize:"1.5em",marginTop:-6}}>รหัสผ่าน</div>}
                    type="password"
                    name="password"
                    style={{marginTop:10}}
                    inputProps={{style: {fontSize: "1.2em"}}}
                    variant="outlined"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <TextField 
                    fullWidth
                    label={<div style={{fontSize:"1.5em",marginTop:-6}}>ยืนยันรหัสผ่าน</div>}
                    type="password"
                    name="confirmPassword"
                    style={{marginTop:10}}
                    inputProps={{style: {fontSize: "1.2em"}}}
                    variant="outlined"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <TextField 
                    fullWidth
                    label={<div style={{fontSize:"1.5em",marginTop:-6}}>ชื่อผู้ใช้</div>}
                    type="text"
                    name="user_name"
                    style={{marginTop:10}}
                    inputProps={{style: {fontSize: "1.2em"}}}
                    variant="outlined"
                    value={user_name}
                    onChange={e => setUser_name(e.target.value)}
                />
                <Button 
                    variant="contained" 
                    color="primary"  
                    style={{paddingTop:10,paddingBottom:10 ,borderRadius:4,marginTop:20,width:"100%"}} 
                    onClick={handleRegister}
                >
                    ยืนยัน
                </Button>
                <NavLink to="/login" style={{ textDecoration: 'none' }}>
                    <Button 
                        variant="outlined"
                        color="primary"  
                        style={{paddingTop:10,paddingBottom:10 ,borderRadius:4,marginTop:20,width:"100%",marginBottom:50}} 
                    >
                        ลงชื่อเข้าใช้
                    </Button>
                </NavLink>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        authen: state.authen.authen
    }
}
  
export default connect(mapStateToProps, { register })(Register);

