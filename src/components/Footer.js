import React from 'react';
import '../asset/css/footer.css'
//import logo from './logoSE.jpg';

function Footer() {
  return (
    
    <div className="footer" style={{backgroundColor:"#6495ED", height:90,marginTop:50}}>

     <table className="App-footer" style={{padding:"10px 10px 10px 10px"}}>
       <div className="Z" style={{bottom:0,color:"WHITE"}}>
           จัดทำโดย เลิศพันธ์ แก้วกระจ่าง
       </div>
       <div className="Z" style={{bottom:0,color:"WHITE"}}>
           เบอร์โทร 091-990-6083
       </div>
       <div className="Z" style={{bottom:0,color:"WHITE"}}>
           อีเมล์ lertphan.kaew@gmail.com
       </div>
     </table>

    </div>
    
  );
}

export default Footer;